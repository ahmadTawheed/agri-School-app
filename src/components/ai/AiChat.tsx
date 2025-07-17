// components/AiAgricodeChat.tsx
"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react';
import { IoSend, IoMic, IoStopCircle } from 'react-icons/io5';
import { marked } from 'marked';
import Image from 'next/image';

// تعريف واجهة SpeechRecognition (للتوافقية مع TypeScript)
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const AiAgricodeChat = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const responseDivRef = useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<any>(null);

  // تحديث scroll عند وجود رد جديد
  useEffect(() => {
    if (responseDivRef.current) {
      responseDivRef.current.scrollTop = responseDivRef.current.scrollHeight;
    }
  }, [response]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ar-SA'; // تحديد اللغة العربية السعودية

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setResponse('تم رفض الوصول إلى الميكروفون. الرجاء السماح بالوصول من إعدادات المتصفح.');
        } else if (event.error === 'no-speech') {
          setResponse('لم يتم اكتشاف صوت. الرجاء التحدث بوضوح.');
        } else if (event.error === 'network') {
          setResponse('مشكلة في الاتصال. الرجاء التحقق من اتصال الإنترنت.');
        } else {
          setResponse('حدث خطأ في التعرف على الصوت: ' + event.error);
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
      setResponse('لا يدعم متصفحك ميزة التعرف على الصوت.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setUserInput('');
      setResponse('');
      try {
        recognitionRef.current.start();
      } catch (error: any) {
        console.error("Error starting speech recognition:", error);
        setIsRecording(false);
        setResponse('لا يمكن بدء التسجيل. قد تحتاج إلى منح إذن الميكروفون.');
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) {
      setResponse('الرجاء إدخال رسالة.');
      return;
    }

    setIsLoading(true);
    setResponse(''); // مسح الرد القديم قبل إرسال طلب جديد

    try {
      const apiResponse = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer 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',
            'HTTP-Referer': 'https://www.sitename.com', // استبدل بـ URL موقعك الحقيقي
            'X-Title': 'SiteName', // استبدل باسم موقعك الحقيقي
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1:free', // تأكد من أن هذا النموذج لا يزال متاحًا
            messages: [{ role: 'user', content: userInput }],
          }),
        }
      );

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(`خطأ في API: ${apiResponse.status} - ${errorData.message || 'خطأ غير معروف'}`);
      }

      const data = await apiResponse.json();
      console.log(data);

      const markdownText =
        data.choices?.[0]?.message?.content || 'لم يتم استلام أي رد.';

      const parsedHtml = await marked.parse(markdownText);
      setResponse(parsedHtml);

    } catch (error: any) {
      setResponse(`خطأ: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const dbSearch = [
    'نصائح للري الذكي',
    'أعراض نقص المغذيات في النباتات',
    'كيفية زراعة القمح',
    'أفضل أنواع الأسمدة العضوية',
    'أمراض الطماطم الشائعة',
    'طرق مكافحة الآفات الزراعية',
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* قسم العنوان والوصف */}
      <div className="text-center mb-8 w-full max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-green-800 leading-tight mb-3 mt-25">
          المساعد الذكي: دليلك الزراعي الشخصي
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700">
          اطرح أسئلتك واحصل على إجابات فورية ونصائح مخصصة لمزرعتك.
        </p>
      </div>

      {/* منطقة عرض الرد */}
      <section
        dir="rtl"
        className="w-full max-w-4xl p-6 sm:p-8 md:p-10 leading-relaxed bg-green-100 rounded-xl shadow-lg flex items-center justify-center min-h-[250px] sm:min-h-[300px] text-green-900 overflow-y-auto mb-8"
        // إضافة Tailwind utilities للتحكم في الارتفاع والoverflow
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#2D4F2B #F6FBF9' }} // For Firefox
      >
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <AiOutlineLoading3Quarters className="animate-spin text-5xl text-green-700" />
          </div>
        ) : (
          <div
            ref={responseDivRef}
            className='prose prose-lg max-w-none text-right w-full overflow-y-auto' // prose-lg لتحسين قراءة الخط
            dangerouslySetInnerHTML={{ __html: response || '<p class="text-gray-500">لا توجد إجابات بعد. كيف يمكنني مساعدتك؟</p>' }}
          ></div>
        )}
      </section>

      {/* منطقة الإدخال والأزرار واقتراحات البحث */}
      <section className="w-full max-w-4xl p-6 sm:p-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row-reverse items-center gap-4 w-full">
          {/* مربع النص */}
          <textarea
            name='userInput'
            id='userInput'
            placeholder='... اطرح سؤالك هنا '
            className='flex-grow p-4 outline-none border-2 border-green-700 bg-gray-50 rounded-lg leading-relaxed text-right text-lg resize-y min-h-[80px] max-h-[200px] focus:border-green-600 focus:ring-2 focus:ring-green-300 transition-all'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={3}
            disabled={isRecording || isLoading}
          ></textarea>

          {/* الأزرار (إرسال وتسجيل/إيقاف) */}
          <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            {/* زر الإرسال */}
            <button
              onClick={handleSendMessage}
              disabled={isLoading || isRecording || !userInput.trim()}
              className='flex items-center justify-center gap-2 bg-green-700 rounded-lg text-white font-bold px-5 py-3 text-lg hover:bg-green-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-1/2 sm:w-full'
            >
              {isLoading ? 'جاري الإرسال...' : 'إرسال'}
              <IoSend className="text-xl" />
            </button>

            {/* زر التسجيل / الإيقاف */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading || !recognitionRef.current}
              className={`flex items-center justify-center gap-2 rounded-lg text-white font-bold px-5 py-3 text-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-1/2 sm:w-full
                ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isRecording ? (
                <>
                  إيقاف
                  <IoStopCircle className="text-xl animate-pulse" />
                </>
              ) : (
                <>
                  تسجيل
                  <IoMic className="text-xl" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* اقتراحات البحث */}
        <div className='flex flex-wrap justify-center gap-3 mt-6'>
          {dbSearch.map((item, index) => (
            <button
              key={index}
              onClick={() => setUserInput(item)}
              className='bg-green-700 text-sm rounded-full text-white font-medium px-4 py-2 hover:bg-green-600 transition cursor-pointer whitespace-nowrap'
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </section>
  );
};

export default AiAgricodeChat;