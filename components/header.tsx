"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

import { ChevronLeft } from "lucide-react";

export default function Header() {
  const isNotHomepage = usePathname() !== "/";
  const router = useRouter();

  return (
    <header className="relative mx-auto mb-2 flex max-w-7xl items-center justify-center gap-40 px-4 py-6">
      {isNotHomepage && (
        <Button
          variant="outline"
          className="absolute left-4 w-fit max-w-fit cursor-pointer px-4"
          onClick={() => router.back()}
        >
          <ChevronLeft /> Voltar
        </Button>
      )}
      <Link
        className="text-center font-serif text-5xl tracking-wide text-gray-900"
        href={"/"}
      >
        Mundus
      </Link>
    </header>
  );
}
