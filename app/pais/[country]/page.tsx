"use client";

import { use } from "react";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";
import { CountryType } from "@/features/countries/types/types";
import BorderCountry from "@/features/countries/components/border-country";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Country({ params }: Props) {
  const { country } = use(params);

  const { data, isPending, error } = useQuery<CountryType[]>({
    queryKey: ["country"],
    queryFn: () =>
      fetch(`${COUNTRIES_BASE_URL}/name/${country}`).then((res) => res.json()),
  });

  console.log(data);

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  const fetchedCountry: CountryType = data[0];

  return (
    <div>
      <div>País acessado: {fetchedCountry.name}</div>
      <div>
        <Image
          src={fetchedCountry.flags.svg}
          alt={`${fetchedCountry.name}'s flag`}
          width={1000}
          height={1000}
        />
        {/* TODO: map over border countries here, or inside <BorderCountry /> component? */}
        <BorderCountry CountryCodes={fetchedCountry.borders} />
      </div>
    </div>
  );
}
