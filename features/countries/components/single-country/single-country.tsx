"use client";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { COUNTRIES_BASE_URL } from "@/features/countries/api/countries";
import { CountryType } from "@/features/countries/types/types";
import useBorderCountries from "@/features/countries/hooks/use-border-countries";

// import CountryCurrency from "@/features/currency-converter/components/country-currency";
import CountryBorders from "@/features/countries/components/country-borders";
import LabelValue from "./label-value";

import {
  CircleDollarSign,
  Languages,
  LockIcon,
  LockOpenIcon,
  Map,
  MapPin,
  User,
  Users,
  Globe,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

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

  // const currency = fetchedCountry?.currencies?.[0] ?? undefined;

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
        <div className="flex flex-col gap-1">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {fetchedCountry.name}
          </h1>
          <span className="text-muted-foreground text-2xl font-normal">
            {fetchedCountry.nativeName}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
            <div className="flex flex-col gap-2">
              <LabelValue
                label={"Região"}
                value={fetchedCountry.subregion}
                icon={<Map size={"20"} strokeWidth={"1.5"} />}
              />

              <LabelValue
                label={"Capital"}
                value={fetchedCountry.capital}
                icon={<MapPin size={"20"} strokeWidth={"1.5"} />}
              />

              <LabelValue
                label={"Independente"}
                value={fetchedCountry.independent ? "Sim" : "Não"}
                icon={
                  fetchedCountry.independent ? (
                    <LockOpenIcon
                      size={"20"}
                      strokeWidth={"1.5"}
                      className="text-green-600"
                    />
                  ) : (
                    <LockIcon
                      size={"20"}
                      strokeWidth={"1.5"}
                      className="text-red-600"
                    />
                  )
                }
              />
            </div>

            <Separator orientation="vertical" />

            <div className="flex flex-col gap-2">
              <LabelValue
                label={"População"}
                value={fetchedCountry.population.toLocaleString()}
                icon={<Users size={"20"} strokeWidth={"1.5"} />}
              />
              <LabelValue
                label={"Gentílico"}
                value={fetchedCountry.demonym}
                icon={<User size={"20"} strokeWidth={"1.5"} />}
              />
              <LabelValue
                label={"Línguas"}
                value={fetchedCountry.languages.map((l) => l.name)}
                icon={<Languages size={"20"} strokeWidth={"1.5"} />}
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <LabelValue
              label={"Moeda"}
              value={fetchedCountry.currencies[0].name}
              icon={<CircleDollarSign size={"20"} strokeWidth={"1.5"} />}
            />
            <LabelValue
              label={"Símbolo"}
              value={fetchedCountry.currencies[0].symbol}
              icon={<Globe size={"20"} strokeWidth={"1.5"} />}
            />
          </div>
          <Separator />
        </div>

        <CountryBorders
          currentCountry={fetchedCountry.name}
          bordersNames={bordersNames}
        />
        <Link href={`/pais/${country}/pictures`}>Pictures</Link>
      </div>
    </section>
  );
}

{
  /* <CountryCurrency currencyCode={currency?.code} /> */
}
