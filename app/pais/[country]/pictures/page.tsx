import React, { use } from "react";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Pictures({ params }: Props) {
  const { country } = use(params);

  return <div>Fotos do {country}</div>;
}
