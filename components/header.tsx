import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-center gap-40 space-y-4">
      <div className="font-serif text-5xl tracking-wide text-gray-900">
        <Link href={"/"}>Mundus</Link>
      </div>
      HEADER!
    </div>
  );
}
