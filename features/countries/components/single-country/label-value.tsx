import React from "react";

type Props = {
  label: string;
  value: string | string[];
  icon?: React.ReactNode;
};

export default function LabelValue({ label, value, icon }: Props) {
  let langs;

  if (typeof value !== "string" && Array.isArray(value)) {
    langs = value.map((l, i) => {
      if (!(i === value.length - 1)) return `${l}, `;

      return l;
    });
  }

  return (
    <div className="flex items-center whitespace-nowrap">
      {icon}
      <span className="ml-1.5 font-semibold">
        <span className="text-muted-foreground text-sm font-normal capitalize">
          {label}:{" "}
        </span>
        {langs ?? value}
      </span>
    </div>
  );
}
