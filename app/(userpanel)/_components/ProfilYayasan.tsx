export default function ProfilYayasan() {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="uppercase text-xl md:text-2xl xl:text-3xl font-bold">Profil Yayasan</h1>
          <span className="w-32 md:w-64 h-1.5 bg-primaryYellow-600" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-14 xl:gap-x-24">
          <img src="/profile-yayasan.jpg" alt="Profile Yayasan" className="w-full md:w-[22rem] lg:w-[23rem] xl:w-[32rem] rounded-3xl object-cover" loading="lazy" />
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold uppercase text-center md:text-start">Yayasan Pendidikan Harapan Medan</h2>
            <p className="text-sm md:text-base xl:text-lg text-justify leading-relaxed">
              Yayasan Pendidikan Harapan adalah sebuah Lembaga yang bergerak dalam bidang pendidikan yang menaungi unit TK, SD (Sekolah Dasar), SMP (Sekolah Menengah Pertama), SMA (Sekolah Menengah Atas), dan Perguruan Tinggi. Yayasan ini
              didirikan oleh Bapak Kol. Radja Sjahnan, Bapak Letkol Arifin Pulungan, Bapak Djafar Harahap, Bapak Mayor Arifin Djonanin Harahap, Bapak T.M Hanafiah, Bapak Drs. Sjurkani, Bapak Kol. Abdul Muluk Lubis, Bapak Sjaiful Tandjung.
              BA, Bapak Maradomsjah Siregar, Bapak Letkol Wahid Lubis dan Bapak Rusli Idrus. Yayasan Pendidikan Harapan diresmikan dengan meletakkan batu prasasti peresmian oleh Pangkoanda Sumatera yaitu Bapak Letjen A.J Mokoginta selaku
              Pelindung Yayasan pendidikan Harapan pada 04 Februari 1967.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
