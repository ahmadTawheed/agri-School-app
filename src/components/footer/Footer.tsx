import Image from "next/image";
import { dbImg } from "@/imgs/dbImg";
// import "@/components/footer/footer.css"; // We will integrate CSS directly into Tailwind classes or remove if not needed
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F6FBF9] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-10">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-8 flex-wrap">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-auto md:max-w-[300px] text-center md:text-right">
          <Link href="/">
            <Image
          draggable={false}
          priority={false}
              className="w-[150px] mb-2 mx-auto md:mx-0"
              src={dbImg.logoPng}
              alt="logo"
              width={150} // Optimized for Next/Image
              height={50} // Optimized for Next/Image
            />
          </Link>
          <p className="text-base sm:text-lg text-[#2D4F2B]">
            بوابة مدرسة الزراعة، دليلك الشامل لطلاب وخريجي الزراعة.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-auto">
          <h2 className="text-lg sm:text-xl text-[#2D4F2B] font-bold">روابط سريعة</h2>
          <Link href="https://ahmedtawheed.blogspot.com/p/blog-page.html" target="_blank" rel="noopener noreferrer" className="footer-link">
            خدمات أخرى
          </Link>
          <Link href="/jobs" className="footer-link">
            وظائف
          </Link>
          <Link href="/consultation" className="footer-link">
            استشارة
          </Link>
          <Link href="/contact" className="footer-link">
            تواصل معنا
          </Link>
        </div>

        {/* Sections */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-auto">
          <h2 className="text-lg sm:text-xl text-[#2D4F2B] font-bold">الأقسام</h2>
          <Link href="/plantProtection" className="footer-link">
            <p>وقاية نبات</p>
          </Link>
          {/* Consider making these into Links if they point to actual pages */}
          <p className="text-base text-[#2D4F2B]">إنتاج نباتي</p>
          <p className="text-base text-[#2D4F2B]">تكنولوجيا حيوية</p>
          <p className="text-base text-[#2D4F2B]">أراضي ومياه</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-auto">
          <h2 className="text-lg sm:text-xl text-[#2D4F2B] font-bold">وسائل التواصل</h2>
          {/* Replace with actual social media links and icons if available */}
          <p className="text-base text-[#2D4F2B] hover:text-[#708A58] transition-colors cursor-pointer">فيسبوك</p>
          <p className="text-base text-[#2D4F2B] hover:text-[#708A58] transition-colors cursor-pointer">يوتيوب</p>
          <p className="text-base text-[#2D4F2B] hover:text-[#708A58] transition-colors cursor-pointer">لينكد ان</p>
          <p className="text-base text-[#2D4F2B] hover:text-[#708A58] transition-colors cursor-pointer">تيك توك</p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-[#2D4F2B] mt-6">
        جميع الحقوق محفوظة {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;