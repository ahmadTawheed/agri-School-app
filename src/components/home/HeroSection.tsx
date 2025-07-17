"use client"; // This is crucial for Framer Motion to work in Next.js App Router

import Link from "next/link";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "@/components/home/style/home.css"; // Your existing CSS file

const HeroSection = () => {
  // Variants for text animation (coming from right)
  const textVariants = {
    hidden: { opacity: 0, x: 100 }, // Starts invisible and 100px to the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Ends visible at original position
  };

  // Variants for button animation (coming from bottom)
  const buttonVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts invisible and 50px below
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } }, // Ends visible at original position, with a slight delay
  };

  return (
    <section className="flex items-center justify-center sectionBG px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl text-center p-4">
        {/* Animated Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            //@ts-ignore
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          بوابة مدرسة الزراعة، دليلك الشامل لطلاب وخريجي الزراعة
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          className="text-lg sm:text-xl leading-8 sm:leading-9 text-white max-w-3xl"
            //@ts-ignore
          variants={textVariants}
          initial="hidden"
          animate="visible"
            //@ts-ignore
          transition={{ ...textVariants.visible.transition, delay: 0.3 }} // Add a slight delay for paragraph
        >
          هل أنت طالب أو خريج زراعة وتبحث عن مصدر موثوق وشامل لكل ما يتعلق
          بوقاية النبات؟ "بوابة مدرسة الزراعة" هي وجهتك المثالية! نحن نقدم لك
          أحدث وأدق المعلومات في مجال أمراض النبات، الحشرات الزراعية، والمبيدات،
          لمساعدتك في رحلتك الأكاديمية والمهنية.
        </motion.p>

        {/* Animated Button */}
        <Link href="#OurService" scroll={true}> {/* Added scroll={true} for smooth scroll */}
          <motion.button
            className="bg-[#2D4F2B] py-3 px-6 sm:py-4 sm:px-8 rounded-full text-center text-xl sm:text-2xl font-black text-white cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-lg"
            //@ts-ignore
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            اكتشف المزيد
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;