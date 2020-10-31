import cheerio from 'cheerio';
import fetch from 'node-fetch';

import { DBItem, FallGuysFauxDatabaseResponse } from '../db-types';
import { ShopItem } from '../fall-guys';

const baseUrl = 'https://skindb.co';
const skinDbFallguysShopUrl = `${baseUrl}/fallguys/shop`;

function getFallguysDBItemUrl(itemLink: string) {
  return baseUrl + itemLink;
}

export async function checkDatabase(): Promise<FallGuysFauxDatabaseResponse> {
  const resp = await fetch(skinDbFallguysShopUrl);
  const page = await resp.text();

  return parseSkinDbFallguysShopPage(page);
}

export function parseSkinDbFallguysShopPage(pageHtml: string): FallGuysFauxDatabaseResponse {
  const $ = cheerio.load(pageHtml);


  const shopFeaturedItems: ShopItem[] = [];
  const firstRow = $('.items-row.my-4')[0];
  $('.item-responsive', firstRow).each((i, e) => {
    const name = $('h4.item-name span', e).text();
    const link = $('a', e).prop('href');
    const type = getTypeFromItemPageLink(link);
    const rarity = $('a', e).prop('data-rarity') as ShopItem['rarity']; // or 'unknown'

    const cost = Number($('.price-context', e).text().trim().replace(',', ''));
    const currency = $('.skin-price-icon', e).prop('src').includes('crowns') ? 'crowns' : 'kudos';

    const item: DBItem = {
      name,
      type,
      rarity,
      cost,
      currency,
      link: getFallguysDBItemUrl(link)
    };
    shopFeaturedItems.push(item);
  });

  return {
    shopFeaturedItems: shopFeaturedItems as [DBItem, DBItem, DBItem]
  };
}

// see all the types https://skindb.co/fallguys (Cosmetic stats)
// /fallguys/nameplate/pumpkin
// /fallguys/top/wicked-witch
// /fallguys/pattern/cheeky
// /fallguys/colour/arcane
// /fallguys/faceplate/baby-blue
const linkTypeMapping: Record<string, ShopItem['type']> = {
  'top': 'upper',
  'bottom': 'lower',
  'faceplate': 'face',
  'nameplate': 'banner',
};

function getTypeFromItemPageLink(url: string) {
  const matchs = url.match('/fallguys/(.*)/');
  if (!matchs) {
    throw new Error('bad url: ' + url);
  }
  return linkTypeMapping[matchs[1]] || matchs[1];
}
