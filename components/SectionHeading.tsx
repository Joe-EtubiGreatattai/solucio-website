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
    <div className={`max-w-2xl ${alignClass} mb-10`}>
      {eyebrow ? (
        <span className="inline-block rounded-full bg-accent-50 px-4 py-1 text-sm font-semibold text-accent-700 mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-bold text-primary-900">{title}</h2>
      {description ? (
        <p className="mt-4 text-warm-900/70 text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
