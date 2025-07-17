// مكون Next.js لبطاقة الوظيفة (يمكنك حفظه في ملف مثل components/JobCard.tsx)
import Image from 'next/image';

interface JobCardProps {
  imageSrc: any;
  title: string;
  description: string;
  postedDate: string; // تاريخ إعلان الوظيفة
  link: string; // رابط "معرفة التفاصيل"
}

const JobCard: React.FC<JobCardProps> = ({
  imageSrc,
  title,
  description,
  postedDate,
  link,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative">
      <Image
        className="w-full h-48 object-cover"
        src={imageSrc}
        alt={title}
        width={400}
        height={200}
        priority // استخدم priority للصور الهامة في الجزء المرئي من الصفحة
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-[#2D4F2B]">{title}</div>
        <p className="text-gray-700 text-base h-24 overflow-hidden mb-2">
          {description}
        </p>
        <p className="text-gray-500 text-sm">
          تاريخ الإعلان: {postedDate}
        </p>
      </div>
      <div className="px-6 py-4">
        <a
          href={link}
          className="bg-[#2D4F2B] hover:bg-[#708A58] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          target="_blank"
          rel="noopener noreferrer"
        >
          معرفة التفاصيل
        </a>
      </div>
    </div>
  );
};

export default JobCard;