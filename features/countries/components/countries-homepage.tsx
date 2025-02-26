"use client";

import { useQuery } from "@tanstack/react-query";

import { CountryType } from "@/features/countries/types/types";
import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";

import CountryCard from "./country-card";
import CountryCardSkeleton from "./country-card-skeleton";

export default function CountriesHomepage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch(`${COUNTRIES_BASE_URL}/all`).then((res) => res.json()),
    staleTime: Infinity,
  });

  if (isPending) {
    return (
      <section className="mx-auto grid min-h-dvh max-w-7xl grid-cols-1 gap-x-16 gap-y-8 px-4 pb-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <CountryCardSkeleton key={idx} />
        ))}
      </section>
    );
  }

  if (error) return "erro 🙁";

  return (
    <section className="mx-auto grid min-h-dvh max-w-7xl grid-cols-1 gap-x-16 gap-y-8 px-4 pb-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
      {data.map((country: CountryType) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </section>
  );
}
