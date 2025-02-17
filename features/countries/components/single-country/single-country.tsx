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

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import PicturePreview from "@/features/unsplash-api/components/picture-preview";

import { getTimeFromUTC } from "@/features/timezone/time-from-utc";

import {
  CircleDollarSign,
  Languages,
  LockIcon,
  LockOpenIcon,
  Map,
  MapPin,
  User,
  Users,
  ChevronRight,
  Euro,
  Clock,
} from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div className="grid grid-cols-2 gap-8">
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
                  label={"Idiomas"}
                  value={fetchedCountry.languages
                    .slice(0, 2)
                    .map((l) => l.name)}
                  icon={<Languages size={"20"} strokeWidth={"1.5"} />}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
              <div className="flex flex-col gap-2">
                <LabelValue
                  label={"Moeda"}
                  value={fetchedCountry.currencies[0].name}
                  icon={<CircleDollarSign size={"20"} strokeWidth={"1.5"} />}
                />
                <LabelValue
                  label={"Símbolo"}
                  value={fetchedCountry.currencies[0].symbol}
                  icon={<Euro size={"20"} strokeWidth={"1.5"} />}
                />
              </div>
              <Separator orientation="vertical" />

              <div className="flex flex-col gap-2">
                <LabelValue
                  label={"Horário"}
                  value={getTimeFromUTC(fetchedCountry.timezones[0])}
                  icon={<Clock size={"20"} strokeWidth={"1.5"} />}
                  className="font-mono font-medium"
                />
              </div>
            </div>
            <Separator />
          </div>

          <CountryBorders
            currentCountry={fetchedCountry.name}
            bordersNames={bordersNames}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">Fotos</h2>
        <PicturePreview country={fetchedCountry.name} />
        <Link href={`/pais/${country}/pictures`} className="max-w-fit">
          <Button
            variant="outline"
            className="w-fit max-w-fit cursor-pointer px-4"
          >
            <ChevronRight /> Ver todas as fotos
          </Button>
        </Link>
      </div>
    </section>
  );
}

{
  /* <CountryCurrency currencyCode={currency?.code} /> */
}
