"use client";

import { use } from "react";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";
import { CountryType } from "@/features/countries/types/types";
import Link from "next/link";
import Currency from "@/features/currency-converter/components/currency";

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

  if (!data || data.length < 1) return;

  const fetchedCountry: CountryType = data[0];

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  return (
    <div>
      <div>País acessado: {fetchedCountry.name}</div>
      <div>País acessado: {fetchedCountry.currencies[0].code}</div>
      <Currency currencyCode={fetchedCountry.currencies[0].code} />
      <div>
        <Image
          src={fetchedCountry.flags.svg}
          alt={`${fetchedCountry.name}'s flag`}
          width={1000}
          height={1000}
        />
      </div>
      <Link href={`/pais/${country}/pictures`}>Pictures</Link>
    </div>
  );
}
