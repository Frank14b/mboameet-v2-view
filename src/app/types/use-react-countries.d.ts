declare module "use-react-countries" {
  export function useCountries(): {
    countries: {
      name: string;
      capital: string;
      currencies: [
        {
          name: string;
          symbol: string;
        }
      ];
      languages: [string];
      coordinates: [number, number];
      area: number;
      maps: {
        googleMaps: string;
        openStreetMaps: string;
      };
      population: number;
      postalCode: {
        format: any;
        regex: string;
      };
      flags: {
        png: string;
        svg: string;
      };
      emoji: string;
      countryCallingCode: string;
    }[];
    setCountries: any;
  } {}
}
