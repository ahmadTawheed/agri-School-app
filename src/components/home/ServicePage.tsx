"use client";

import "@/components/home/style/home.css"; // Your existing CSS
// import styles from "@/components/home/style/animateCard.module.css"; // We might not need this if we use Framer Motion or direct Tailwind for animation
import { useEffect, useRef, useState } from "react";
import { BsClipboard2DataFill, BsClipboardPlusFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion for animation

// Define the structure for service card data
interface ServiceCard {
      //@ts-ignore
  icon: JSX.Element; // React icon component
  title: string;
  desc: string;
  link: string;
}

// Data for service cards
const dbServiceCard: ServiceCard[] = [
  {
    icon: <BsClipboard2DataFill />,
    title: "بيانات شاملة",
    desc: "نوفر لك بيانات ومعلومات قيمة تغطي جميع التخصصات الزراعية",
    link: "/category",
  },
  {
    icon: <MdWorkHistory />,
    title: "فرص وظائف",
    desc: "تصفح أحدث فرص العمل المتاحة لخريجي الزراعة في مختلف التخصصات",
    link: "/jobs",
  },
  {
    icon: <BsClipboardPlusFill />,
    title: "طلب استشارة",
    desc: "احصل على استشارات فردية من خبراء في وقاية النبات لمساعدتك في تحدياتك",
    link: "/consultation",
  },
];

// Reusable component for an animated service card
const AnimatedServiceCard: React.FC<{ card: ServiceCard; index: number }> = ({ card, index }) => {
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
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1, // Stagger animation for each card
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[#2D4F2B] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center w-full max-w-sm sm:w-80 h-72 shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate based on inView state
      //@ts-ignore
      variants={cardVariants}
    >
      <h1 className="text-5xl text-[#ffff]">{card.icon}</h1> {/* Larger icon size */}
      <h2 className="text-2xl text-[#ffff] font-bold">{card.title}</h2> {/* Use h2 for semantic hierarchy */}
      <p className="text-base text-[#ffff] mx-4">{card.desc}</p> {/* Adjusted text size and margin */}
      <Link href={card.link} passHref>
        <button className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white font-medium cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out">
          معرفة المزيد
        </button>
      </Link>
    </motion.div>
  );
};

const ServicePage = () => {
  return (
    <section id="OurService" className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mt-15 mb-20">
      <div className="flex items-center justify-center gap-3">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold">
          خدماتنا المتاحة
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
      </div>
      <p className="text-lg sm:text-xl text-[#2D4F2B] max-w-2xl text-center">
        نقدم لك مجموعة من الخدمات المصممة خصيصًا لتلبية احتياجاتك في مجال وقاية
        النبات.
      </p>
      <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-10">
        {dbServiceCard.map((card, index) => (
          <AnimatedServiceCard key={index} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicePage;