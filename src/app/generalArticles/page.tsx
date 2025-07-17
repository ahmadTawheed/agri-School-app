// components/GeneralArticles.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion"; // استيراد motion و useAnimation

// تعريف واجهة لبيانات الكارد
interface ArticleCardData {
  link: string;
  name: string;
  description: string; // إضافة حقل الوصف
}

// بيانات المقالات (تم إضافة وصف افتراضي)
const dbCategoryCard: ArticleCardData[] = [
  {
    link: "#",
    name: "مفهوم الاستدامة في الزراعة",
    description: "اكتشف كيف يمكن للزراعة المستدامة أن تضمن مستقبلًا غذائيًا آمنًا للأجيال القادمة.",
  },
  {
    link: "/plantProtection", // تأكد من وجود هذا المسار أو قم بتعديله
    name: "الزراعة الرقمية وتقنياتها الحديثة",
    description: "تعرف على أحدث التقنيات الرقمية التي تحدث ثورة في عالم الزراعة وتزيد من الإنتاجية.",
  },
  {
    link: "#",
    name: "تغير المناخ وتأثيره على الزراعة",
    description: "فهم التحديات التي يفرضها تغير المناخ على القطاع الزراعي وكيفية التكيف معها.",
  },
  {
    link: "#",
    name: "الاحتباس الحراري والحلول الزراعية",
    description: "استكشف دور الممارسات الزراعية في مكافحة الاحتباس الحراري وتقليل انبعاثات الغازات الدفيئة.",
  },
  {
    link: "#",
    name: "الثروة السمكية: أساس الأمن الغذائي",
    description: "أهمية الثروة السمكية في توفير البروتين وتحديات تنميتها واستدامتها.",
  },
  {
    link: "#",
    name: "إنترنت الأشياء والزراعة الذكية",
    description: "كيف يساهم إنترنت الأشياء (IoT) في تطوير مزارع ذكية وأكثر كفاءة.",
  },
];

// مكون الكارد الفردي مع الأنيميشن
const AnimatedArticleCard: React.FC<{ card: ArticleCardData; index: number }> = ({ card, index }) => {
  const controls = useAnimation(); // للتحكم في الأنيميشن
  const ref = useRef(null); // للتحقق من رؤية العنصر

  // مراقبة رؤية العنصر باستخدام Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible"); // ابدأ الأنيميشن عندما يكون العنصر مرئيًا
          // بعد تشغيل الأنيميشن، يمكننا إزالة المراقب إذا أردنا تشغيل الأنيميشن مرة واحدة فقط
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // تشغيل الأنيميشن عندما يكون 20% من العنصر مرئيًا
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

  const cardVariants = {
    hidden: { opacity: 0, x: 100 }, // يبدأ الكارد من اليمين ويكون مخفيًا
    visible: {
      opacity: 1,
      x: 0, // ينتقل إلى موضعه الطبيعي
      transition: {
        duration: 0.7, // مدة الأنيميشن
        ease: "easeOut", // نوع الأنيميشن (تباطؤ في النهاية)
        delay: index * 0.1, // تأخير بسيط لكل كارد ليظهر تباعًا
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      //@ts-expect-error
      variants={cardVariants}
      className="bg-[#F6FBF9] p-6 sm:p-8 rounded-xl border-2 border-[#2D4F2B] flex flex-col items-center justify-between gap-4 w-full max-w-sm sm:max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-center"
    >
      <h2 className="text-xl sm:text-2xl text-[#2D4F2B] font-bold">
        {card.name}
      </h2>
      <p className="text-base sm:text-lg text-gray-700 mb-4 px-2">
        {card.description}
      </p>
      <Link href={card.link} passHref>
        <button className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md">
          تفاصيل
        </button>
      </Link>
    </motion.div>
  );
};

const GeneralArticles = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 mb-20 bg-gray-50">
      {/* عنوان القسم والوصف */}
      <div className="text-center mt-12 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaLeaf className="text-4xl text-green-700 mt-20" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 mt-20">
            مقالات عامة
          </h1>
          <FaLeaf className="text-4xl text-green-700 mt-20" />
        </div>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          هنا سوف تجد مقالات عامة ومفيدة في المجال الزراعي
        </p>
      </div>

      {/* عرض بطاقات المقالات مع الأنيميشن */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {dbCategoryCard.map((itemcat, index) => (
          <AnimatedArticleCard key={index} card={itemcat} index={index} />
        ))}
      </div>
    </section>
  );
};

export default GeneralArticles;