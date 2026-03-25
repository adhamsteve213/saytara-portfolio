<?php

namespace App\Http\Controllers;

use App\Models\orders;
use App\Models\OrderItem;
use App\Models\carts;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(): JsonResponse
    {
        $orders = orders::with('orderItems.product')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    /**
     * Create a new order from cart.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'payment_method' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        // Get cart items
        $cartItems = carts::with('product')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty'
            ], 400);
        }

        DB::beginTransaction();
        try {
            // Calculate totals
            $subtotal = $cartItems->sum(function ($item) {
                return $item->quantity * $item->price;
            });
            $tax = $subtotal * 0.1; // 10% tax
            $total = $subtotal + $tax;

            // Create order
            $order = orders::create([
                'user_id' => Auth::id(),
                'order_number' => orders::generateOrderNumber(),
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'] ?? null
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'subtotal' => $cartItem->quantity * $cartItem->price
                ]);
            }

            // Clear cart
            carts::where('user_id', Auth::id())->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'data' => $order->load('orderItems.product')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified order.
     */
    public function show(string $id): JsonResponse
    {
        $order = orders::with('orderItems.product')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    /**
     * Update order status (admin only).
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,processing,shipped,delivered,cancelled',
            'payment_status' => 'sometimes|in:unpaid,paid,refunded'
        ]);

        $order = orders::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated',
            'data' => $order
        ]);
    }

    /**
     * Cancel an order.
     */
    public function cancel(string $id): JsonResponse
    {
        $order = orders::where('user_id', Auth::id())
            ->findOrFail($id);

        if ($order->status === 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot cancel completed order'
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully',
            'data' => $order
        ]);
    }

    /**
     * Get all orders (admin only).
     */
    public function allOrders(): JsonResponse
    {
        $orders = orders::with('user', 'orderItems.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }
}
