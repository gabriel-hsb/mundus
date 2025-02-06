import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  bordersNames: (string | undefined)[] | undefined;
};

export default function CountryBorders({ bordersNames }: Props) {
  if (!bordersNames)
    return <div>Este país não faz divisa com outros países</div>;

  return (
    <div>
      <ul className="flex flex-row flex-wrap gap-1">
        {bordersNames.map((border, idx) => (
          <Link key={idx} href={`/pais/${border?.toLowerCase()}`}>
            <li>
              <Badge
                variant={"outline"}
                className="hover:bg-primary hover:text-primary-foreground transition duration-100 visited:bg-red-200"
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
