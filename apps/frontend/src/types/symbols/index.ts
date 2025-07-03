// Symbol-related types for Scryfall API

import { List } from '../common';

export interface CardSymbol {
  object: 'card_symbol';
  symbol: string;
  svgUri?: string;
  looseVariant?: string;
  english: string;
  transposable: boolean;
  representsMana: boolean;
  appearsInManaCosts: boolean;
  cmc?: number;
  funny: boolean;
  colors: string[];
  gathererAlternates?: string[];
}

export interface ManaCost {
  object: 'mana_cost';
  cost: string;
  cmc: number;
  colors: string[];
  colorless: boolean;
  monocolored: boolean;
  multicolored: boolean;
}

// List types
export type CardSymbolList = List<CardSymbol>;