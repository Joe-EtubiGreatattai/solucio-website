const maxWidthClasses = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
} as const;

export default function Container({
  children,
  className = "",
  maxWidth = "6xl",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: keyof typeof maxWidthClasses;
}) {
  return (
    <div
      className={`mx-auto w-full ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
