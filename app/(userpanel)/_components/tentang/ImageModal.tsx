'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Props {
  imageUrl: string;
  altText: string;
}

export default function ImageModal({ imageUrl, altText }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden rounded-lg shadow-xl h-full cursor-pointer group">
          <Image src={imageUrl} alt={altText} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2 sm:p-4">
        <Image src={imageUrl} alt={altText} width={1200} height={800} className="w-full h-auto max-h-[90vh] object-contain rounded-lg" priority />
      </DialogContent>
    </Dialog>
  );
}
