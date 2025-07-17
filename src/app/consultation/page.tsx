// components/ConsultationPage.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { motion, useAnimation } from "framer-motion"; // استيراد motion و useAnimation

// بيانات النصائح المهمة
const importantTips = [
  "حدد مشكلتك أو استفسارك بوضوح تام.",
  "اذكر نوع المحصول أو النبات المحدد الذي تستفسر عنه.",
  "صف الظروف المحيطة بالمحصول: تربة، ري، وكمية الشمس.",
  "اذكر أي علامات أو أعراض غير طبيعية لاحظتها بدقة.",
  "أخبرنا عن أي إجراءات قمت بها بالفعل لمعالجة المشكلة.",
];

const ConsultationPage = () => {
  // للتحكم في أنيميشن قسم النصائح
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.unobserve(entry.target); // تشغيل الأنيميشن مرة واحدة
        }
      },
      {
        threshold: 0.2, // تشغيل الأنيميشن عندما يكون 20% من العنصر مرئيًا
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // متغيرات الأنيميشن لقسم النصائح
  const tipsSectionVariants = {
    hidden: { opacity: 0, y: 50 }, // يبدأ مخفيًا ومزاحًا للأسفل
    visible: {
      opacity: 1,
      y: 0, // ينتقل إلى موضعه الطبيعي
      transition: {
        duration: 0.8, // مدة الأنيميشن
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 mb-20 bg-gray-50">
      {/* عنوان القسم والوصف */}
      <div className="text-center mt-22 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800">
            طلب استشارة متخصصة
          </h1>
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
        </div>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          هل تواجه تحديًا زراعيًا معينًا وتحتاج إلى رأي خبير؟ يمكنك الآن طلب
          استشارة متخصصة من فريقنا من مهندسي وخبراء وقاية النبات. سواء كانت لديك
          أسئلة حول أمراض نباتية، آفات زراعية، أو الاستخدام الأمثل للمبيدات، نحن
          هنا لتقديم الإرشادات الدقيقة والموثوقة.
        </p>
      </div>

      {/* زر طلب الاستشارة */}
      <button className="bg-green-700 py-3 px-8 rounded-lg text-center text-xl text-white font-semibold cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-md">
        اطلب استشارتك الآن
      </button>

      {/* قسم "نصائح مهمة" مع الأنيميشن */}
      <div className="w-full max-w-4xl mx-auto text-right mt-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 px-4 sm:px-0">
          نصائح <span className="text-yellow-600">مهمة</span>
        </h2>

        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          //@ts-ignore
          variants={tipsSectionVariants}
          className="w-full rounded-xl bg-white shadow-lg p-6 sm:p-8 flex flex-col gap-4 border border-gray-200"
        >
          {importantTips.map((tip, index) => (
            <div key={index} className="flex items-start text-right">
              <MdOutlineTaskAlt className="ml-3 text-2xl text-yellow-600 flex-shrink-0 mt-1" />
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed flex-grow">
                {tip}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationPage;