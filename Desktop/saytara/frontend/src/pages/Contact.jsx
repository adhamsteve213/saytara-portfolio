import React from 'react';
import '../App.css';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8 animate-bounce">
            تواصل معنا
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-center mb-12 animate-fade-in-up delay-150">
            نحن هنا لمساعدتك! تواصل معنا عبر وسائل التواصل الاجتماعي أو الهاتف. نحن ننتظر رسالتك!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition duration-300 animate-fade-in-up delay-300 hover:scale-105">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-pink-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تيك توك</h3>
              <p className="text-white/80 mb-4">تابعنا على تيك توك للمحتوى الممتع!</p>
              <a href="https://www.tiktok.com/@saytara1710?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 animate-bounce">
                زور تيك توك
              </a>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition duration-300 animate-fade-in-up delay-450 hover:scale-105">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">واتساب</h3>
              <p className="text-white/80 mb-4">راسلنا على واتساب للدعم الفوري!</p>
              <a href="https://wa.me/201287097041" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 animate-pulse">
                راسلنا على واتساب
              </a>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition duration-300 animate-fade-in-up delay-600 hover:scale-105">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-blue-400 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الهاتف</h3>
              <p className="text-white/80 mb-4">اتصل بنا مباشرة لأي استفسار!</p>
              <a href="tel:+201287097041" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 animate-bounce">
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
