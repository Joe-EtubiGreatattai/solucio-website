/** Renders a schema.org JSON-LD block. Server component; safe to place anywhere in the tree. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is data, not markup; this is the documented way to add JSON-LD in Next.js.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
