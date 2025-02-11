import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  bordersNames: (string | undefined)[] | undefined;
  currentCountry: string;
};

export default function CountryBorders({
  bordersNames,
  currentCountry,
}: Props) {
  if (!bordersNames)
    return (
      <p className="text-muted-foreground text-base font-normal">
        Este país não faz fronteira com outros países.
      </p>
    );

  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground text-sm font-normal">
        {currentCountry} faz fronteira com:{" "}
      </span>
      <ul className="flex flex-row flex-wrap gap-1">
        {bordersNames.map((border, idx) => (
          <Link key={idx} href={`/pais/${border?.toLowerCase()}`}>
            <li>
              <Badge
                variant={"outline"}
                className="hover:bg-primary hover:text-primary-foreground transition duration-100"
              >
                {border}
              </Badge>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
