export type Country = {
  name: string;
  topLevelDomain: string[];
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  borders: string[];
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languagues: {
    name: string;
    nativeName: string;
  }[];
  independent: boolean;
};
