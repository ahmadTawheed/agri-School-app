// components/plantDisease/ComponentsPLantDise.tsx
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import IntroDise from "./IntroDise";
import AllPlantDiseases from "./AllPlantDiseases";
import FilterPanel, { DiseaseType } from "./FilterPanel";

const ComponentsPLantDise = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState<DiseaseType[]>(["All"]); // الفلاتر النشطة (افتراضيا الكل)
  const [searchTerm, setSearchTerm] = useState("");

  // Ref و State لتطبيق الحركة على بطاقة "مقدمة عن أمراض النبات"
  const introCardRef = useRef<HTMLDivElement>(null);
  const [introCardInView, setIntroCardInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !introCardInView) {
          setIntroCardInView(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (introCardRef.current) {
      observer.observe(introCardRef.current);
    }

    return () => {
      if (introCardRef.current) {
      observer.observe(introCardRef.current);
      }
    };
  }, [introCardInView]);

  const introCardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mb-20">
      <IntroDise />

      {/* شريط البحث والفلترة */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-2 sm:px-4 lg:px-0 max-w-4xl">
        <input
          placeholder=" قم بالبحث هنا عن المرض "
          className="px-4 py-3 text-green-950 rounded-xl border-2 border-[#2D4F2B] w-full sm:flex-grow text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#708A58]"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowFilterPanel(true)}
          className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md w-full sm:w-auto"
        >
          الفلترة
        </button>
      </div>

      {/* بطاقة "مقدمة عن أمراض النبات" */}
      <motion.div
        ref={introCardRef}
        className="bg-[#F6FBF9] p-6 sm:p-8 rounded-xl border-3 border-[#2D4F2B] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 w-full max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        initial="hidden"
        animate={introCardInView ? "visible" : "hidden"}
        //@ts-ignore
        variants={introCardVariants}
      >
        <h2 className="text-xl sm:text-2xl text-[#2D4F2B] font-bold text-center sm:text-right flex-grow">
          مقدمة عن أمراض النبات
        </h2>
        <Link
          target="_blank"
          href="https://ahmedtawheed.blogspot.com/p/blog-page_17.html"
          passHref
        >
          <button
            className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md"
          >
            تفاصيل
          </button>
        </Link>
      </motion.div>

      {/* عرض جميع الأمراض بناءً على الفلاتر والبحث */}
      <AllPlantDiseases activeFilters={activeFilters} searchTerm={searchTerm} />

      {/* لوحة الفلترة (Modal) */}
      <FilterPanel
        isVisible={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onApplyFilter={(filters) => {
          // قم بتحديث activeFilters بناءً على ما تم اختياره في لوحة الفلترة
          setActiveFilters(filters);
          setShowFilterPanel(false); // إخفاء لوحة الفلترة بعد التطبيق
        }}
        currentFilters={activeFilters} // تمرير الفلاتر النشطة الحالية
      />
    </section>
  );
};

export default ComponentsPLantDise;