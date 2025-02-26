type Props = {
  label: string;
  value: string | string[];
  icon?: React.ReactNode;
  className?: string;
};

export default function LabelValue({ label, value, icon, className }: Props) {
  const formatter = new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction",
  });

  const values = typeof value === "string" ? value : formatter.format(value);

  return (
    <div className="flex items-center whitespace-nowrap">
      {icon}
      <span className="ml-1.5 font-semibold">
        <span className="text-muted-foreground text-sm font-normal capitalize">
          {label}:{" "}
        </span>
        <span className={className}>{values}</span>
      </span>
    </div>
  );
}
