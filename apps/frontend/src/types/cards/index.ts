// Card-related types for Scryfall API

import { ImageUris, Prices, Legalities, RelatedUris, PurchaseUris, List } from '../common';

export interface CardFace {
  object: 'card_face';
  name: string;
  manaCost?: string;
  typeLine: string;
  oracleText?: string;
  colors?: string[];
  power?: string;
  toughness?: string;
  flavorText?: string;
  artist?: string;
  artistId?: string;
  illustrationId?: string;
  imageUris?: ImageUris;
  colorIndicator?: string[];
  loyalty?: string;
  printedName?: string;
  printedTypeLine?: string;
  printedText?: string;
  watermark?: string;
}

export interface CardPreview {
  previewedAt: string;
  sourceUri: string;
  source: string;
}

export interface Card {
  // Core fields
  object: 'card';
  id: string;
  oracleId: string;
  multiverseIds: number[];
  mtgoId?: number;
  mtgoFoilId?: number;
  tcgplayerId?: number;
  cardmarketId?: number;
  name: string;
  lang: string;
  releasedAt: string;
  uri: string;
  scryfallUri: string;
  layout: string;
  highresImage: boolean;
  imageStatus: string;
  imageUris?: ImageUris;
  manaCost?: string;
  cmc: number;
  typeLine: string;
  oracleText?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
  lifeModifier?: string;
  handModifier?: string;
  colors: string[];
  colorIndicator?: string[];
  colorIdentity: string[];
  keywords: string[];
  producedMana?: string[];
  allParts?: RelatedCard[];
  cardFaces?: CardFace[];
  legalities: Legalities;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  setId: string;
  set: string;
  setName: string;
  setType: string;
  setUri: string;
  setSearchUri: string;
  scryfallSetUri: string;
  rulingsUri: string;
  printsSearchUri: string;
  collectorNumber: string;
  digital: boolean;
  rarity: string;
  cardBackId?: string;
  artist?: string;
  artistIds?: string[];
  illustrationId?: string;
  borderColor: string;
  frame: string;
  frameEffects?: string[];
  fullArt: boolean;
  textless: boolean;
  booster: boolean;
  storySpotlight: boolean;
  edhrecRank?: number;
  pennyRank?: number;
  prices: Prices;
  relatedUris: RelatedUris;
  purchaseUris: PurchaseUris;
  
  // Additional optional fields
  flavorText?: string;
  flavorName?: string;
  watermark?: string;
  preview?: CardPreview;
  printedName?: string;
  printedTypeLine?: string;
  printedText?: string;
  promoTypes?: string[];
  securityStamp?: string;
  variations?: string[];
  attraction_lights?: number[];
}

export interface RelatedCard {
  object: 'related_card';
  id: string;
  component: string;
  name: string;
  typeLine: string;
  uri: string;
}

export interface Ruling {
  object: 'ruling';
  oracleId: string;
  source: string;
  publishedAt: string;
  comment: string;
}

// List types
export type CardList = List<Card>;
export type RulingList = List<Ruling>;

// Search parameters interface
export interface CardSearchParams {
  q: string;
  unique?: 'cards' | 'art' | 'prints';
  order?: 'name' | 'set' | 'released' | 'rarity' | 'color' | 'usd' | 'tix' | 'eur' | 'cmc' | 'power' | 'toughness' | 'edhrec' | 'penny' | 'artist' | 'review';
  dir?: 'auto' | 'asc' | 'desc';
  includeExtras?: boolean;
  includeMultilingual?: boolean;
  includeVariations?: boolean;
  page?: number;
  format?: 'json' | 'csv';
  pretty?: boolean;
}

export interface Autocomplete {
  object: 'catalog';
  uri: string;
  totalValues: number;
  data: string[];
}