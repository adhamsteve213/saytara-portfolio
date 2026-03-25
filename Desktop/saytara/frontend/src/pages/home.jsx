import React from 'react'
import '../App.css';
import { cic } from '../assets/img';
import { nasaha } from '../assets/img';

function Home() {
  return (
    <section id="home" dir="rtl" className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-1 flex items-center justify-center">
          <div className="relative">
            <img src={nasaha} alt="صورة سيطرة" className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl object-cover animate-float" />
            <div className="absolute -right-2 -bottom-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">Supervisor</div>
          </div>
        </div>
        <div className="md:col-span-2 text-white text-right">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">سيطرة — قائد الأمن البطل في <img src={cic} alt="CIC Logo" className="inline w-12 h-12" /></h1>
          <p className="text-lg md:text-xl mb-4 leading-relaxed text-white/90 animate-fade-in-up delay-150">
            سيطرة واحد من أحلى الناس اللي شُوفناهم؛ راجل مسؤوليته قد الدنيا وابتسامته بتنور المكان. من ساعة ما بدأ شغله كـ مشرف لرجال الأمن في كلية <img src={cic} alt="CIC Logo" className="inline w-8 h-8" /> وهو دايمًا مثال للإتقان، الإنضباط، والتعامل الراقي.
          </p>
          <p className="text-md md:text-lg mb-4 leading-relaxed text-white/90 animate-fade-in-up delay-300">
            اللي بيحبه الناس فيه مش بس حنكته في حل المشكلات، لكنه كمان بيعامل الكل بالاحترام وبيدعم فريقه عشان يبقى دايمًا أحسن. حضور سيطرةيطمنني ويخلّي كل طالب وأستاذ يحس بالأمان.
          </p>
          <p className="text-md md:text-lg mb-4 leading-relaxed text-white/90 animate-fade-in-up delay-450">
            بجانب عمله، سيطرةبيقدم مثال للإنسانية والتواضع — هو بيساهم في خلق جو إيجابي وبيحفّز زملائه يتطوّروا، وده خلى جمهور الكلية يحترمه ويحبه بصدق.
          </p>
          <p className="text-md md:text-lg leading-relaxed text-white/90 animate-fade-in-up delay-600">
            شكراً يا سيطرةعلى تعبك وشجاعتك، وعلى كل لحظة بتخلي فيها الكلية أأمن وأجمل. إحنا فخورين بيك، وربنا يديك الصحة والنجاح دايمًا. يا بطل! <img src={cic} alt="CIC Logo" className="inline w-8 h-8" />
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
