export interface Coin {
  id: string;
  symbol: string;
  name: string;
  hashing_algorithm: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
  };
  genesis_date: string;
  market_data: {
    market_cap: {
      eur: number;
    };
  };
}
