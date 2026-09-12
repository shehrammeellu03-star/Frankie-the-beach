/**
 * Unified slot mapping and alias resolver for Frankie's @ The Beach.
 * Bridges differences between menu item IDs, chef's favorite IDs, and site attraction slots
 * so that any updated photo takes effect across the entire website instantly.
 */

export interface UnifiedSlot {
  key: string;
  type: 'menu' | 'site' | 'gallery';
  label: string;
  category?: string;
  location: string;
  aliases: string[];
}

export const UNIFIED_SLOTS: UnifiedSlot[] = [
  // ==========================================
  // 1. CORE MENU DISHES
  // ==========================================
  {
    key: 'the-classic-smash',
    type: 'menu',
    label: 'The Classic Smash Burger',
    category: 'burgers',
    location: 'Menu / Home / TripAdvisor / Chef’s Favorites',
    aliases: ['menu:the-classic-smash', 'menu:beach-classic', 'beach-classic', 'the-classic-smash', 'food1Burger', 'site:food1Burger', 'site:heroBurger'],
  },
  {
    key: 'bbq-bacon-stack',
    type: 'menu',
    label: 'BBQ Bacon Stack Cheeseburger',
    category: 'burgers',
    location: 'Menu / Home / Chef’s Favorites',
    aliases: ['menu:bbq-bacon-stack', 'menu:bacon-wave', 'bacon-wave', 'bbq-bacon-stack', 'food5BaconBurger', 'site:food5BaconBurger'],
  },
  {
    key: 'spicy-beach-burger',
    type: 'menu',
    label: 'Spicy Beach Burger & Slushy',
    category: 'burgers',
    location: 'Menu / Gallery',
    aliases: ['menu:spicy-beach-burger', 'spicy-beach-burger', 'menu:spicy-beach', 'spicy-beach', 'food8BurgerSlushy', 'site:food8BurgerSlushy', 'spicyBurger', 'site:spicyBurger'],
  },
  {
    key: 'pepperoni-melted-cheddar-fries',
    type: 'menu',
    label: 'Pepperoni & Melted Cheddar Dirty Fries',
    category: 'loaded-fries',
    location: 'Menu / Home / TripAdvisor / Chef’s Favorites',
    aliases: ['menu:pepperoni-melted-cheddar-fries', 'menu:pepperoni-cheddar-fries', 'pepperoni-cheddar-fries', 'pepperoni-melted-cheddar-fries', 'loaded-fries', 'food2LoadedChips', 'site:food2LoadedChips', 'site:pepperoniFries', 'pepperoniFries'],
  },
  {
    key: 'cheesy-bacon-fries',
    type: 'menu',
    label: 'Loaded Cheesy Chips With Mayo',
    category: 'loaded-fries',
    location: 'Menu',
    aliases: ['menu:cheesy-bacon-fries', 'cheesy-bacon-fries'],
  },
  {
    key: 'chilli-cheese-dog',
    type: 'menu',
    label: 'Chilli Cheese Boardwalk Dog',
    category: 'hot-dogs',
    location: 'Menu / TripAdvisor / Chef’s Favorites',
    aliases: ['menu:chilli-cheese-dog', 'chilli-cheese-dog', 'menu:the-chilli-cheese-dog', 'the-chilli-cheese-dog', 'chilliCheeseDog', 'site:chilliCheeseDog'],
  },
  {
    key: 'boardwalk-jumbo-dog',
    type: 'menu',
    label: 'Boardwalk Jumbo Beach Dog',
    category: 'hot-dogs',
    location: 'Menu / Home Promo',
    aliases: [
      'menu:boardwalk-jumbo-dog',
      'boardwalk-jumbo-dog',
      'menu:jumbo-boardwalk-dog',
      'jumbo-boardwalk-dog',
      'boardwalkDog',
      'site:boardwalkDog',
      'food3BoardwalkDog',
      'site:food3BoardwalkDog',
      'food7BurgerDogCombo',
      'site:food7BurgerDogCombo',
    ],
  },
  {
    key: 'cold-whippy-cone',
    type: 'menu',
    label: 'Whippy Ice Cream & Flake Cone',
    category: 'ice-cream',
    location: 'Menu / Home / Seaside Treats',
    aliases: [
      'menu:cold-whippy-cone',
      'cold-whippy-cone',
      'menu:whippy-ice-cream-flake',
      'whippy-ice-cream-flake',
      'coldIceCream',
      'site:coldIceCream',
      'iceCreamCone',
      'site:iceCreamCone',
      'iceCreamSundaes',
      'site:iceCreamSundaes',
      'massiveIceCream',
      'site:massiveIceCream',
    ],
  },
  {
    key: 'fully-loaded-chicken-fries',
    type: 'menu',
    label: 'Fully Loaded Chicken & Melted Cheese Chips',
    category: 'loaded-fries',
    location: 'Menu',
    aliases: ['menu:fully-loaded-chicken-fries', 'fully-loaded-chicken-fries', 'food6ChickenChips', 'site:food6ChickenChips'],
  },

  // ==========================================
  // 2. HOMEPAGE & KEY WEBSITE SECTIONS
  // ==========================================
  {
    key: 'logo',
    type: 'site',
    label: 'Brand Logo & App Icon (Browser Tab Favicon, App Download, Header)',
    location: 'Browser Tab Favicon, App Download Modals/Banners, Header & All Brand Badges',
    aliases: ['logo', 'site:logo', 'favicon', 'site:favicon', 'appIcon', 'site:appIcon', 'pwaIcon', 'site:pwaIcon', 'brandLogo', 'site:brandLogo'],
  },
  {
    key: 'heroBg',
    type: 'site',
    label: 'Homepage Hero Ocean Beach Background',
    location: 'Homepage Top Hero Full Width Background',
    aliases: ['heroBg', 'site:heroBg', 'heroBeachBg', 'site:heroBeachBg'],
  },
  {
    key: 'heroVideo',
    type: 'site',
    label: 'Homepage Hero Video Background (MP4 / WebM)',
    location: 'Homepage Top Hero Video Background',
    aliases: ['heroVideo', 'site:heroVideo', 'videoBg', 'site:videoBg'],
  },
  {
    key: 'cateringVideo',
    type: 'site',
    label: 'Beach Catering & Events Video (MP4 / WebM)',
    location: 'Homepage Catering & Private Hire Showcase Section',
    aliases: ['cateringVideo', 'site:cateringVideo'],
  },
  {
    key: 'heroBurger',
    type: 'site',
    label: 'Homepage Hero Main Cheeseburger Polaroid',
    location: 'Homepage Top Hero Center Polaroid',
    aliases: ['heroBurger', 'site:heroBurger'],
  },
  {
    key: 'heroIceCream',
    type: 'site',
    label: 'Homepage Hero Seaside Cone Polaroid',
    location: 'Homepage Top Hero Bottom-Right Polaroid',
    aliases: ['heroIceCream', 'site:heroIceCream', 'heroDrink', 'site:heroDrink'],
  },
  {
    key: 'kiosk',
    type: 'site',
    label: "Frankie's Beachfront Kiosk & Terrace",
    location: 'Homepage Hero Top-Right Polaroid / About Page Grounds',
    aliases: ['kiosk', 'site:kiosk', 'kioskExterior', 'site:kioskExterior', 'beachPatio', 'site:beachPatio'],
  },
  {
    key: 'barSelfie',
    type: 'site',
    label: 'Frankie Fernando & Beach Bar Crew',
    location: 'About Page Founder Story / Charity Page',
    aliases: ['barSelfie', 'site:barSelfie', 'genuineBarSelfie', 'site:genuineBarSelfie', 'barTeam', 'site:barTeam'],
  },
  {
    key: 'pepperoniFries',
    type: 'site',
    label: 'Pepperoni & Dirty Fries Promo Card',
    location: 'Homepage Category Cards (Loaded Fries & Chips)',
    aliases: ['pepperoniFries', 'site:pepperoniFries'],
  },
  {
    key: 'food7BurgerDogCombo',
    type: 'site',
    label: 'Jumbo Boardwalk Dogs Feature Card',
    location: 'Homepage Category Cards (Hot Dogs & Grill)',
    aliases: ['food7BurgerDogCombo', 'site:food7BurgerDogCombo'],
  },
  {
    key: 'massiveIceCream',
    type: 'site',
    label: 'Sundae Cones & Sprinkles Promo Card',
    location: 'Homepage Category Cards (Ice Cream & Treats)',
    aliases: ['massiveIceCream', 'site:massiveIceCream'],
  },
  {
    key: 'childrenCarousel',
    type: 'site',
    label: 'Seaside Vintage 1950s Carousel',
    location: 'Homepage Banner / TripAdvisor Rides / About Page / Charity Page',
    aliases: ['childrenCarousel', 'site:childrenCarousel', 'vintageCarousel', 'site:vintageCarousel'],
  },
  {
    key: 'childrenSlide',
    type: 'site',
    label: 'Giant 3-Lane Beach Inflatable Slide',
    location: 'About Page Funfair / TripAdvisor Rides / Charity Page',
    aliases: ['childrenSlide', 'site:childrenSlide', 'childrenPlayArea', 'site:childrenPlayArea', 'inflatableSlide', 'site:inflatableSlide'],
  },
  {
    key: 'childrenTrampolines',
    type: 'site',
    label: 'Beachfront Bungee Trampolines Arena',
    location: 'About Page Funfair / TripAdvisor Rides / Charity Page',
    aliases: ['childrenTrampolines', 'site:childrenTrampolines', 'beachTrampolines', 'site:beachTrampolines'],
  },
  {
    key: 'childrenKiddiesCorner',
    type: 'site',
    label: 'Kiddies Corner & Family Carousel Walk',
    location: 'About Page Funfair / Charity Page',
    aliases: ['childrenKiddiesCorner', 'site:childrenKiddiesCorner', 'kiddiesCorner', 'site:kiddiesCorner'],
  },
  {
    key: 'childrenScooter',
    type: 'site',
    label: 'Beach Electric Scooters Track',
    location: 'TripAdvisor Rides Section',
    aliases: ['childrenScooter', 'site:childrenScooter'],
  },

  // ==========================================
  // 3. ALL OFFICIAL 24 GALLERY PHOTOS
  // ==========================================
  {
    key: 'g-terrace',
    type: 'gallery',
    label: "Frankie's Beach Terrace & Seaside View",
    category: 'kiosk-team',
    location: 'Customer Gallery (Beach Kiosk & Team)',
    aliases: ['gallery:g-terrace', 'g-terrace'],
  },
  {
    key: 'g-team',
    type: 'gallery',
    label: "Frankie's Beach Bar Team & Hospitality",
    category: 'kiosk-team',
    location: 'Customer Gallery (Beach Kiosk & Team)',
    aliases: ['gallery:g-team', 'g-team'],
  },
  {
    key: 'g-burger-1',
    type: 'gallery',
    label: 'The Classic Grill Smash Burger',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-1', 'g-burger-1'],
  },
  {
    key: 'g-burger-5',
    type: 'gallery',
    label: 'BBQ Bacon Cheeseburger on Sesame Bun',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-5', 'g-burger-5'],
  },
  {
    key: 'g-burger-8',
    type: 'gallery',
    label: 'Burger, Loaded Fries & Slushy Combo',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-burger-8', 'g-burger-8'],
  },
  {
    key: 'g-dog-chilli',
    type: 'gallery',
    label: 'Chilli Cheese Boardwalk Jumbo Dog',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-dog-chilli', 'g-dog-chilli'],
  },
  {
    key: 'g-dog-combo',
    type: 'gallery',
    label: 'Jumbo Dog & Crispy Chicken Burger Duo',
    category: 'burgers-dogs',
    location: 'Customer Gallery (Burgers & Hot Dogs)',
    aliases: ['gallery:g-dog-combo', 'g-dog-combo'],
  },
  {
    key: 'g-pepperoni-fries',
    type: 'gallery',
    label: 'Pepperoni & Melted Cheddar Dirty Fries',
    category: 'loaded-fries',
    location: 'Customer Gallery (Loaded Fries & Sides)',
    aliases: ['gallery:g-pepperoni-fries', 'g-pepperoni-fries'],
  },
  {
    key: 'g-massive-icecream',
    type: 'gallery',
    label: 'Massive Chocolate Sundae Swirl Waffle Cone',
    category: 'treats',
    location: 'Customer Gallery (Ice Creams & Sweets)',
    aliases: ['gallery:g-massive-icecream', 'g-massive-icecream'],
  },
  {
    key: 'g-sprinkle-cone',
    type: 'gallery',
    label: 'Rainbow Sprinkle Dipped Soft-Serve Cone',
    category: 'treats',
    location: 'Customer Gallery (Ice Creams & Sweets)',
    aliases: ['gallery:g-sprinkle-cone', 'g-sprinkle-cone'],
  },
  {
    key: 'g-cold-icecream',
    type: 'gallery',
    label: 'Classic Vanilla Beach Soft-Serve Cone',
    category: 'treats',
    location: 'Customer Gallery (Ice Creams & Sweets)',
    aliases: ['gallery:g-cold-icecream', 'g-cold-icecream'],
  },
  {
    key: 'g-childern-1',
    type: 'gallery',
    label: 'Giant 3-Lane Inflatable Beach Slide',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-1', 'g-childern-1'],
  },
  {
    key: 'g-childern-2',
    type: 'gallery',
    label: 'Kiddies Corner Carousel & Family Beach Fun',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-2', 'g-childern-2'],
  },
  {
    key: 'g-childern-3',
    type: 'gallery',
    label: 'Beachfront Trampolines Arena by the Waves',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-3', 'g-childern-3'],
  },
  {
    key: 'g-childern-4',
    type: 'gallery',
    label: 'Vintage Red & Yellow Carousel on Ramsgate Sands',
    category: 'family',
    location: 'Customer Gallery (Beach Rides & Family Fun)',
    aliases: ['gallery:g-childern-4', 'g-childern-4'],
  },
];

/**
 * Returns all potential keys (with and without prefixes) that should be updated
 * when a user assigns an image to this slot.
 */
export function getAllAliasesForSlot(targetKey: string): string[] {
  if (!targetKey) return [];
  const clean = targetKey.replace(/^(menu:|site:|gallery:)/, '');
  const matched = UNIFIED_SLOTS.find(
    (s) => s.key === clean || s.aliases.includes(targetKey) || s.aliases.includes(clean)
  );

  if (matched) {
    const set = new Set<string>([...matched.aliases, targetKey, clean]);
    if (matched.type === 'menu') {
      set.add(`menu:${matched.key}`);
      set.add(matched.key);
    } else if (matched.type === 'gallery') {
      set.add(`gallery:${matched.key}`);
      set.add(matched.key);
    } else {
      set.add(`site:${matched.key}`);
      set.add(matched.key);
    }
    return Array.from(set);
  }

  // Fallback for custom items
  return [
    targetKey,
    clean,
    `menu:${clean}`,
    `site:${clean}`,
    `gallery:${clean}`,
  ];
}

// High-performance static alias lookup map (O(1) lookup instead of O(N) array search)
const ALIAS_LOOKUP_MAP = new Map<string, string[]>();
for (const s of UNIFIED_SLOTS) {
  ALIAS_LOOKUP_MAP.set(s.key, s.aliases);
  ALIAS_LOOKUP_MAP.set(`menu:${s.key}`, s.aliases);
  ALIAS_LOOKUP_MAP.set(`site:${s.key}`, s.aliases);
  ALIAS_LOOKUP_MAP.set(`gallery:${s.key}`, s.aliases);
  for (const a of s.aliases) {
    ALIAS_LOOKUP_MAP.set(a, s.aliases);
    if (!a.includes(':')) {
      ALIAS_LOOKUP_MAP.set(`menu:${a}`, s.aliases);
      ALIAS_LOOKUP_MAP.set(`site:${a}`, s.aliases);
      ALIAS_LOOKUP_MAP.set(`gallery:${a}`, s.aliases);
    }
  }
}

/**
 * Resolves an override from the slotOverrides object using all known alias patterns.
 */
export function resolveImageOverride(
  slotKey: string | undefined,
  overrides: Record<string, string>
): string | undefined {
  if (!slotKey || !overrides) return undefined;

  // Direct check
  if (overrides[slotKey]) return overrides[slotKey];

  const clean = slotKey.replace(/^(menu:|site:|gallery:)/, '');
  if (overrides[clean]) return overrides[clean];
  if (overrides[`menu:${clean}`]) return overrides[`menu:${clean}`];
  if (overrides[`site:${clean}`]) return overrides[`site:${clean}`];
  if (overrides[`gallery:${clean}`]) return overrides[`gallery:${clean}`];

  // O(1) Map lookup
  const aliases = ALIAS_LOOKUP_MAP.get(slotKey) || ALIAS_LOOKUP_MAP.get(clean);
  if (aliases) {
    for (let i = 0; i < aliases.length; i++) {
      const alias = aliases[i];
      if (overrides[alias]) return overrides[alias];
    }
  }

  return undefined;
}
