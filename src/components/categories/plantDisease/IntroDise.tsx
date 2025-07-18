// components/plantDisease/IntroDise.tsx (مثال - قم بتعديله ليناسب المحتوى الفعلي)
import { FaLeaf } from 'react-icons/fa';

const IntroDise: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-10 sm:mt-12 lg:mt-16 text-center">
      <div className="flex items-center justify-center gap-3">
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2D4F2B] font-bold leading-tight">
          أمراض النبات
        </h1>
        <FaLeaf className="text-4xl sm:text-5xl text-[#2D4F2B]" />
      </div>
      <p className="text-lg sm:text-xl text-[#2D4F2B] mb-8 max-w-2xl text-center">
        هنا ستجد معلومات مفصلة عن مختلف أمراض النبات وأنواعها وطرق الوقاية والعلاج.
      </p>
    </div>
  );
};

export default IntroDise;