"use client";

import { use } from "react";

import MasonryGrid from "@/features/unsplash-api/components/masonry-grid";

import usePhotos from "@/features/unsplash-api/hooks/usePhotos";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default function Pictures({ params }: Props) {
  const { country } = use(params);

  const { photos, isPending, error } = usePhotos(country);

  if (!photos || !photos.results) return "erro";

  if (isPending) return "carregando...";

  if (error) return "erro...";

  if (typeof photos !== "boolean")
    return (
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <MasonryGrid photos={photos.results} />
      </section>
    );
}
