'use client';

import { programUnggulan } from '@/utils/program-unggulan';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ScrollProgram() {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 text-center">
          <span className="hidden md:block md:w-56 h-1.5 bg-primaryYellow-600" />
          <h1 className="uppercase text-xl md:text-2xl xl:text-3xl font-bold">Program Unggulan Yaspendhar</h1>
          <span className="hidden md:block md:w-56 h-1.5 bg-primaryYellow-600" />
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {programUnggulan.map((program) => (
              <CarouselItem key={program.name} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <figure className="flex flex-col gap-y-3">
                  <img src={program.photo} alt={program.name} className="w-full aspect-square object-cover object-center rounded-xl" draggable={false} />
                  <figcaption className="uppercase font-medium text-center text-lg md:text-base">{program.name}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-primaryGreen-700 text-primaryGreen-700 hover:bg-primaryGreen-100" />
          <CarouselNext className="border-primaryGreen-700 text-primaryGreen-700 hover:bg-primaryGreen-100" />
        </Carousel>
      </div>
    </section>
  );
}
