
const baseUrl = 'https://fallguysdb.com';
export const fallguysDbTodaysShopUrl = `${baseUrl}/todays-item-shop`;

export function getFallguysDBItemUrl(itemLink: string) {
  return baseUrl + itemLink;
}
