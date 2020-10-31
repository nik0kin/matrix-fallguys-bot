import { ShopItem } from './fall-guys';

export interface DBItem extends ShopItem {
  link: string;
}

export interface FallGuysFauxDatabaseResponse {
  shopFeaturedItems: [DBItem, DBItem, DBItem];
}
