
import { dbImg } from "@/imgs/dbImg";
import JobCard from "@/components/jopPlant/JobCard";

const JobsPage: React.FC = () => {
  const jobs = [
    {
imageSrc: dbImg.bgJpg,
      title: 'مهندس زراعي ميداني',
      description: 'مطلوب مهندس زراعي بخبرة في إدارة المحاصيل والإشراف على المشاريع الزراعية في مواقع مختلفة.',
      postedDate: '15 يوليو 2025',
      link: '/jobs/field-engineer',
    },
    {
      imageSrc: dbImg.bgJpg,
      title: 'مدير مزرعة',
      description: 'نبحث عن مدير مزرعة ذو خبرة واسعة في إدارة العمليات الزراعية، تخطيط الإنتاج، وإدارة العمالة.',
      postedDate: '10 يوليو 2025',
      link: '/jobs/farm-manager',
    },
    {
      imageSrc: dbImg.bgJpg,
      title: 'أخصائي جودة منتجات زراعية',
      description: 'مطلوب أخصائي لضمان جودة المنتجات الزراعية من الحقل إلى المستهلك، مع الالتزام بالمعايير الدولية.',
      postedDate: '01 يوليو 2025',
      link: '/jobs/quality-specialist',
    },
    {
      imageSrc: dbImg.bgJpg,
      title: 'مندوب مبيعات منتجات زراعية',
      description: 'فرصة لمندوب مبيعات طموح للانضمام لفريقنا لتسويق وبيع المنتجات الزراعية للمزارعين والشركات.',
      postedDate: '28 يونيو 2025',
      link: '/jobs/sales-rep',
    },
    {
      imageSrc: dbImg.bgJpg,
      title: 'مساعد باحث زراعي',
      description: 'مطلوب مساعد باحث للمشاركة في التجارب الزراعية وجمع وتحليل البيانات لدعم الأبحاث الجديدة.',
      postedDate: '20 يونيو 2025',
      link: '/jobs/research-assistant',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#2D4F2B] mb-6 mt-25">فرص عمل في المجال الزراعي</h1>
      <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
        هل تبحث عن فرصة عمل في قطاع الزراعة المزدهر؟ استكشف أحدث الوظائف الشاغرة لدينا، من المهندسين الزراعيين إلى الفنيين والمتخصصين في مختلف المجالات. انضم إلى فريقنا وساهم في مستقبل الزراعة!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;