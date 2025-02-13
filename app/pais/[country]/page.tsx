import { use } from "react";

import SingleCountry from "@/features/countries/components/single-country/single-country";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Country({ params }: Props) {
  const { country } = use(params);

  return <SingleCountry country={country} />;
}
