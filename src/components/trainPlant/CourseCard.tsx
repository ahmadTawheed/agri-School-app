// مكون Next.js لبطاقة الدورة التدريبية (يمكنك حفظه في ملف مثل components/CourseCard.tsx)
import Image from 'next/image';

interface CourseCardProps {
  imageSrc: any;
  title: string;
  description: string;
  price?: number; // السعر اختياري، إذا كانت الدورة مجانية فلن يتم تمريره
  isFree: boolean;
  link: string; // رابط "معرفة المزيد"
  category: 'زراعة' | 'زيارات ميدانية' | 'مهارات شخصية' | 'برامج كمبيوتر';
}

const CourseCard: React.FC<CourseCardProps> = ({
  imageSrc,
  title,
  description,
  price,
  isFree,
  link,
  category,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative">
      <Image
                draggable={false}
          priority={false}
        className="w-full h-48 object-cover"
        src={imageSrc}
        alt={title}
        width={400}
        height={200}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-700">{title}</div>
        <p className="text-gray-700 text-base h-24 overflow-hidden">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {isFree ? (
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-[#2D4F2B] mr-2 mb-2">
            مجانية
          </span>
        ) : (
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
            السعر: {price?.toLocaleString('ar-EG')} جنيه مصري
          </span>
        )}
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {category}
        </span>
      </div>
      <div className="px-6 py-4">
        <a
          href={link}
          className="bg-[#2D4F2B] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          target="_blank"
          rel="noopener noreferrer"
        >
          معرفة المزيد
        </a>
      </div>
    </div>
  );
};

export default CourseCard;