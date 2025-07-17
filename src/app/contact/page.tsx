// components/ContactPage.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion"; // استيراد motion و useAnimation

// تعريف واجهة لبيانات معلومات الاتصال
interface ContactInfoCardData {
  //@ts-ignore
  icon: JSX.Element;
  title: string;
  value: string;
  link?: string; // لربط البريد الإلكتروني أو الهاتف إذا لزم الأمر
}

// بيانات معلومات الاتصال
const contactInfo: ContactInfoCardData[] = [
  {
    icon: <MdEmail />,
    title: "البريد الإلكتروني",
    value: "ahmadtawheed74@gmail.com",
    link: "mailto:ahmadtawheed74@gmail.com",
  },
  {
    icon: <FaPhoneVolume />,
    title: "رقم الهاتف",
    value: "+20 150 102 1670",
    link: "tel:+201501021670",
  },
  {
    icon: <IoLocation />,
    title: "العنوان",
    value: "Mansoura, Egypt",
    link: "https://maps.app.goo.gl/YourLocationCoordinatesHere" // استبدل بإحداثيات موقعك
  },
];

// مكون بطاقة معلومات الاتصال الفردية مع الأنيميشن
const AnimatedContactCard: React.FC<{ card: ContactInfoCardData; index: number }> = ({ card, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.unobserve(entry.target); // تشغيل الأنيميشن مرة واحدة
        }
      },
      {
        threshold: 0.3, // تشغيل الأنيميشن عندما يكون 30% من العنصر مرئيًا
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  // الأنيميشن: الدخول من اليمين
  const cardVariants = {
    hidden: { opacity: 0, x: 100 }, // يبدأ مخفيًا ومزاحًا لليمين
    visible: {
      opacity: 1,
      x: 0, // ينتقل إلى موضعه الطبيعي
      transition: {
        duration: 0.6, // مدة الأنيميشن
        ease: "easeOut",
        delay: index * 0.15, // تأخير بسيط لكل كارد ليظهر تباعًا
      },
    },
  };

  const CardContent = (
    <>
      <div className="flex items-center gap-4">
        <span className="text-3xl text-green-700">{card.icon}</span>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">
          {card.title}
        </p>
      </div>
      <span className="text-lg sm:text-xl text-green-600 font-medium break-words text-left flex-grow mr-auto">
        {card.value}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      //@ts-ignore
      variants={cardVariants}
      className="w-full max-w-2xl rounded-xl bg-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 cursor-pointer
                 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out border border-gray-200"
    >
      {card.link ? (
        <a href={card.link} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </motion.div>
  );
};

const ContactPage = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 mb-20 bg-gray-50">
      {/* عنوان القسم "تواصل معنا" */}
      <div className="text-center mt-22 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800">
            تواصل معنا
          </h1>
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
        </div>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          تسرنا مساعدتك والإجابة على استفساراتك. إذا كان لديك أي سؤال، اقتراح، أو
          واجهتك أي مشكلة، فلا تتردد في التواصل معنا. فريقنا مستعد لتقديم الدعم
          والمساعدة اللازمة.
        </p>
      </div>

      {/* عنوان قسم معلومات الاتصال */}
      <div className="w-full max-w-4xl mx-auto text-right mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          معلومات <span className="text-yellow-600">الاتصال</span>
        </h2>
      </div>

      {/* عرض بطاقات معلومات الاتصال مع الأنيميشن */}
      <div className="w-full flex flex-col items-center gap-6">
        {contactInfo.map((item, index) => (
          <AnimatedContactCard key={index} card={item} index={index} />
        ))}
      </div>

      {/* قسم الخريطة (مثال - يمكنك إضافة Google Maps هنا) */}
      <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">موقعنا على الخريطة</h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          يمكنك زيارتنا في العنوان التالي:
        </p>
        <div className="aspect-w-16 aspect-h-9 w-full bg-gray-200 rounded-lg overflow-hidden shadow-inner">
          {/* هنا يمكنك تضمين iframe لخريطة Google Maps
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYourLatitude!2dYourLongitude!3dYourZoomLevel!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYourCompanyName!5e0!3m2!1sen!2seg!4vYourMapEmbedCode"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          */}
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            مكان لوضع الخريطة هنا (على سبيل المثال، iframe من Google Maps)
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;