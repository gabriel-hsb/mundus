import Link from "next/link";
import Image from "next/image";

import { CountryType } from "@/features/countries/types/types";

type Props = {
  country: CountryType;
};

export default function CountryCard({ country }: Props) {
  return (
    <Link key={country.name} href={`/pais/${country.name.toLowerCase()}`}>
      <Image
        alt={`${country.name}'s flag`}
        src={country.flags.svg}
        width={1000}
        height={1000}
      />
      <div className="px-2 py-3">
        <div className="text-3xl">
          Nome: <span className="text-red-500">{country.name}</span>
        </div>
        <div>
          População:
          {country.population.toLocaleString("pt-BR")}
        </div>
        <div>Região: {country.region}</div>
        <div>Capital: {country.capital}</div>
      </div>
    </Link>
  );
}
