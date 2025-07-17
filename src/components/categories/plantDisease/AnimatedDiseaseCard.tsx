// components/common/AnimatedDiseaseCard.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// تعريف واجهة لنوع بيانات البطاقة
export interface DiseaseCardData {
  link: string;
  name: string;
  type?: string; // أضفنا نوع المرض هنا لفلترة أفضل
}

interface AnimatedDiseaseCardProps {
  card: DiseaseCardData;
  index: number;
}

const AnimatedDiseaseCard: React.FC<AnimatedDiseaseCardProps> = ({ card, index }) => {
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
      className="bg-[#F6FBF9] p-6 sm:p-8 rounded-xl border-3 border-[#2D4F2B] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
   //@ts-expect-error
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

export default AnimatedDiseaseCard;