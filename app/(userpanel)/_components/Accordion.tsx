'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface FaqItem {
  id: number;
  faq_title: string;
  faq_desc: string;
}

function AccordionItem({ item, isOpen, onClick }: { item: FaqItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-primaryGreen-700 rounded-lg overflow-hidden">
      <button onClick={onClick} className="w-full flex justify-between items-center p-4 bg-primaryGreen-700 cursor-pointer">
        <h2 className="font-semibold md:text-lg text-white text-left">{item.faq_title}</h2>
        <motion.span animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
          <ChevronUp size={22} color="#fff" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
            <div className="p-4 bg-primaryGreen-700">
              <p className="text-sm md:text-base text-white text-justify">{item.faq_desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion() {
  const [faqList, setFaqList] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get('/api/faq');
        // API sudah select field yang diperlukan dan sort desc
        setFaqList(res.data.data ?? []);
      } catch (error) {
        console.error('Error fetching FAQ:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaq();
  }, []);

  const midPoint = Math.ceil(faqList.length / 2);
  const leftColumn = faqList.slice(0, midPoint);
  const rightColumn = faqList.slice(midPoint);

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-12">
        <h1 className="uppercase text-xl md:text-2xl xl:text-3xl font-bold text-center">Pertanyaan yang Sering Diajukan</h1>

        {isLoading ? (
          <div className="flex flex-col gap-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : faqList.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada FAQ tersedia</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="flex flex-col gap-y-3 flex-1">
              {leftColumn.map((item, index) => (
                <AccordionItem key={item.id} item={item} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
              ))}
            </div>
            <div className="flex flex-col gap-y-3 flex-1">
              {rightColumn.map((item, index) => (
                <AccordionItem key={item.id} item={item} isOpen={openIndex === index + midPoint} onClick={() => setOpenIndex(openIndex === index + midPoint ? null : index + midPoint)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
