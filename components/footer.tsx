import React from "react";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-6 text-center">
      <div className="flex items-center justify-center">
        Projeto desenvolvido por
        <a
          className="ml-1.5 flex items-center font-mono underline-offset-2 hover:underline"
          href="https://github.com/gabriel-hsb"
        >
          gabriel-hsb
          <Image
            className="ml-2"
            alt="Ícone do GitHub"
            src="/github.svg"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
}
