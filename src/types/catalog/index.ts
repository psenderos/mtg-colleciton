// Catalog-related types for Scryfall API

export interface Catalog {
  object: 'catalog';
  uri: string;
  totalValues: number;
  data: string[];
}