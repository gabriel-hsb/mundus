"use client";

import React from "react";

import Image from "next/image";
import { UnsplashResponse } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { UNSPLASH_BASE_URL } from "../api/api";

type Props = {
  country: string;
};

export default function Photo({ country }: Props) {
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  const { data, isPending, error } = useQuery<UnsplashResponse>({
    queryKey: ["picture"],
    queryFn: () =>
      fetch(
        `${UNSPLASH_BASE_URL}/search/photos?page=1&query=${country}&client_id=${UNSPLASH_ACCESS_KEY}`,
      ).then((res) => res.json()),
  });

  if (isPending) return "carregando fotos...";

  if (error) return "erro ao carregar fotos🙁";

  return (
    <div className="flex max-w-[100vw] flex-wrap items-center">
      {data.results.map((photo) => (
        <Image
          key={photo.id}
          src={photo.urls.regular}
          alt={photo.slug}
          height={photo.height}
          width={photo.width}
          loading="lazy"
        />
      ))}
    </div>
  );
}
