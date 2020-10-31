export interface Item {
  name: string;
  type: 'colour' | 'pattern' | 'face' | 'upper' | 'lower' | 'emote' | 'celebration' | 'banner' | 'nickname';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface ShopItem extends Item {
  cost: number;
  currency: 'crowns' | 'kudos';
}
