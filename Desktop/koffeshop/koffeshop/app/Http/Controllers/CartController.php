<?php

namespace App\Http\Controllers;

use App\Models\carts;
use App\Models\products;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display the user's cart.
     */
    public function index(): JsonResponse
    {
        $cartItems = carts::with('product.category')
            ->where('user_id', Auth::id())
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        return response()->json([
            'success' => true,
            'data' => [
                'items' => $cartItems,
                'total' => $total
            ]
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = products::findOrFail($validated['product_id']);

        // Check if item already exists in cart
        $cartItem = carts::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cartItem) {
            // Update quantity
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            // Create new cart item
            $cartItem = carts::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
                'price' => $product->price
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Item added to cart',
            'data' => $cartItem->load('product')
        ], 201);
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = carts::where('user_id', Auth::id())
            ->findOrFail($id);

        $cartItem->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Cart updated',
            'data' => $cartItem->load('product')
        ]);
    }

    /**
     * Remove item from cart.
     */
    public function destroy(string $id): JsonResponse
    {
        $cartItem = carts::where('user_id', Auth::id())
            ->findOrFail($id);
        
        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }

    /**
     * Clear all cart items.
     */
    public function clear(): JsonResponse
    {
        carts::where('user_id', Auth::id())->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared'
        ]);
    }
}
