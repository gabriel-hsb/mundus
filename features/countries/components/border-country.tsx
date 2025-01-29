import { Badge } from "@/components/ui/badge";
import { COUNTRIES_BASE_URL } from "../api/countries";
import { useQueries } from "@tanstack/react-query";
import { CountryType } from "../types/types";

type Props = {
  CountryCodes: string[];
};

export default function BorderCountry({ CountryCodes }: Props) {
  console.log(CountryCodes);

  const foo: CountryType[] = useQueries({
    queries: CountryCodes.map((code) => ({
      queryKey: ["country", code],
      queryFn: () =>
        fetch(`${COUNTRIES_BASE_URL}/alpha/${code}`).then((res) => res.json()),
    })),
  });

  console.log(foo);

  foo.map((country) => {
    return (
      <Badge key={country.name} variant={"outline"}>
        {" "}
        {country.name}{" "}
      </Badge>
    );
  });

  // <Badge variant={"outline"}> CountryCode </Badge>;
}
