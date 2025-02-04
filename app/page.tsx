"use client";

import { useQuery } from "@tanstack/react-query";

import { CountryType } from "@/features/countries/types/types";
import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";

import CountryCard from "@/features/countries/components/country-card";

export default function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch(`${COUNTRIES_BASE_URL}/all`).then((res) => res.json()),
    staleTime: Infinity,
  });

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  return (
    <div className="grid grid-cols-4 gap-x-16 gap-y-8">
      {data.map((country: CountryType) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </div>
  );
}
