// components/WhoWe.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaLeaf } from "react-icons/fa";
import { dbImg } from "@/imgs/dbImg"; // تأكد من أن هذا المسار صحيح لصورك
import { MdOutlineDeveloperMode, MdConnectWithoutContact } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { motion, useAnimation } from "framer-motion"; // استيراد motion و useAnimation

// بيانات بطاقات "قيمنا التي نؤمن بها"
interface WhyWeCardData {
  icon: any;
  title: string;
  desc: string;
}

const dbWhyWeCard: WhyWeCardData[] = [
  {
    icon: <MdOutlineDeveloperMode />,
    title: "التمكين والتطوير",
    desc: "نسعى لتمكين طلاب وخريجي الزراعة بالمعرفة والمهارات اللازمة للتفوق في مجالاتهم.",
  },
  {
    icon: <HiLightBulb />,
    title: "الابتكار والتجديد",
    desc: "نتبنى الابتكار في طرق عرض المحتوى وتوفير الخدمات، ونحرص على التحديث المستمر لمواكبة كل جديد.",
  },
  {
    icon: <MdConnectWithoutContact />,
    title: "المجتمع والتواصل",
    desc: "نؤمن بأهمية بناء مجتمع داعم يتيح للطلاب والخريجين تبادل الخبرات والمعرفة والتواصل الفعال.",
  },
];

// مكون الكارد الفردي مع الأنيميشن
const AnimatedValueCard: React.FC<{ card: WhyWeCardData; index: number }> = ({ card, index }) => {
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

  // الأنيميشن: الدخول من الأسفل للأعلى (من مكان مخفي)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // يبدأ مخفيًا ومزاحًا للأسفل
    visible: {
      opacity: 1,
      y: 0, // ينتقل إلى موضعه الطبيعي
      transition: {
        duration: 0.6, // مدة الأنيميشن
        ease: "easeOut",
        delay: index * 0.15, // تأخير بسيط لكل كارد ليظهر تباعًا
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="bg-green-700 text-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center gap-4
                 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[400px] h-[280px] sm:h-[300px] hover:scale-105 transition-transform duration-300"
    >
      <h1 className="text-5xl sm:text-6xl text-white mb-2">{card.icon}</h1>
      <h2 className="text-2xl sm:text-3xl font-bold">{card.title}</h2>
      <p className="text-base sm:text-lg mx-2 leading-relaxed">{card.desc}</p>
    </motion.div>
  );
};

const WhoWe = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 mb-20 bg-gray-50">
      {/* عنوان القسم "من نحن؟" */}
      <div className="text-center mt-23 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800">
            من نحن؟
          </h1>
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
        </div>
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          مرحباً بك في "بوابة مدرسة الزراعة"، منصتك المتكاملة لكل ما يحتاجه طلاب
          وخريجو الزراعة. نحن نؤمن بأن المعرفة هي مفتاح النجاح، ولهذا نسعى جاهدين
          لتوفير مصدر شامل وموثوق للمعلومات الحديثة والدقيقة في مجالات أمراض
          النبات، الحشرات الزراعية، والمبيدات وغيرها من التخصصات. مهمتنا هي دعمك
          في رحلتك التعليمية والمهنية، من خلال توفير المحتوى التعليمي، الاستشارات
          المتخصصة، فرص العمل، وأكثر من ذلك.
        </p>
      </div>

      {/* قسم المؤسس */}
      <div className="w-full max-w-4xl mx-auto text-right mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">المؤسس</h2>
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start justify-center md:justify-between gap-8 p-6 bg-white rounded-xl shadow-lg">
          <Image
                    draggable={false}
          priority={false}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-xl border-4 border-green-200"
            src={dbImg.ahmedJpg} // تأكد من وجود هذه الصورة في dbImg
            alt="صورة المهندس أحمد توحيد"
            width={200}
            height={200}
          />
          <div className="text-center md:text-right flex-grow">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">م/أحمد توحيد</h3>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              طالب في كلية الزراعة جامعة المنصورة، قسم وقاية نبات،
              مهتم بمجال الزراعة الرقمية.
            </p>
          </div>
          {/* أيقونات التواصل الاجتماعي */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg shadow-inner">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                        draggable={false}
          priority={false}
              src={dbImg.face} alt="Facebook" width={30} height={30} className="w-10 h-10 transition-transform hover:scale-110 cursor-pointer" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                        draggable={false}
          priority={false}
              src={dbImg.link} alt="LinkedIn" width={30} height={30} className="w-10 h-10 transition-transform hover:scale-110 cursor-pointer" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                        draggable={false}
          priority={false}
              src={dbImg.git} alt="GitHub" width={30} height={30} className="w-10 h-10 transition-transform hover:scale-110 cursor-pointer" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Image
                        draggable={false}
          priority={false}
              src={dbImg.behan} alt="Behance" width={30} height={30} className="w-10 h-10 transition-transform hover:scale-110 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      {/* قسم رؤيتنا */}
      <div className="w-full max-w-4xl mx-auto text-right mb-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">رؤيتنا</h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          أن نصبح المصدر الأول والرائد للمعلومات والخدمات المتخصصة في مجالات الزراعة على مستوى العالم العربي، وأن
          نساهم بفعالية في بناء جيل من المتخصصين الزراعيين القادرين على مواجهة التحديات
          وتحقيق التنمية المستدامة.
        </p>
      </div>

      {/* قسم قيمنا التي نؤمن بها */}
      <div className="w-full max-w-5xl mx-auto text-right mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 px-4 sm:px-0">قيمنا التي نؤمن بها</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {dbWhyWeCard.map((card, index) => (
            <AnimatedValueCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>

      {/* قسم شركاؤنا في النجاح */}
      <div className="w-full max-w-4xl mx-auto text-center p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">شركاؤنا في النجاح</h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          لا يوجد لدينا شركاء حاليون. هل ترغب في أن تصبح شريكًا معنا؟
        </p>
        <button className="bg-green-700 py-3 px-8 rounded-lg text-center text-xl text-white font-semibold cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-md">
          تواصل معنا الآن
        </button>
      </div>
    </section>
  );
};

export default WhoWe;