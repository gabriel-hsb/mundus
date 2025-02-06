type Props = {
  bordersNames: (string | undefined)[] | undefined;
};

export default function CountryBorders({ bordersNames }: Props) {
  if (!bordersNames)
    return <div>Este país não faz divisa com outros países</div>;

  return (
    <ul>
      {bordersNames.map((border, idx) => (
        <li key={idx}>{border}</li>
      ))}
      <li></li>
    </ul>
  );
}
