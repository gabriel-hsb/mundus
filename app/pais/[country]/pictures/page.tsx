"use client";

import Photo from "@/features/unsplash-api/components/photo";
import { use } from "react";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Pictures({ params }: Props) {
  const { country } = use(params);

  return <Photo country={country} />;
}
