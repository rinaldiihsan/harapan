'use client';

import { useState } from 'react';
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
          <img src={imageUrl} alt={altText} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2 sm:p-4">
        <img src={imageUrl} alt={altText} className="w-full h-auto max-h-[90vh] object-contain rounded-lg" loading="lazy" />
      </DialogContent>
    </Dialog>
  );
}
