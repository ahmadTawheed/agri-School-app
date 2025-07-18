"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowDropDown, MdMenu, MdClose } from "react-icons/md"; // Add MdMenu and MdClose icons

// Assuming dbImg is correctly imported and contains logoPng
import { dbImg } from "@/imgs/dbImg";
import "@/components/navbar/navbar.css";

const Navbar = () => {
  const [showMore, setShowMore] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const moreRef = useRef<HTMLLIElement>(null);
  const categoryRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMore(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategory(false);
      }
      // Close mobile menu if clicking outside of it when it's open
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Function to close all dropdowns/menus
  const closeAllMenus = () => {
    setShowMore(false);
    setShowCategory(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full h-[100px] bg-[#F6FBF9] flex items-center justify-between px-4 md:px-20 fixed z-50 shadow-md">
      {/* Logo */}
      <Link href="/" onClick={closeAllMenus}>
        <Image 
                draggable={false}
          priority={false}  
      className="w-[8rem]" src={dbImg.logoPng} alt="logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex flex-row items-center justify-center gap-10 text-xl font-bold text-[#2D4F2B]">
        <Link href="/" onClick={closeAllMenus}>
          <li> الرئيسية</li>
        </Link>

        {/* Categories Dropdown */}
        <li
          ref={categoryRef}
          onClick={() => setShowCategory(!showCategory)}
          className="relative flex items-center justify-center gap-1 cursor-pointer"
        >
          الأقسام
          <MdArrowDropDown className="text-3xl mt-1" />
          {showCategory && (
            <div className="absolute top-full left-0 mt-2 w-[180px] bg-[#F6FBF9] drop-shadow-lg flex flex-col items-start rounded-md overflow-hidden">
              <Link href="/category" className="moreNav" onClick={closeAllMenus}>
                <h1> مقدمة </h1>
              </Link>
              <Link href="/plantProtection" className="moreNav" onClick={closeAllMenus}>
                <h1> وقاية نبات </h1>
              </Link>
              {/* Add more categories here */}
            </div>
          )}
        </li>

        <Link href="/ai" onClick={closeAllMenus}>
          <li> AI </li>
        </Link>
        <Link href="/generalArticles" onClick={closeAllMenus}>
          <li> مقالات عامة </li>
        </Link>
        <Link href="/whoAreWe" onClick={closeAllMenus}>
          <li> من نحن </li>
        </Link>
        <Link href="/contact" onClick={closeAllMenus}>
          <li> تواصل معنا </li>
        </Link>

        {/* More Dropdown */}
        <li
          ref={moreRef}
          onClick={() => setShowMore(!showMore)}
          className="relative flex items-center justify-center gap-1 cursor-pointer"
        >
          المزيد
          <MdArrowDropDown className="text-3xl mt-1" />
          {showMore && (
            <div className="absolute top-full left-0 mt-2 w-[180px] bg-[#F6FBF9] drop-shadow-lg flex flex-col items-start rounded-md overflow-hidden">
              <Link href="https://ahmedtawheed.blogspot.com/p/blog-page.html" target="_blank" className="moreNav" onClick={closeAllMenus}>
                <h1> خدمات أخرى </h1>
              </Link>
              <Link href="/consultation" className="moreNav" onClick={closeAllMenus}>
                <h1> طلب استشارة </h1>
              </Link>
              <Link href="/propaganda" className="moreNav" onClick={closeAllMenus}>
                <h1> الدعاية </h1>
              </Link>
              <Link href="/jobs" className="moreNav" onClick={closeAllMenus}>
                <h1> وظائف </h1>
              </Link>
              <Link href="/trainingCourses" className="moreNav" onClick={closeAllMenus}>
                <h1> دورات تدريبية </h1>
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <MdClose className="text-4xl text-[#2D4F2B]" />
          ) : (
            <MdMenu className="text-4xl text-[#2D4F2B]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[100px] left-0 w-full bg-[#F6FBF9] shadow-lg flex flex-col items-center py-4 md:hidden z-40"
        >
          <Link href="/" className="moreNav w-full" onClick={closeAllMenus}>
            الرئيسية
          </Link>

          {/* Mobile Categories Dropdown */}
          <div className="w-full text-center">
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="moreNav flex items-center justify-center w-full"
            >
              الأقسام <MdArrowDropDown className="text-3xl mt-1" />
            </button>
            {showCategory && (
              <div className="flex flex-col items-center w-full">
                <Link href="/category" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> مقدمة </h1>
                </Link>
                <Link href="/plantProtection" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> وقاية نبات </h1>
                </Link>
                {/* Add more categories here */}
              </div>
            )}
          </div>

          <Link href="/ai" className="moreNav w-full" onClick={closeAllMenus}>
            AI
          </Link>
          <Link href="/generalArticles" className="moreNav w-full" onClick={closeAllMenus}>
            مقالات عامة
          </Link>
          <Link href="/whoAreWe" className="moreNav w-full" onClick={closeAllMenus}>
            من نحن
          </Link>
          <Link href="/contact" className="moreNav w-full" onClick={closeAllMenus}>
            تواصل معنا
          </Link>

          {/* Mobile More Dropdown */}
          <div className="w-full text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="moreNav flex items-center justify-center w-full"
            >
              المزيد <MdArrowDropDown className="text-3xl mt-1" />
            </button>
            {showMore && (
              <div className="flex flex-col items-center w-full">
                <Link href="https://ahmedtawheed.blogspot.com/p/blog-page.html" target="_blank" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> خدمات أخرى </h1>
                </Link>
                <Link href="/consultation" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> طلب استشارة </h1>
                </Link>
                <Link href="/propaganda" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> الدعاية </h1>
                </Link>
                <Link href="/jobs" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> وظائف </h1>
                </Link>
                <Link href="/trainingCourses" className="moreNav pl-8 w-full text-center" onClick={closeAllMenus}>
                  <h1> دورات تدريبية </h1>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;