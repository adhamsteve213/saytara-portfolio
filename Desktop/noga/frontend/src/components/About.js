import React from 'react';
import haircuts from '../assets/images';
import SocialIcons from './SocialIcons';

export default function About() {
  const teamImg = haircuts.img105419 || haircuts.logo;
  return (
    <section id="about" className="py-24 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">About Moussa Elshourook</h3>
          <p className="text-lg opacity-80">We are a men's hair salon focused on style, precision and great customer experience. Our team are professional stylists with a passion for modern cuts and classic looks.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 animate-fade-in-up">
            <img src={teamImg} alt="Our team" className="rounded-xl shadow-lg w-full" />
          </div>
          <div className="md:w-1/2 animate-fade-in-left space-y-4">
            <p className="text-md">Our stylists are friendly and experienced. We make sure you get a cut that fits your personality and lifestyle.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Classic & modern men's haircuts</li>
              <li>Beards & fades</li>
              <li>Hot towel shaves & grooming</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a className="px-4 py-2 rounded bg-black text-white" href="#contact">Get in touch</a>
              <a className="px-4 py-2 rounded border" href="#home">See styles</a>
            </div>
            <div className="mt-6 flex justify-center gap-6">
              <SocialIcons links={[
                { name: 'Instagram', url: 'https://www.instagram.com/mousa_alshourok/?__pwa=1' },
                { name: 'Facebook', url: 'https://web.facebook.com/mousa.elshrok/' },
                { name: 'Twitter', url: 'https://twitter.com' },
              ]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
