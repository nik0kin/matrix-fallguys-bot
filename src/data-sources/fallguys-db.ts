import cheerio from 'cheerio';
import fetch from 'node-fetch';

import { DBItem, FallGuysFauxDatabaseResponse } from '../db-types';
import { ShopItem } from '../fall-guys';

const baseUrl = 'https://fallguysdb.com';
const fallguysDbTodaysShopUrl = `${baseUrl}/todays-item-shop`;

function getFallguysDBItemUrl(itemLink: string) {
  return baseUrl + itemLink;
}

export async function checkDatabase(): Promise<FallGuysFauxDatabaseResponse> {
  const resp = await fetch(fallguysDbTodaysShopUrl);
  const page = await resp.text();

  return parseFallguysDbTodaysShopPage(page);
}

export function parseFallguysDbTodaysShopPage(pageHtml: string): FallGuysFauxDatabaseResponse {
  const $ = cheerio.load(pageHtml);

  const shopFeaturedItems: ShopItem[] = [];
  $('div[section="featured items on ps4"] .item-info').each((i, e) => {
    const name = $('h3', e).text();
    const link = $('a:nth-child(1)', e).prop('href');
    const type = getTypeFromItemPageLink(link);
    const rarity = ($('p.stat:nth-child(2) span', e)[0].next.data || '').trim().toLowerCase() as ShopItem['rarity'];

    const costCurrency = ($('p.stat:nth-child(3) span', e)[0].next.data || '').trim().toLowerCase().split(' ');
    const cost = Number(costCurrency[0]);
    const currency = costCurrency[1] as ShopItem['currency'];

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

// /upper-items/hatchling
// /patterns/mountains
// /faces/blah
// /colors/blah
const linkTypeMapping: Record<string, ShopItem['type']> = {
  'upper-items': 'upper',
  'lower-items': 'lower',
  'patterns': 'pattern',
  'faces': 'face',
  'colors': 'colour'
};

function getTypeFromItemPageLink(url: string) {
  const matchs = url.match('/(.*)/');
  if (!matchs) {
    throw new Error('bad url: ' + url);
  }
  return linkTypeMapping[matchs[1]];
}
