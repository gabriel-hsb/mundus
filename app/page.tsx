"use client";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";

import { CountryType } from "@/features/countries/types/types";
import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";

export default function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch(`${COUNTRIES_BASE_URL}/all`).then((res) => res.json()),
    staleTime: Infinity,
  });

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  return (
    <div className="grid grid-cols-4 gap-x-16 gap-y-8 text-lg">
      {data.map((country: CountryType) => (
        <Link key={country.name} href={`/pais/${country.name.toLowerCase()}`}>
          <div className="flex min-h-72 max-w-64 flex-col overflow-hidden rounded-lg border-2 border-blue-500 transition-all hover:shadow-lg">
            <Image
              alt={`${country.name}'s flag`}
              src={country.flags.svg}
              width={1000}
              height={1000}
            />
            <div className="px-2 py-3">
              <div>Nome: {country.name}</div>
              <div>População: {country.population.toLocaleString("pt-BR")}</div>
              <div>Região: {country.region}</div>
              <div>Capital: {country.capital}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
