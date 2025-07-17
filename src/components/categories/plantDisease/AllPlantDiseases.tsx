// components/plantDisease/AllPlantDiseases.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedDiseaseCard, { DiseaseCardData } from "@/components/categories/plantDisease/AnimatedDiseaseCard";
import { DiseaseType } from "./FilterPanel";

// ================================================================
// بيانات الأمراض: أضفنا أنواعًا ومزيدًا من الأمثلة لكل نوع
// ================================================================

const allDiseasesData: DiseaseCardData[] = [
  // مقدمة عامة
  {
    link: "https://ahmedtawheed.blogspot.com/p/blog-page_17.html",
    name: "مقدمة عن أمراض النبات",
    type: "All", // يمكن أن تكون 'All' أو نوع محدد إذا أردت فلترتها
  },

  // الأمراض الفطرية (Fungi) - 4 أمثلة
  { link: "#", name: "مقدمة عن الأمراض الفطرية", type: "Fungi" },
  { link: "#", name: "البياض الزغبي في الخيار", type: "Fungi" },
  { link: "#", name: "البياض الدقيقي في العنب", type: "Fungi" },
  { link: "#", name: "مرض الصدأ الأصفر في القمح", type: "Fungi" },
  { link: "#", name: "لفحة الساق في الطماطم", type: "Fungi" }, // مثال إضافي

  // الأمراض البكتيرية (Bacteria) - 4 أمثلة
  { link: "#", name: "مقدمة عن الأمراض البكتيرية", type: "Bacteria" },
  { link: "#", name: "اللفحة النارية في التفاح", type: "Bacteria" },
  { link: "#", name: "تدرن الزيتون", type: "Bacteria" },
  { link: "#", name: "الذبول البكتيري في البطاطس", type: "Bacteria" },
  { link: "#", name: "تقرح الحمضيات البكتيري", type: "Bacteria" }, // مثال إضافي

  // الأمراض الفيروسية (Virus) - 4 أمثلة
  { link: "#", name: "مقدمة عن الأمراض الفيروسية", type: "Virus" },
  { link: "#", name: "فيروس تبرقش التبغ (TMV)", type: "Virus" },
  { link: "#", name: "فيروس تجعد واصفرار أوراق الطماطم (TYLCV)", type: "Virus" },
  { link: "#", name: "فيروس تقزم الأرز (RDV)", type: "Virus" },
  { link: "#", name: "فيروس تبرقش الخيار (CMV)", type: "Virus" }, // مثال إضافي

  // أمراض النيماتودا (Nematode) - 4 أمثلة
  { link: "#", name: "مقدمة عن أمراض النيماتودا", type: "Nematode" },
  { link: "#", name: "نيماتودا تعقد الجذور", type: "Nematode" },
  { link: "#", name: "نيماتودا تقصف الجذور", type: "Nematode" },
  { link: "#", name: "نيماتودا السيقان والأبصال", type: "Nematode" },
  { link: "#", name: "نيماتودا قرحة الجذور", type: "Nematode" }, // مثال إضافي

  // أمراض الطفيليات النباتية (Parasitic) - 4 أمثلة
  { link: "#", name: "مقدمة عن أمراض الطفيليات النباتية", type: "Parasitic" },
  { link: "#", name: "الحامول (الكاسكوت)", type: "Parasitic" },
  { link: "#", name: "الهالوك (الأوربانش)", type: "Parasitic" },
  { link: "#", name: "العوينة (السينايتا)", type: "Parasitic" },
  { link: "#", name: "الدبق", type: "Parasitic" }, // مثال إضافي

  // أمراض غير معدية (NonInfectious) - 4 أمثلة
  { link: "#", name: "مقدمة عن الأمراض غير المعدية", type: "NonInfectious" },
  { link: "#", name: "أضرار الصقيع والحرارة", type: "NonInfectious" },
  { link: "#", name: "نقص العناصر الغذائية", type: "NonInfectious" },
  { link: "#", name: "تسمم المبيدات", type: "NonInfectious" },
  { link: "#", name: "سوء الصرف والتهوية", type: "NonInfectious" }, // مثال إضافي
];

interface AllPlantDiseasesProps {
  activeFilters: DiseaseType[];
  searchTerm: string;
}
//#
// components/plantDisease/AllPlantDiseases.tsx
// ... (الكود العلوي لم يتغير) ...

const AllPlantDiseases: React.FC<AllPlantDiseasesProps> = ({ activeFilters, searchTerm }) => {
  const [filteredDiseases, setFilteredDiseases] = useState<DiseaseCardData[]>([]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const newFilteredDiseases = allDiseasesData.filter((disease) => {
      // إذا كان "All" ضمن الفلاتر النشطة، أو لم يتم تحديد أي فلاتر محددة (بعد إزالة "All" من selectedTypes)
      // فإننا نعرض جميع الأمراض.
      const typeMatches =
        activeFilters.includes("All") || activeFilters.length === 0 // هذه الحالة يجب ألا تحدث مع التعديلات الجديدة
        || (disease.type && activeFilters.includes(disease.type as DiseaseType));


      // تطبيق فلترة البحث
      const searchMatches = disease.name.toLowerCase().includes(term);

      return typeMatches && searchMatches;
    });
    setFilteredDiseases(newFilteredDiseases);
  }, [activeFilters, searchTerm]);

  // دالة لمجموعة الأمراض حسب النوع لعرضها في مجموعات
  const groupDiseasesByType = (diseases: DiseaseCardData[]) => {
    const grouped: { [key: string]: DiseaseCardData[] } = {};
    diseases.forEach((disease) => {
      const type = disease.type || "Other"; // استخدم "Other" إذا لم يكن هناك نوع
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(disease);
    });
    return grouped;
  };

  const groupedDiseases = groupDiseasesByType(filteredDiseases);

  // ترتيب عرض أنواع الأمراض
  const orderedTypes: DiseaseType[] = ["Fungi", "Bacteria", "Virus", "Nematode", "Parasitic", "NonInfectious"];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 mt-10">
      {Object.keys(groupedDiseases).length === 0 && (
        <p className="text-xl text-red-600 font-bold mt-10">
          عذراً، لا توجد أمراض مطابقة للمعايير المحددة.
        </p>
      )}

      {/* عرض "مقدمة عن أمراض النبات" فقط إذا لم يكن هناك فلاتر محددة (أي "All" نشط) */}
      {activeFilters.includes("All") && filteredDiseases.some(d => d.name === "مقدمة عن أمراض النبات") && (
        <div className="w-full flex flex-col items-center gap-4">
             {/* هذه البطاقة يتم التعامل معها في ComponentsPLantDise.tsx */}
             {/* لا تعرضها هنا لتجنب التكرار في حالة الفلترة */}
        </div>
      )}

      {orderedTypes.map((type) => {
        const diseasesOfType = groupedDiseases[type];
        if (diseasesOfType && diseasesOfType.length > 0) {
          return (
            <div key={type} className="w-full flex flex-col items-center gap-6">
              <div className="w-full text-right px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h3 className="text-2xl sm:text-3xl text-[#2D4F2B] font-bold text-right">
                  الأمراض <span className="text-[#FFB823]">{
                    type === "Fungi" ? "الفطرية" :
                    type === "Bacteria" ? "البكتيرية" :
                    type === "Virus" ? "الفيروسية" :
                    type === "Nematode" ? "النيماتودا" :
                    type === "Parasitic" ? "الطفيلية" :
                    type === "NonInfectious" ? "غير المعدية" : ""
                  }</span>
                </h3>
              </div>
              <div className="w-full flex flex-col items-center gap-4">
                {diseasesOfType.map((card, idx) => (
                  // لا تعرض بطاقة "مقدمة عن أمراض النبات" هنا إذا كانت موجودة في هذه المجموعة
                  card.name !== "مقدمة عن أمراض النبات" && (
                    <AnimatedDiseaseCard key={`${type}-${idx}`} card={card} index={idx} />
                  )
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default AllPlantDiseases;;