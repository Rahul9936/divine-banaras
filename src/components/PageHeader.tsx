import Image from "next/image";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  imageSrc,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
}) {
  return (
    <section className={`relative overflow-hidden text-cream`}>
      {imageSrc ? (
        <div className="absolute inset-0">
          <Image src={imageSrc} alt="Header background" fill className="object-cover" />
          <div className="absolute inset-0" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-ghat-gradient" aria-hidden="true" />
      )}

      <div className="absolute inset-0 opacity-10 text-white" aria-hidden="true" />
      <div className="container-page relative py-16 text-center sm:py-20">
        <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-5 border border-white/20 shadow-2xl">
          {eyebrow && <p className="eyebrow text-saffron-light p-4"><strong className="bg-ink/70 rounded-lg p-2">{eyebrow}</strong></p>}
          <h1 className="mt-3 font-display text-4xl font-700 sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-cream/85">{subtitle}</p>
          )}
        </div>
        
      </div>
    </section>
  );
}
