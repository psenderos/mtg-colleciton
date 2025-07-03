// Set-related types for Scryfall API

import { List } from '../common';

export interface Set {
  object: 'set';
  id: string;
  code: string;
  mtgoCode?: string;
  arenaCode?: string;
  tcgplayerId?: number;
  name: string;
  setType: string;
  releasedAt?: string;
  blockCode?: string;
  block?: string;
  parentSetCode?: string;
  cardCount: number;
  printedSize?: number;
  digital: boolean;
  foilOnly: boolean;
  nonfoilOnly: boolean;
  scryfallUri: string;
  uri: string;
  iconSvgUri: string;
  searchUri: string;
}

// List types
export type SetList = List<Set>;