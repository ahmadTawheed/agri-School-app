"use client";

import { useEffect, useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion for animation

import contactImg from "@/components/home/style/contact.png"; // Renamed to avoid conflict with component name
// import styles from "@/components/home/style/animateCard.module.css"; // No longer needed if using Framer Motion

const Contact = () => {
  const animatedElementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set isVisible to true only if it's intersecting and not already true
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
        // If you want the animation to reset when scrolling out of view, you can add:
        // else if (!entry.isIntersecting && isVisible) {
        //   setIsVisible(false);
        // }
      },
      {
        threshold: 0.4, // Box becomes visible when 40% of it is in view
      }
    );

    if (animatedElementRef.current) {
      observer.observe(animatedElementRef.current);
    }

    return () => {
      if (animatedElementRef.current) {
        observer.unobserve(animatedElementRef.current);
      }
    };
  }, [isVisible]); // Dependency array includes isVisible to avoid unnecessary re-observing

  // Framer Motion variants for the main contact box animation
  const boxVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts hidden and below
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 mt-15 mb-20 min-h-[60vh]"> {/* Adjusted height for better responsiveness */}
      <div className="flex items-center justify-center gap-3">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold text-center">
          تواصل معنا
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
      </div>
      <p className="text-lg sm:text-xl text-[#2D4F2B] mb-10 text-center max-w-2xl">
        لديك أي استفسار، اقتراح، أو ترغب في المساهمة بمقال؟ نحن هنا لمساعدتك.
      </p>

      <motion.div
        ref={animatedElementRef}
        className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center bg-[#F6FBF9] shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 gap-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={boxVariants}
      >
        <div className="flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-right w-full md:w-3/5">
          <h2 className="text-3xl sm:text-4xl text-[#2D4F2B] font-bold leading-tight">
            نحن بانتظار تواصلك
          </h2>
          <p className="text-base sm:text-lg text-[#2D4F2B] max-w-lg">
            تواصل معنا عبر النموذج أدناه أو عن طريق البريد الإلكتروني وسنقوم
            بالرد عليك في أقرب وقت.
          </p>
          <Link href="/contact" passHref>
            <button className="bg-green-950 py-3 px-6 sm:py-4 sm:px-8 rounded-xl text-center text-lg sm:text-xl text-white font-medium cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md">
              تواصل معنا الآن
            </button>
          </Link>
        </div>

        <div className="w-full md:w-2/5 flex justify-center items-center">
          <Image
          draggable={false}
          priority={false}
            className="w-48 sm:w-64 md:w-72 h-auto object-contain" // Adjusted image sizing
            src={contactImg} // Using renamed import
            alt="contact us illustration"
            width={300} // Added width and height for Next/Image optimization
            height={300}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;