"use client";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

import { Country } from "@/apis/countries/types";
import { COUNTRIES_BASE_URL } from "@/apis/countries/countries";

export default function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetch(`${COUNTRIES_BASE_URL}/all`).then((res) => res.json()),
  });

  console.log(data);

  if (isPending) return "carregando...";

  if (error) return "erro 🙁";

  return (
    <div className="text-lg grid grid-cols-4 gap-y-8">
      {data.map((country: Country) => (
        <div key={country.name}>
          <div className="flex flex-col rounded-lg h-72 overflow-hidden w-60 border-blue-500 border">
            <Image
              alt={`${country.name}'s flag`}
              src={country.flags.svg}
              width={1000}
              height={1000}
            />
            <div>Nome: {country.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
