export interface Item {
  name: string;
  type: string;
  rarity: string;
  topOrBottom?: 'top' | 'bottom';
}

export interface ShopItem extends Item {
  cost: number;
  currency: 'crowns' | 'kudos';
}
