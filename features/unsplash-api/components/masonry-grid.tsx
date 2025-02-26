import React from "react";

import Image from "next/image";
import { UnsplashPhoto } from "../types/types";

type Props = {
  photos: UnsplashPhoto[];
};

export default function MasonryGrid({ photos }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {photos.slice(0, 9).map((photo) => (
        <Image
          key={photo.id}
          src={photo.urls.regular}
          alt={photo.slug}
          height={photo.height}
          width={photo.width}
          loading="lazy"
          className="h-full w-full rounded-md object-cover"
          placeholder="blur"
          blurDataURL={photo.urls.thumb}
        />
      ))}
    </div>
  );
}
