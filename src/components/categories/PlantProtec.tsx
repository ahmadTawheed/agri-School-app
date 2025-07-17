"use client";

// import styles from "@/components/categories/plantDisease/category.module.css"; // سنقوم بإزالة هذا الملف ونقل الأنماط إلى Tailwind
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion"; // استيراد motion من framer-motion

// تعريف واجهة لنوع بيانات البطاقة
interface PlantProtectionCard {
  link: string;
  name: string;
}

// بيانات البطاقات
const dbCategoryCard: PlantProtectionCard[] = [
  {
    link: "#",
    name: "مقدمة عن وقاية النبات",
  },
  {
    link: "/PlantDiseases",
    name: "أمراض النبات",
  },
  {
    link: "#",
    name: "حشرات اقتصادية",
  },
  {
    link: "#",
    name: "مبيدات",
  },
];

// مكون منفصل للبطاقة الواحدة مع الحركة
const AnimatedPlantProtectionCard: React.FC<{ card: PlantProtectionCard; index: number }> = ({ card, index }) => {
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
      key={index}
      className="bg-[#F6FBF9] p-6 sm:p-8 rounded-xl border-3 border-[#2D4F2B] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      //@ts-ignore
      variants={cardVariants}
    >
      <h2 className="text-xl sm:text-2xl text-[#2D4F2B] font-bold text-center sm:text-right flex-grow">
        {card.name}
      </h2>
      <Link href={card.link} passHref>
        <button
          className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white font-medium cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md"
        >
          تفاصيل
        </button>
      </Link>
    </motion.div>
  );
};

const PlantProtection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mb-20">
      {/* العنوان الرئيسي */}
      <div className="flex items-center justify-center gap-3 sm:mt-12 lg:mt-16 text-center">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B] mt-20" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold leading-tight mt-20">
          وقاية النبات
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B] mt-20" />
      </div>
      {/* وصف القسم */}
      <p className="text-lg sm:text-xl text-[#2D4F2B] mb-8 max-w-2xl text-center">
        هنا سوف تجد معلومات عن جميع تخصصات وقاية النبات المتاحة حاليًا في موقعنا.
      </p>

      {/* حاوية البطاقات */}
      <div className="w-full flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
        {dbCategoryCard.map((itemcat, index) => (
          <AnimatedPlantProtectionCard key={index} card={itemcat} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PlantProtection;