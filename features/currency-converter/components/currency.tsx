import React from "react";

import { useQuery } from "@tanstack/react-query";

import { CurrencyLatest } from "../types/types";
import { CURRENCY_BASE_URL } from "../api/api";

type Props = {
  currencyCode: string;
};

export default function Currency({ currencyCode }: Props) {
  const CURRENCY_KEY = process.env.NEXT_PUBLIC_CURRENCY_KEY;

  const { data, isPending, error } = useQuery<CurrencyLatest>({
    queryKey: ["currency", currencyCode],
    queryFn: () =>
      fetch(
        `${CURRENCY_BASE_URL}/latest?apikey=${CURRENCY_KEY}&currencies=${currencyCode}&base_currency=BRL`,
      ).then((res) => res.json()),
  });

  if (isPending) return "carregando moedas...";

  if (error) return "erro ao carregar fotos🙁";

  const localeCurrency = data.data[currencyCode]?.value.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: currencyCode,
    },
  );

  console.log(localeCurrency);

  if (!localeCurrency) return "Carregando valor da moeda...";

  return <div>{localeCurrency}</div>;
}
