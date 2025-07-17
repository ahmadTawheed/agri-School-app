"use client";

import { useEffect, useRef, useState } from "react";
import { HiEmojiHappy } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion for animation

// Define the structure for choose card data
interface ChooseCard {
   //@ts-expect-error
  icon: JSX.Element; // React icon component
  title: string;
  desc: string;
}

// Data for choose cards
const dbChooseCard: ChooseCard[] = [
  {
    icon: <HiEmojiHappy />,
    title: "واجهة سهلة الاستخدام",
    desc: "تصميم بسيط ومنظم يتيح لك الوصول للمعلومات بسرعة وسهولة",
  },
  {
    icon: <FaClipboardList />,
    title: "معلومات دقيقة",
    desc: "نقدم محتوى معتمد ومراجع علمية من مصادر موثوقة لضمان الدقة",
  },
  {
    icon: <MdTipsAndUpdates />,
    title: "تحديثات مستمرة",
    desc: "نواكب أحدث التطورات والأبحاث في مجال وقاية النبات لنقدم لك كل جديد",
  },
];

// Reusable component for an animated "Why Choose Us" card
const AnimatedChooseCard: React.FC<{ card: ChooseCard; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set inView to true only if it's intersecting and not already true
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
        // If you want the animation to reset when scrolling out of view, you can add:
        // else if (!entry.isIntersecting && inView) {
        //   setInView(false);
        // }
      },
      {
        threshold: 0.3, // Card becomes visible when 30% of it is in view
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
  }, [inView]); // Dependency array includes inView to avoid unnecessary re-observing

  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts hidden and below
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: index * 0.15, // Stagger animation for each card
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[#2D4F2B] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center w-full max-w-sm sm:w-80 h-72 shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView state
   //@ts-expect-error
      variants={cardVariants}
    >
      <h1 className="text-5xl text-[#ffff]">{card.icon}</h1> {/* Larger icon size */}
      <h2 className="text-2xl text-[#ffff] font-bold">{card.title}</h2> {/* Use h2 for semantic hierarchy */}
      <p className="text-base text-[#ffff] mx-4">{card.desc}</p> {/* Adjusted text size and margin */}
    </motion.div>
  );
};

const WhyChoosePage = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mt-15 mb-20">
      <div className="flex items-center justify-center gap-3">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold text-center">
          لماذا تختارنا؟
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
      </div>
      <p className="text-lg sm:text-xl text-[#2D4F2B] max-w-2xl text-center">
        نحن نلتزم بتقديم أفضل تجربة تعليمية ومرجعية لطلاب وخريجي الزراعة.
      </p>
      <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-10">
        {dbChooseCard.map((card, index) => (
          <AnimatedChooseCard key={index} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WhyChoosePage;