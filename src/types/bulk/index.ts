// Bulk data-related types for Scryfall API

import { List } from '../common';

export interface BulkData {
  object: 'bulk_data';
  id: string;
  type: string;
  updatedAt: string;
  uri: string;
  name: string;
  description: string;
  size: number;
  downloadUri: string;
  contentType: string;
  contentEncoding: string;
}

// List types
export type BulkDataList = List<BulkData>;