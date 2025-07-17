// في صفحتك الرئيسية (مثل pages/courses.tsx أو pages/index.tsx)
import CourseCard from '@/components/trainPlant/CourseCard';
import Image from 'next/image'; // تأكد من استيراد Image هنا أيضًا إذا كنت تستخدمه مباشرة
import { dbImg } from "@/imgs/dbImg";

const CoursesPage: React.FC = () => {
  const courses = [
    {
      imageSrc: dbImg.coursePlant,
      title: 'إدارة المحاصيل المتقدمة',
      description: 'دورة شاملة تغطي أحدث تقنيات إدارة المحاصيل لزيادة الإنتاجية وتقليل التكاليف في الزراعة الحديثة.',
      isFree: false,
      price: 1200,
      link: '/courses/crop-management',
      category: 'زراعة',
    },
    {
      imageSrc: dbImg.coursePlant,
      title: 'صحة التربة والتسميد العضوي',
      description: 'تعلم كيفية تحسين خصوبة التربة باستخدام الأساليب العضوية والمستدامة لزراعة صحية.',
      isFree: true,
      link: '/courses/soil-health',
      category: 'زراعة',
    },
    {
      imageSrc: dbImg.coursePlant,
      title: 'زيارة ميدانية لمزرعة نموذجية',
      description: 'فرصة فريدة لزيارة مزرعة زراعية حديثة والتعرف على التطبيقات العملية للممارسات المستدامة.',
      isFree: false,
      price: 500,
      link: '/courses/field-visit',
      category: 'زيارات ميدانية',
    },
    {
      imageSrc: dbImg.coursePlant,
      title: 'مهارات التواصل الفعال',
      description: 'طور مهاراتك في التواصل لبناء علاقات أفضل وتحقيق أهدافك المهنية والشخصية.',
      isFree: true,
      link: '/courses/communication-skills',
      category: 'مهارات شخصية',
    },
    {
      imageSrc: dbImg.coursePlant,
      title: 'أساسيات برنامج Excel للمزارعين',
      description: 'تعلم كيفية استخدام Excel لتنظيم البيانات الزراعية، تتبع المصروفات، وإعداد التقارير.',
      isFree: false,
      price: 350,
      link: '/courses/excel-for-farmers',
      category: 'برامج كمبيوتر',
    },
  ] as const; // <--- أضف هذا الجزء هنا

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#2D4F2B] mb-6 mt-25">دوراتنا التدريبية</h1>
      <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
        انتقل بمهاراتك الزراعية والشخصية إلى المستوى التالي مع مجموعتنا المتنوعة من الدورات التدريبية! سواء كنت تبحث عن تعميق معرفتك بالممارسات الزراعية الحديثة، أو تطوير مهاراتك الشخصية، أو إتقان برامج الكمبيوتر الأساسية، فإن لدينا الدورة المناسبة لك. استكشف بطاقات الدورات أدناه لمعرفة المزيد.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;


