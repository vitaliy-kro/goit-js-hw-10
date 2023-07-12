export interface Country {
  capital: [string];
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  languages: {
    [key: string]: string;
  };
  name: {
    common: string;
    nativeName: {};
    official: string;
  };
  population: number;
}
