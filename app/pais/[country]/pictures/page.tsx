"use client";

import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Pictures({ params }: Props) {
  const { country } = use(params);
  const ACESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  const { data, isPending, error } = useQuery({
    queryKey: ["picture"],
    queryFn: () =>
      fetch(
        `https://api.unsplash.com/photos/random?client_id=${"y5mmI0oPekk_1GuhidYiTxUQYlcHFUD17t6i2U-2N28"}`,
      ).then((res) => res.json()),
  });

  console.log(data);
  console.log(ACESS_KEY);

  return (
    <div>
      Fotos do {ACESS_KEY} {country}
    </div>
  );
}
