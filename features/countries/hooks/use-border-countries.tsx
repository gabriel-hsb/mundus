import { COUNTRIES_BASE_URL } from "../api/countries";
import { useQueries } from "@tanstack/react-query";
import { CountryType } from "../types/types";

export default function useBorderCountries(countryCodes: string[]) {
  console.log(countryCodes);

  const foo: CountryType[] = useQueries({
    queries: countryCodes.map((code) => ({
      queryKey: ["country", code],
      queryFn: () =>
        fetch(`${COUNTRIES_BASE_URL}/alpha/${code}`).then((res) => res.json()),
    })),
  });

  console.log(foo);

  return { foo };

  // TODO: create function to fetch all country borders using country CODE
}
