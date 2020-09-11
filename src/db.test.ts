import { parseFallguysDbTodaysShopPage } from './db';

describe('parseFallguysDbTodaysShopPage', () => {
  test('should return 3 shop items', async () => {
    const data = await parseFallguysDbTodaysShopPage(getHtmlFixture());
    expect(data.shopFeaturedItems.length).toBe(3);
    expect(data.shopFeaturedItems[0]).toEqual({
      'name': 'Hatchling',
      'type': 'upper',
      'rarity': 'rare',
      'cost': 4500,
      'currency': 'kudos',
      'link': '/upper-items/hatchling'
    });
    expect(data.shopFeaturedItems[1]).toEqual({
      'name': 'Hatchling',
      'type': 'lower',
      'rarity': 'rare',
      'cost': 4500,
      'currency': 'kudos',
      'link': '/lower-items/hatchling'
    });
    expect(data.shopFeaturedItems[2]).toEqual({
      'name': 'Mountains',
      'type': 'pattern',
      'rarity': 'legendary',
      'cost': 3,
      'currency': 'crowns',
      'link': '/patterns/mountains'
    });
  });
});

function getHtmlFixture() {
  return `<div class="menu-section" section="featured items on ps4">
    <h2>Featured Items on PS4</h2>
    <div class="menu-section-items">
        <!-- upperItems -->
        <div class="menu-section-item">
          <div class="item-thumb">
              <img alt="Image of the item Hatchling from Fall Guys" src="https://d33wubrfki0l68.cloudfront.net/764c35c0d110fe333b9b3328dff5167d08ce9323/e33bb/assets/images/items/upper-items/hatchling.png">
          </div>
          <div class="item-info">
              <a href="/upper-items/hatchling">
                <h3>Hatchling</h3>
              </a>
              <div class="stats">
                <p class="stat">
                    This item is a member of the Hatchling item set.
                    It can be purchased from the item shop when available, for 4500 Kudos.
                    The item is of Rare rarity.
                </p>
                <p class="stat"><span>Rarity:</span> Rare</p>
                <p class="stat"><span>Cost:</span> 4500 Kudos</p>
                <a class="view-set-link" href="/item-sets/hatchling">View the entire Hatchling item set <i class="las la-arrow-right"></i></a>
              </div>
              <div class="item-share-links">
                <p>Share item:</p>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffallguysdb.com/upper-items/hatchling&amp;text=Hatchling%20-%20Item%20from%20Fall%20Guys">
                <i class="lab la-twitter"></i>
                Twitter
                </a>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffallguysdb.com/upper-items/hatchling">
                <i class="lab la-facebook-f"></i>
                Facebook
                </a>
              </div>
          </div>
        </div>
        <!-- lowerItems -->
        <div class="menu-section-item">
          <div class="item-thumb">
              <img alt="Image of the item Hatchling from Fall Guys" src="https://d33wubrfki0l68.cloudfront.net/9721067d54c5fd3fb03ab7eb60e69038ed184b0b/b32cb/assets/images/items/lower-items/hatchling.png">
          </div>
          <div class="item-info">
              <a href="/lower-items/hatchling">
                <h3>Hatchling</h3>
              </a>
              <div class="stats">
                <p class="stat">
                    This item is a member of the Hatchling item set.
                    It can be purchased from the item shop when available, for 4500 Kudos.
                    The item is of Rare rarity.
                </p>
                <p class="stat"><span>Rarity:</span> Rare</p>
                <p class="stat"><span>Cost:</span> 4500 Kudos</p>
                <a class="view-set-link" href="/item-sets/hatchling">View the entire Hatchling item set <i class="las la-arrow-right"></i></a>
              </div>
              <div class="item-share-links">
                <p>Share item:</p>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffallguysdb.com/lower-items/hatchling&amp;text=Hatchling%20-%20Item%20from%20Fall%20Guys">
                <i class="lab la-twitter"></i>
                Twitter
                </a>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffallguysdb.com/lower-items/hatchling">
                <i class="lab la-facebook-f"></i>
                Facebook
                </a>
              </div>
          </div>
        </div>
        <!-- patterns -->
        <div class="menu-section-item">
          <div class="item-thumb">
              <img data-src="https://d33wubrfki0l68.cloudfront.net/9dbb7d0cdb7cded34bda6780b16f0c44409cc992/6a2eb/assets/images/items/patterns/mountains.png" alt="Image of the item Mountains from Fall Guys">
          </div>
          <div class="item-info">
              <a href="/patterns/mountains">
                <h3>Mountains</h3>
              </a>
              <div class="stats">
                <p class="stat">
                    This item is a member of the Mountains item set.
                    It can be purchased from the item shop when available, for 3 Crowns.
                    The item is of Legendary rarity.
                </p>
                <p class="stat"><span>Rarity:</span> Legendary</p>
                <p class="stat"><span>Cost:</span> 3 Crowns</p>
              </div>
              <div class="item-share-links">
                <p>Share item:</p>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffallguysdb.com/patterns/mountains&amp;text=Mountains%20-%20Item%20from%20Fall%20Guys">
                <i class="lab la-twitter"></i>
                Twitter
                </a>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffallguysdb.com/patterns/mountains">
                <i class="lab la-facebook-f"></i>
                Facebook
                </a>
              </div>
          </div>
        </div>
        <!-- colors -->
        <!-- faces -->
        <!-- REGULAR ITEMS -->
    </div>
  </div>
  `;
}