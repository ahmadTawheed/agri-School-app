// components/plantDisease/FilterPanel.tsx
"use client";

import { useState, useEffect } from "react"; // استيراد useEffect
import { motion, AnimatePresence } from "framer-motion";

// تعريف أنواع الأمراض المتاحة
export type DiseaseType =
  | "All"
  | "Fungi"
  | "Virus"
  | "Bacteria"
  | "Nematode"
  | "Parasitic"
  | "NonInfectious";

interface FilterPanelProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilter: (filters: DiseaseType[]) => void;
  currentFilters: DiseaseType[]; // الفلاتر المطبقة حالياً من المكون الأب
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isVisible,
  onClose,
  onApplyFilter,
  currentFilters,
}) => {
  // استخدام حالة داخلية لـ selectedTypes لتمثيل التغييرات المؤقتة في لوحة الفلترة
  const [selectedTypes, setSelectedTypes] = useState<DiseaseType[]>(currentFilters);

  // تحديث selectedTypes كلما تغيرت currentFilters (أي عند فتح اللوحة بحالة جديدة)
  useEffect(() => {
    setSelectedTypes(currentFilters);
  }, [currentFilters]);

  // تحديث حالة الفلاتر عند تغيير الـ checkbox
  const handleCheckboxChange = (type: DiseaseType) => {
    setSelectedTypes((prevSelected) => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter((t) => t !== type);
      } else {
        // إذا كان "All" موجودًا، يتم إزالته عند اختيار أنواع محددة
        if (type !== "All" && prevSelected.includes("All")) {
            return [type];
        }
        // إذا تم اختيار "All"، يتم إلغاء اختيار كل الأنواع الأخرى
        if (type === "All") {
            return ["All"];
        }
        return [...prevSelected, type];
      }
    });
  };

  // تطبيق الفلاتر
  const applyFilters = () => {
    // إذا لم يتم اختيار أي شيء، أو إذا تم اختيار "All" فقط، نرسل "All"
    if (selectedTypes.length === 0 || (selectedTypes.length === 1 && selectedTypes[0] === "All")) {
      onApplyFilter(["All"]);
    } else {
      // إزالة "All" إذا كانت هناك أنواع محددة مختارة
      onApplyFilter(selectedTypes.filter(type => type !== "All"));
    }
    onClose();
  };

  // مسح الفلاتر
  const clearFilters = () => {
    setSelectedTypes(["All"]); // إعادة تعيين لـ "الكل" داخلياً
    onApplyFilter(["All"]); // إرسال "الكل" للمكون الأب
    onClose();
  };

  const panelVariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: {
      opacity: 1,
      y: "0",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: "100vh",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-[#00000082] z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-xl bg-[#F6FBF9] p-6 sm:p-8 text-center relative"
   //@ts-expect-error
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl sm:text-2xl text-[#2D4F2B] font-bold mb-6">فلترة أمراض النبات</h2>

            {/* خيارات الفلترة */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { label: "جميع الأمراض", type: "All" }, // إضافة خيار "الكل"
                { label: "الأمراض الفطرية", type: "Fungi" },
                { label: "الأمراض البكتيرية", type: "Bacteria" },
                { label: "الأمراض الفيروسية", type: "Virus" },
                { label: "أمراض النيماتودا", type: "Nematode" },
                { label: "أمراض الطفيليات النباتية", type: "Parasitic" },
                { label: "أمراض غير معدية", type: "NonInfectious" },
              ].map(({ label, type }) => (
                <div key={type} className="w-full flex items-center justify-between px-2 py-1">
                  <label htmlFor={`filter-${type}`} className="text-lg text-[#2D4F2B] font-medium cursor-pointer">
                    {label}
                  </label>
                  <input
                    id={`filter-${type}`}
                    className="w-5 h-5 accent-[#2D4F2B] cursor-pointer"
                    type="checkbox"
                    checked={selectedTypes.includes(type as DiseaseType)}
                    onChange={() => handleCheckboxChange(type as DiseaseType)}
                  />
                </div>
              ))}
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={applyFilters}
                className="bg-green-950 py-3 px-6 rounded-xl text-center text-lg text-white font-medium cursor-pointer hover:bg-[#708A58] transition-all duration-300 ease-in-out shadow-md"
              >
                قم بالفلترة
              </button>
              <button
                onClick={clearFilters}
                className="bg-red-700 py-3 px-6 rounded-xl text-center text-lg text-white font-medium cursor-pointer hover:bg-red-800 transition-all duration-300 ease-in-out shadow-md"
              >
                مسح الفلاتر
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 py-3 px-6 rounded-xl text-center text-lg text-white font-medium cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-md"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;