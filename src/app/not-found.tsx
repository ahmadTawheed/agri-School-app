import Image from 'next/image'
import {dbImg} from "@/imgs/dbImg";
const NotFoundPage = () => {
  return (
        <section className='h-[100vh] flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
          <Image
          draggable={false}
          priority={false}
          className='w-[100px] mb-5'
          src={dbImg.emptyJob} alt='emptyJop' />
          <h2> لا يوجد محتوى هنا ! </h2>
          <h2> من فضلك قم بالعودة الى القائمة الرئيسية </h2>
          </div>
        </section>
  )
}

export default NotFoundPage