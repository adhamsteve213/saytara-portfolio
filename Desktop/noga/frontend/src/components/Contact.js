import React from 'react';
import SocialIcons from './SocialIcons';

export default function Contact() {
  const links = [
    { name: 'Instagram', url: 'https://www.instagram.com/mousa_alshourok/?__pwa=1' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@muosa3elshourok?utm_source=ig&utm_medium=social&utm_content=link_in_bio' },
    { name: 'Google Maps', url: 'https://www.google.com/maps?q=%D9%85%D9%88%D8%B3%D9%8A+%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D9%82%D8%8C+%D8%A7%D9%84%D9%85%D8%AC%D9%85%D8%B9+%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%89%2C+%D9%85%D8%B3%D8%A7%D9%83%D9%86+%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D9%82%D8%8C+%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A+%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%8C+%D9%85%D8%AF%D9%8A%D9%86%D8%A9+%D9%86%D8%B5%D8%B1&ftid=0x14583dadb5bf105f:0x615f23780ddcc66a' },
    { name: 'Instagram (2)', url: 'https://www.instagram.com/xxmousa_xx/?__pwa=1' },
    { name: 'Instagram (3)', url: 'https://www.instagram.com/mmousax/?__pwa=1' },
    { name: 'Facebook', url: 'https://web.facebook.com/mousa.elshrok/' },
  ];
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h3 className="text-3xl font-bold mb-3">Contact</h3>
          <p className="opacity-80 mb-6">See our latest styles and book your appointment on social platforms.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SocialIcons links={links} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white/5 rounded-lg">
            <h4 className="font-semibold mb-2">Address</h4>
            <p className="opacity-80">Moussa Elshourook, Nasser City, Cairo (see map)</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h4 className="font-semibold mb-2">Phone</h4>
            <p className="opacity-80">+20 102 392 2234</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h4 className="font-semibold mb-2">Hours</h4>
            <p className="opacity-80">Open: 1pm — 3am</p>
          </div>
        </div>
      </div>
    </section>
  );
}
