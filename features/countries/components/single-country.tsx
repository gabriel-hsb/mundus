"use client";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";
import { CountryType } from "@/features/countries/types/types";
import useBorderCountries from "@/features/countries/hooks/use-border-countries";

import CountryCurrency from "@/features/currency-converter/components/country-currency";
import CountryBorders from "@/features/countries/components/country-borders";

type Props = {
  country: string;
};

export default function SingleCountry({ country }: Props) {
  const { data, isPending, error } = useQuery<CountryType[]>({
    queryKey: ["country", country],
    queryFn: () =>
      fetch(`${COUNTRIES_BASE_URL}/name/${country}`).then((res) => res.json()),
    enabled: !!country,
    staleTime: Infinity,
  });

  const fetchedCountry = data?.[0];

  const bordersNames = useBorderCountries(fetchedCountry?.borders ?? []);

  if (isPending) return <div>carregando...</div>;

  if (error) return <div>erro 🙁</div>;

  if (!fetchedCountry) return <div>País não encontrado</div>;

  const currency = fetchedCountry?.currencies?.[0] ?? undefined;

  function longestString(strings: string[]) {
    return strings.reduce(
      (prev, cur) => (cur.length > prev.length ? cur : prev),
      "",
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-6">
      <div>
        <Image
          src={fetchedCountry.flags.svg}
          alt={`${fetchedCountry.name}'s flag`}
          width={1000}
          height={1000}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="gap flex flex-col">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {fetchedCountry.name}
            <span className="text-muted-foreground ml-2 text-2xl font-normal">
              {fetchedCountry.nativeName}
            </span>
          </h1>
          <span className="text-2xl italic">
            {longestString(fetchedCountry.altSpellings)}
          </span>
        </div>

        <div>
          <span className="font-semibold">{fetchedCountry.population}</span>{" "}
          {fetchedCountry.demonym.toLowerCase()}s
        </div>

        <CountryBorders bordersNames={bordersNames} />
        <CountryCurrency currencyCode={currency?.code} />

        <Link href={`/pais/${country}/pictures`}>Pictures</Link>
      </div>
    </section>
  );
}
