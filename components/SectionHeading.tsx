export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass} mb-12`}>
      {eyebrow ? (
        <span className="inline-block rounded-full bg-primary-100/80 px-4 py-1.5 text-xs font-extrabold tracking-wider uppercase text-primary-800 mb-3 border border-primary-200/60 shadow-2xs">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-950 tracking-tight leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-warm-900/80 text-base sm:text-lg leading-relaxed font-normal">
          {description}
        </p>
      ) : null}
    </div>
  );
}
