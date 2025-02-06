"use client";

import { useQueries } from "@tanstack/react-query";

import { COUNTRIES_BASE_URL } from "../api/countries";

import { CountryType } from "../types/types";

export default function useBorderCountries(codes: string[] | null) {
  const countryCodes = codes ?? [];

  const results = useQueries({
    queries: countryCodes.map((code) => ({
      queryKey: ["country", code],
      queryFn: async (): Promise<CountryType> => {
        const res = await fetch(`${COUNTRIES_BASE_URL}/alpha/${code}`);
        const data = await res.json();
        return data;
      },
    })),
  });

  if (!results || results.length < 1) return undefined;

  return results.map((country) => country.data?.name);
}
