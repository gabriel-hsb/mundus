"use client";

import { UnsplashResponse } from "../types/types";

import { useQuery } from "@tanstack/react-query";

import { UNSPLASH_BASE_URL } from "../api/api";

export default function usePhotos(countryName: string) {
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  const {
    data: photos,
    isPending,
    error,
  } = useQuery<UnsplashResponse>({
    queryKey: ["picture"],
    queryFn: () =>
      fetch(
        `${UNSPLASH_BASE_URL}/search/photos?page=1&query=${countryName}&client_id=${UNSPLASH_ACCESS_KEY}`,
      ).then((res) => res.json()),
  });

  return { photos, isPending, error };
}
