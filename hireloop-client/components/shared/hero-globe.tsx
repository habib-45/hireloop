export function HeroGlobe() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
    >
      <div className="relative size-[820px] sm:size-[1040px] lg:size-[1240px]">
        {/* Atmospheric bloom behind the planet */}
        <div className="absolute inset-[4%] rounded-full bg-[#5f4dff]/25 blur-[110px] sm:blur-[150px]" />
        <div className="absolute inset-[24%] rounded-full bg-[#7c5cff]/20 blur-[80px]" />

        {/* Planet */}
        <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_120px_20px_rgba(92,83,254,0.2)]">
          <div className="absolute inset-0 bg-[url('/earth-sphere.jpg')] bg-cover bg-center bg-no-repeat [filter:brightness(0.44)_saturate(0.65)_contrast(1.12)]" />

          {/* Tint the earth with the brand's deep violet palette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_30%,rgba(136,119,255,0.64)_0%,rgba(84,60,220,0.56)_38%,rgba(25,16,84,0.78)_68%,rgba(5,5,8,0.96)_100%)] mix-blend-color" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_8%,rgba(124,108,255,0.34)_0%,rgba(92,83,254,0.12)_35%,transparent_62%)] mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,52,0)_0%,rgba(10,8,34,0.26)_45%,rgba(6,6,14,0.76)_72%,#050506_92%)]" />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_110px_35px_rgba(4,4,9,0.8),inset_0_-100px_140px_rgba(4,4,9,0.94),inset_0_45px_120px_rgba(139,124,255,0.2)]" />

          {/* Subtle cloud texture highlight */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_52%_28%,rgba(200,196,255,0.09)_0%,transparent_48%)] mix-blend-screen" />
        </div>

        {/* Rim light */}
        <div className="absolute inset-0 rounded-full border border-[#8a7cff]/10 shadow-[0_0_60px_rgba(124,108,255,0.18)]" />
      </div>
    </div>
  )
}
