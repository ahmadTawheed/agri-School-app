// components/PropagandaPage.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { FaLeaf } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { GiHearts } from "react-icons/gi";
import { BiSolidBrain } from "react-icons/bi";
import { motion, useAnimation } from "framer-motion"; // Import motion and useAnimation

// Define interface for propaganda card data
interface PropagandaCardData {
   //@ts-expect-error
  icon: JSX.Element;
  title: string;
  desc: string;
}

// Data for "Why Advertise With Us" cards
const dbAdsCard: PropagandaCardData[] = [
  {
    icon: <TbTargetArrow />,
    title: "جمهور مستهدف",
    desc: "يصل إعلانك مباشرة إلى طلاب وخريجي ومهندسي الزراعة المهتمين بالقطاع الزراعي.",
  },
  {
    icon: <GiHearts />,
    title: "تفاعل عالي",
    desc: "محتوانا المتخصص يضمن تفاعلاً كبيراً من الزوار مع الإعلانات ذات الصلة.",
  },
  {
    icon: <BiSolidBrain />,
    title: "زيادة الوعي بعلامتك التجارية",
    desc: "عزز حضور علامتك التجارية بين شريحة مهمة وحيوية من المجتمع الزراعي.",
  },
];

// Reusable component for an animated propaganda card
const AnimatedPropagandaCard: React.FC<{ card: PropagandaCardData; index: number }> = ({ card, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.unobserve(entry.target); // Trigger animation once
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
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

  // Animation variants: fade in and slide up
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts hidden and 50px below
    visible: {
      opacity: 1,
      y: 0, // Moves to its natural position
      transition: {
        duration: 0.6, // Animation duration
        ease: "easeOut",
        delay: index * 0.15, // Staggered delay for each card
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
      className="bg-green-700 text-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center gap-4
                 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[400px] h-[280px] sm:h-[300px] hover:scale-105 transition-transform duration-300"
    >
      <h1 className="text-5xl sm:text-6xl text-white mb-2">{card.icon}</h1>
      <h2 className="text-2xl sm:text-3xl font-bold">{card.title}</h2>
      <p className="text-base sm:text-lg mx-2 leading-relaxed">{card.desc}</p>
    </motion.div>
  );
};

const PropagandaPage = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10 mb-20 bg-gray-50">
      {/* Section Title and Description */}
      <div className="text-center mt-22 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800">
            الدعاية والإعلان
          </h1>
          <FaLeaf className="text-4xl sm:text-5xl text-green-700" />
        </div>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          هل أنت صاحب شركة زراعية، مورد مبيدات، أو تقدم خدمات ذات صلة بقطاع
          الزراعة؟ "بوابة مدرسة الزراعة" توفر لك فرصة ذهبية للوصول إلى جمهور
          مستهدف من طلاب وخريجي وخبراء الزراعة. ضع إعلانك على موقعنا ووصل رسالتك
          إلى الآلاف من المهتمين بالقطاع الزراعي.
        </p>
      </div>

      {/* Call to Action Button */}
      <button className="bg-green-700 py-3 px-8 rounded-lg text-center text-xl text-white font-semibold cursor-pointer hover:bg-green-600 transition-all duration-300 shadow-md">
        اعلن معنا الآن
      </button>

      {/* "Why Advertise With Us" Section */}
      <div className="w-full max-w-5xl mx-auto text-right mt-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 px-4 sm:px-0">
          لماذا تعلن معنا؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {dbAdsCard.map((card, index) => (
            <AnimatedPropagandaCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropagandaPage;