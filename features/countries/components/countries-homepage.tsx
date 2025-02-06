"use client";

import { useQuery } from "@tanstack/react-query";

import { CountryType } from "@/features/countries/types/types";
import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";

import CountryCard from "./country-card";

export default function CountriesHomepage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch(`${COUNTRIES_BASE_URL}/all`).then((res) => res.json()),
    staleTime: Infinity,
  });

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-8 px-4 py-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
      {data.map((country: CountryType) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </section>
  );
}
