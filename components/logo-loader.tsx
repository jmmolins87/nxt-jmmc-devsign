import Image from "next/image";

export function LogoLoader() {
  return (
    <div className="loader-stage relative flex items-center justify-center">
      <div className="logo-aura logo-aura-light absolute inset-0 m-auto">
        <Image
          src="/logos/logo/jmmc_logo_blanco.svg"
          alt=""
          width={420}
          height={420}
          aria-hidden
          className="aura-img h-auto w-[20rem] sm:w-[24rem]"
        />
      </div>

      <div
        aria-hidden
        className="logo-outline-scan logo-outline-scan-light absolute inset-0 m-auto"
      />

      <div className="logo-cinematic relative z-10">
        <span className="logo-sweep" aria-hidden />
        <Image
          src="/logos/logo/jmmc_logo_blanco.svg"
          alt="JMMC logo"
          width={420}
          height={420}
          priority
          className="block h-auto w-[20rem] sm:w-[24rem]"
        />
      </div>
    </div>
  );
}
