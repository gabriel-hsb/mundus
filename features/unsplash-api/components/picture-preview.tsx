import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { UnsplashResponse } from "../types/types";
import { UNSPLASH_BASE_URL } from "../api/api";

type Props = {
  country: string;
};

export default function PicturePreview({ country }: Props) {
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  const { data, isPending, error } = useQuery<UnsplashResponse>({
    queryKey: ["picture"],
    queryFn: () =>
      fetch(
        `${UNSPLASH_BASE_URL}/search/photos?page=1&query=${country}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      ).then((res) => res.json()),
  });

  if (isPending) return "carregando foto...";

  if (error) return "erro ao carregar foto🙁";

  const photos = data.results.slice(0, 2);

  return (
    <div className="flex flex-row items-center justify-between gap-8">
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.urls.full}
          alt={photo.slug}
          height={photo.height}
          width={photo.width}
          loading="lazy"
          className="max-w-[600px] rounded-md"
        />
      ))}
    </div>
  );
}
