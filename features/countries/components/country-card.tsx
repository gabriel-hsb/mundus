import Link from "next/link";
import Image from "next/image";

import { CountryType } from "@/features/countries/types/types";

type Props = {
  country: CountryType;
};

export default function CountryCard({ country }: Props) {
  return (
    <Link key={country.name} href={`/pais/${country.name.toLowerCase()}`}>
      <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-md shadow-sm transition-all hover:shadow-lg focus:shadow-lg">
        <div className="h-[10rem] w-full overflow-hidden">
          <Image
            alt={`${country.name}'s flag`}
            src={country.flags.svg}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 px-4 py-4">
          <div>
            <span className="text-xl font-semibold">{country.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Região:</span>{" "}
            {country.region}
          </div>
          <div>
            <span className="text-muted-foreground text-sm">População: </span>
            {country.population.toLocaleString("pt-BR")}
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Capital:</span>{" "}
            {country.capital}
          </div>
        </div>
      </div>
    </Link>
  );
}
