import React from 'react';
import Image from 'next/image';

export const TikTokIcon = ({ size = 24, color = '#047038' }) => <Image src="/tiktok-svgrepo-com.svg" alt="TikTok Icon" width={size} height={size} style={{ color }} />;
