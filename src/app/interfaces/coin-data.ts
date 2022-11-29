export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  description: Description;
  image: Image;
  market_cap_rank: number;
  tickers: Ticker[];
}

export interface Description {
  en: string;
}
export interface Image {
  thumb?: string;
  small?: string;
}
export interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLast;
  converted_volume: ConvertedVolume;
}

export interface Market {
  name: string;
  identifier?: string;
  has_trading_incentive?: boolean;
}

export interface ConvertedLast {
  btc?: number;
  eth?: number;
  usd: number;
}

export interface ConvertedVolume {
  btc?: number;
  eth?: number;
  usd: number;
}
