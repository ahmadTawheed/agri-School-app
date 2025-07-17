"use client";

// import styles from "@/components/categories/plantDisease/category.module.css"; // سنقوم بإزالة هذا الملف ونقل الأنماط إلى Tailwind
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion"; // استيراد motion من framer-motion

// تعريف واجهة لنوع بيانات البطاقة
interface CategoryCard {
  link: string;
  name: string;
}

// بيانات البطاقات
const dbCategoryCard: CategoryCard[] = [
  {
    link: "#",
    name: "مقدمة عن التخصصات",
  },
  {
    link: "/plantProtection",
    name: "وقاية نبات",
  },
  {
    link: "#",
    name: "إنتاج نباتي",
  },
  {
    link: "#",
    name: "أراضي ومياه",
  },
  {
    link: "#",
    name: "تكنولوجيا حيوية",
  },
  {
    link: "#",
    name: "إنتاج حيواني",
  },
  {
    link: "#",
    name: "صناعات",
  },
  {
    link: "#",
    name: "إرشاد",
  },
];

// مكون منفصل للبطاقة الواحدة مع الحركة
const AnimatedCategoryCard: React.FC<{ card: CategoryCard; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
        // إذا أردت أن تتكرر الحركة في كل مرة يظهر فيها العنصر، ألغِ التعليق على السطر التالي
        // else if (!entry.isIntersecting && inView) {
        //   setInView(false);
        // }
      },
      {
        threshold: 0.2, // البطاقة تظهر عندما يصبح 20% منها مرئياً
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [inView]);

  // متغيرات حركة Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, x: 100 }, // تبدأ مخفية و 100 بكسل إلى اليمين
    visible: {
      opacity: 1,
      x: 0, // تنتقل إلى موضعها الطبيعي
      transition: {
        duration: 0.7, // مدة الحركة
        ease: "easeOut", // نوع التباطؤ
        delay: index * 0.1, // تأثير التتابع: كل بطاقة تظهر بتأخير بسيط عن سابقتها
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      key={index} // key هنا لـ map يتم تمريرها للمكون
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4 w-full max-w-sm sm:w-80 h-48 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // تفعيل الحركة بناءً على حالة الرؤية
   //@ts-expect-error
      variants={cardVariants}
    >
      <h2 className="text-xl sm:text-2xl text-[#2D4F2B] font-bold">{card.name}</h2>
      <Link href={card.link} passHref>
        <button
          className="bg-[#2D4F2B] py-3 px-6 rounded-lg text-center text-lg text-white font-medium cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md"
        >
          تفاصيل
        </button>
      </Link>
    </motion.div>
  );
};

const Categories = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mb-20">
      {/* العنوان الرئيسي */}
      <div className="flex items-center justify-center gap-3 sm:mt-12 lg:mt-16 text-center">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B] mt-20" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold leading-tight mt-20">
          الأقسام / التخصصات
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B] mt-20" />
      </div>
      {/* وصف القسم */}
      <p className="text-lg sm:text-xl text-[#2D4F2B] mb-8 max-w-2xl text-center">
        هنا سوف تجد معلومات عن جميع التخصصات الزراعية المتاحة حاليًا في موقعنا.
      </p>

      {/* حاوية البطاقات */}
      <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
        {dbCategoryCard.map((itemcat, index) => (
          <AnimatedCategoryCard key={index} card={itemcat} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Categories;