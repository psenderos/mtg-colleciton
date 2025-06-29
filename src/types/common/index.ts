// Common types used across multiple Scryfall API contexts

export interface Color {
  symbol: string;
  name: string;
}

export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png?: string;
  artCrop?: string;
  borderCrop?: string;
}

export interface Prices {
  usd?: string;
  usdFoil?: string;
  usdEtched?: string;
  eur?: string;
  eurFoil?: string;
  tix?: string;
}

export interface RelatedUris {
  gatherer?: string;
  tcgplayerInfiniteArticles?: string;
  tcgplayerInfiniteDecks?: string;
  edhrec?: string;
}

export interface PurchaseUris {
  tcgplayer?: string;
  cardmarket?: string;
  cardhoarder?: string;
}

export interface Legalities {
  standard?: string;
  future?: string;
  historic?: string;
  gladiator?: string;
  pioneer?: string;
  explorer?: string;
  modern?: string;
  legacy?: string;
  pauper?: string;
  vintage?: string;
  penny?: string;
  commander?: string;
  oathbreaker?: string;
  brawl?: string;
  historicbrawl?: string;
  alchemy?: string;
  paupercommander?: string;
  duel?: string;
  oldschool?: string;
  premodern?: string;
  predh?: string;
}

export interface Error {
  object: 'error';
  code: string;
  status: number;
  warnings?: string[];
  details: string;
}

export interface List<T> {
  object: 'list';
  data: T[];
  hasMore: boolean;
  nextPage?: string;
  totalCards?: number;
  warnings?: string[];
}