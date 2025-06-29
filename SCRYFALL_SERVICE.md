# ScrifallService Documentation

## Overview

The `ScrifallService` is a comprehensive TypeScript SDK that implements all endpoints from the [Scryfall API](https://scryfall.com/docs/api). It provides a complete, type-safe interface for interacting with Magic: The Gathering card data.

## Features

- ✅ **Complete API Coverage**: All Scryfall API endpoints implemented
- ✅ **Type Safety**: Comprehensive TypeScript interfaces for all responses
- ✅ **Organized Types**: Context-based type organization (cards, sets, symbols, etc.)
- ✅ **Error Handling**: Consistent error handling with descriptive messages
- ✅ **Singleton Pattern**: Ready-to-use singleton instance
- ✅ **Modern Async/Await**: Promise-based API throughout

## Installation & Usage

```typescript
import { scrifallService } from './services/scryfull_service';
import { Card, CardSearchParams } from './types/cards';
```

## Quick Examples

### Search for Cards
```typescript
// Basic search
const results = await scrifallService.searchCards({ q: 'Lightning Bolt' });

// Advanced search with options
const advancedResults = await scrifallService.searchCards({
  q: 'type:instant',
  unique: 'prints',
  order: 'released',
  dir: 'desc',
  page: 1
});
```

### Get Specific Cards
```typescript
// By Scryfall ID
const card = await scrifallService.getCard('scryfall-id');

// By MTGO ID
const mtgoCard = await scrifallService.getCardByMtgoId(12345);

// By name (exact match)
const namedCard = await scrifallService.getCardByName('Lightning Bolt');

// By fuzzy name
const fuzzyCard = await scrifallService.getCardByFuzzyName('Lightnig Bolt');

// Random card
const randomCard = await scrifallService.getRandomCard();
```

### Work with Sets
```typescript
// Get all sets
const allSets = await scrifallService.getSets();

// Get specific set by code
const set = await scrifallService.getSetByCode('MID');
```

### Symbols and Mana
```typescript
// Get all symbols
const symbols = await scrifallService.getSymbols();

// Parse mana cost
const manaCost = await scrifallService.parseManaCost('{2}{U}{R}');
```

### Catalogs
```typescript
// Get various catalogs
const cardNames = await scrifallService.getCardNames();
const creatures = await scrifallService.getCreatureTypes();
const keywords = await scrifallService.getKeywordAbilities();
```

## Type System

The service uses a comprehensive type system organized by context:

### Common Types (`/types/common/`)
- `ImageUris` - Card image URLs
- `Prices` - Card pricing information
- `Legalities` - Format legality
- `List<T>` - Generic list wrapper

### Card Types (`/types/cards/`)
- `Card` - Complete card object
- `CardFace` - Double-faced card faces
- `Ruling` - Card rulings
- `CardSearchParams` - Search parameters

### Set Types (`/types/sets/`)
- `Set` - MTG set information

### Symbol Types (`/types/symbols/`)
- `CardSymbol` - Mana symbols
- `ManaCost` - Parsed mana cost

### Catalog Types (`/types/catalog/`)
- `Catalog` - Catalog responses

### Bulk Data Types (`/types/bulk/`)
- `BulkData` - Bulk data download info

## Available Endpoints

### Card Endpoints
- `searchCards()` - Search for cards
- `getCard()` - Get card by Scryfall ID
- `getCardByMtgoId()` - Get card by MTGO ID
- `getCardByMultiverseId()` - Get card by Multiverse ID
- `getCardBySetAndNumber()` - Get card by set code and collector number
- `getCardByName()` - Get card by exact name
- `getCardByFuzzyName()` - Get card by fuzzy name match
- `getRandomCard()` - Get random card
- `getCollection()` - Get cards by collection of identifiers
- `getAutocomplete()` - Get name suggestions
- `getCardRulings()` - Get card rulings (multiple variants)

### Set Endpoints
- `getSets()` - Get all sets
- `getSet()` - Get set by ID
- `getSetByCode()` - Get set by code
- `getSetByTcgPlayerId()` - Get set by TCGPlayer ID

### Symbol Endpoints
- `getSymbols()` - Get all card symbols
- `parseManaCost()` - Parse mana cost string

### Catalog Endpoints
- `getCardNames()` - All card names
- `getArtistNames()` - All artist names
- `getWordBank()` - Oracle text word bank
- `getCreatureTypes()` - All creature types
- `getPlaneswalkerTypes()` - All planeswalker types
- `getLandTypes()` - All land types
- `getArtifactTypes()` - All artifact types
- `getEnchantmentTypes()` - All enchantment types
- `getSpellTypes()` - All spell types
- `getPowers()` - All power values
- `getToughnesses()` - All toughness values
- `getLoyalties()` - All loyalty values
- `getWatermarks()` - All watermarks
- `getKeywordAbilities()` - All keyword abilities
- `getKeywordActions()` - All keyword actions
- `getAbilityWords()` - All ability words

### Bulk Data Endpoints
- `getBulkData()` - Get bulk data info
- `getBulkDataItem()` - Get specific bulk data item

## Error Handling

The service provides consistent error handling:

```typescript
try {
  const card = await scrifallService.getCard('invalid-id');
} catch (error) {
  console.error('Scryfall API Error:', error.message);
}
```

## Migration from ApiService

If migrating from the old `ApiService`:

```typescript
// Old way
const results = await apiService.searchCards('Lightning Bolt', 1);

// New way
const results = await scrifallService.searchCards({ q: 'Lightning Bolt', page: 1 });
```

## Configuration

The service is pre-configured with:
- Base URL: `https://api.scryfall.com`
- Timeout: 10 seconds
- Appropriate headers for API requests

## Testing

The service includes comprehensive tests. Run with:
```bash
yarn test ScrifallService.test.ts
```