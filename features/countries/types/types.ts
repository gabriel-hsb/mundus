export type CountryType = {
  name: string;
  topLevelDomain: string[];
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  demonym: string;
  borders: string[];
  nativeName: string;
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
