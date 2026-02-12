// Property configuration for multi-property site
// This file contains all property-specific content, images, and metadata
import { resolveAsset } from "./asset";

export const PROPERTIES = {
  preswylfa: {
    id: "preswylfa",
    name: "Bwthyn Preswylfa",
    slug: "preswylfa",
    tagline: "Your cosy coastal retreat on Anglesey",

    // Location
    location: {
      address: "Cemaes, Anglesey, Wales",
      coordinates: {
        lat: 53.40460114605375,
        lng: -4.473623768851724,
      },
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d372.44411929445744!2d-4.473623768851724!3d53.40460114605375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTPCsDI0JzE2LjciTiA0wrAyOCcyNC45Ilc!5e0!3m2!1sen!2suk!4v1733407752336!5m2!1sen!2suk",
    },

    // Capacity
    capacity: {
      sleeps: 6,
      bedrooms: 2,
      bathrooms: 1,
      pets: true,
      petsAllowed: "Yes",
      maxPets: null,
    },

    // Main description
    description: {
      welcome:
        "Hello! We're Jonny, Lucy, Oscar, and Bertie — soon to be a family of five this year. Welcome to Bwthyn Preswylfa, our cosy little holiday cottage.",
      main: "Anglesey has held a special place in our hearts for many years; it's where we've made so many cherished family memories. Nestled in a peaceful spot near the coastal path and the lovely village of Cemaes, our cottage is the perfect retreat for relaxation and adventure alike.",
      additional:
        "With Mum just down the road in Amlwch, it feels like home here, surrounded by friendly faces, stunning beaches, and the natural beauty of the island.",
      closing: "We can't wait to share this little slice of Anglesey with you.",
    },

    // Property details
    details: {
      summary:
        "Discover tranquility in this 2 king-size bed terraced cottage situated in a small village just outside Cemaes village, with the Anglesey coastal path and beaches in walking distance. Our pet-friendly haven with spacious rooms and just steps away from walking routes, beaches, and a golf course. Your escape to serenity awaits in our garden oasis in a quiet location.",

      spaces: [
        {
          title: "Lounge",
          description:
            "There are 2 lounges. The small lounge has a sofa with a log burner and small TV. The large lounge has a larger seating area with TV, a room divider, and a sofa bed available.",
        },
        {
          title: "Kitchen/Dining Area",
          description:
            "Large kitchen with all major appliances and a large dining table. Boot room leading from the kitchen to the garden.",
        },
        {
          title: "Bedroom 1",
          description: "Large king-sized bed, chest of drawers, and chair.",
        },
        {
          title: "Bedroom 2",
          description:
            "Two single beds or one super king-sized bed, chair, and wardrobe.",
        },
        {
          title: "Bathroom",
          description: "Bath with electric shower.",
        },
        {
          title: "Outside",
          description: "Split-level garden with table and chairs.",
        },
      ],

      additionalInfo:
        "Guests 5 and 6 will sleep on a sofa bed in the lounge. A privacy screen/room divider is available. Please add extra guests to the booking form.",
    },

    // Amenities
    amenities: [
      "Log burner in lounge",
      "Towels and linen included",
      "Private parking",
      "Internet access",
      "Travel cot and high chair (please ask for these to be left out if required)",
      "Central Heating",
      "BBQ",
      "Dogs allowed",
    ],

    // Accessibility
    accessibility:
      "While the entire property is available for use to guests, the cottage is unfortunately unsuitable for wheelchair access.",

    // Images - resolved via bundler
    images: {
      hero: [
        resolveAsset("preswylfa/2.jpg"),
        resolveAsset("preswylfa/3.jpg"),
        resolveAsset("preswylfa/54.jpg"),
        resolveAsset("preswylfa/20240324_170910.jpg"),
        resolveAsset("preswylfa/20240908_141632.jpg"),
        resolveAsset("preswylfa/IMG-20240520-WA0009.jpg"),
        resolveAsset("preswylfa/IMG-20240528-WA0000.jpg"),
        resolveAsset("preswylfa/SmartSelect_20240225_201528_Airbnb.jpg"),
        resolveAsset("preswylfa/SmartSelect_20240225_201536_Airbnb.jpg"),
      ],
      gallery: [
        resolveAsset("preswylfa/2.jpg"),
        resolveAsset("preswylfa/3.jpg"),
        resolveAsset("preswylfa/54.jpg"),
        resolveAsset("preswylfa/20240324_170910.jpg"),
        resolveAsset("preswylfa/20240908_141632.jpg"),
        resolveAsset("preswylfa/IMG-20240520-WA0009.jpg"),
        resolveAsset("preswylfa/IMG-20240528-WA0000.jpg"),
        resolveAsset("preswylfa/SmartSelect_20240225_201528_Airbnb.jpg"),
        resolveAsset("preswylfa/SmartSelect_20240225_201536_Airbnb.jpg"),
        resolveAsset("preswylfa/tregele.jpg"),
        resolveAsset("preswylfa/tregele2.jpg"),
        resolveAsset("preswylfa/tregele3.jpg"),
        resolveAsset("preswylfa/tregele4.jpg"),
        resolveAsset("preswylfa/tregele5.jpg"),
        resolveAsset("preswylfa/food.jpg"),
        resolveAsset("preswylfa/food2.jpg"),
        resolveAsset("preswylfa/food3.jpg"),
        resolveAsset("preswylfa/food4.jpg"),
        resolveAsset("preswylfa/beach.jpg"),
        resolveAsset("preswylfa/beach2.jpg"),
        resolveAsset("preswylfa/beach3.jpg"),
        resolveAsset("preswylfa/beach4.jpg"),
        resolveAsset("preswylfa/beach5.jpg"),
        resolveAsset("preswylfa/New-1.jpg"),
        resolveAsset("preswylfa/New-2.jpg"),
        resolveAsset("preswylfa/New-3.jpg"),
        resolveAsset("preswylfa/New-4.jpg"),
        resolveAsset("preswylfa/New-5.jpg"),
        resolveAsset("preswylfa/New-6.jpg"),
        resolveAsset("preswylfa/New-7.jpg"),
        resolveAsset("preswylfa/New-8.jpg"),
        resolveAsset("preswylfa/New-9.jpg"),
        resolveAsset("preswylfa/New-10.jpg"),
        resolveAsset("preswylfa/New-11.jpg"),
        resolveAsset("preswylfa/New-12.jpg"),
        resolveAsset("preswylfa/New-13.jpg"),
        resolveAsset("preswylfa/New-14.jpg"),
        resolveAsset("preswylfa/New-15.jpg"),
        resolveAsset("preswylfa/New-16.jpg"),
        resolveAsset("preswylfa/New-17.jpg"),
        resolveAsset("preswylfa/New-18.jpg"),
        resolveAsset("preswylfa/New-19.jpg"),
        resolveAsset("preswylfa/New-20.jpg"),
        resolveAsset("preswylfa/New-21.jpg"),
        resolveAsset("preswylfa/New-22.jpg"),
        resolveAsset("preswylfa/New-23.jpg"),
        resolveAsset("preswylfa/New-24.jpg"),
        resolveAsset("preswylfa/New-25.jpg"),
        resolveAsset("preswylfa/New-26.jpg"),
        resolveAsset("preswylfa/New-27.jpg"),
        resolveAsset("preswylfa/New-28.jpg"),
        resolveAsset("preswylfa/New-29.jpg"),
      ],
      logo: resolveAsset("preswylfa/Bwythn_Preswylfa_Logo_Enhanced.png"),
      topbar: resolveAsset("preswylfa/Topbar.png"),
      welcomeTo: resolveAsset("preswylfa/welcome.png"),
    },

    // New: Local guide content for Preswylfa
    guide: {
      sections: [
        {
          key: "area",
          title: "Tregele and Surrounding Areas",
          // Choose images by filtering gallery filenames that include this string.
          // You can swap this for an explicit images array later if you prefer.
          imageFilter: "tregele",
          delay: 7000,
          paragraphs: [
            "Tregele is a small village with the only shop being the Premier at the Dragon Petrol Station. It stocks most essentials, but for larger shopping there’s a Co-op in Amlwch, about 15 minutes away.",
            "There are larger supermarkets in Penrhos and Llangefni.",
            "The closest village is Cemaes Bay.",
            "Local pubs include The Stag Inn (serves food) and Ye Old Vigour Inn. The Harbour Hotel Bar also welcomes the public.",
            "Cafés: The Bell – Y Goch and Coffee Pot.",
            "You can drive or walk to the Anglesey Coastal Path from the house — around 25 minutes on foot or a few minutes by car.",
          ],
        },
        {
          key: "recommendations",
          title: "Recommendations",
          imageFilter: "food",
          delay: 10000,
          paragraphs: [
            "The Bay View Restaurant in Cemaes offers an excellent Sunday lunch and has an outdoor play area. Booking is advised.",
            "Skye’s Crêperie in Amlwch is great for brunch and hosts themed evenings — check their social media for updates.",
          ],
        },
        {
          key: "beaches",
          title: "Beaches",
          imageFilter: "beach",
          delay: 8000,
          paragraphs: [
            "Cemaes has two beaches: Traeth Bach (small) and Traeth Mawr (large). Dogs are restricted on part of Traeth Mawr between 1 May and 30 September, but Traeth Bach allows dogs all year.",
            "Cemlyn Nature Reserve near Tregele hosts tern colonies and has a large pebble beach — dogs must be on leads.",
            "Newborough Beach, at the edge of Newborough Forest, is perfect for walks and summer days.",
            "Benllech Beach (≈ 25 minutes’ drive) has a café and toilets. Seasonal dog restrictions apply.",
          ],
        },
      ],
    },

    contact: {
      email: "hello@holidayhomesandlets.co.uk",
      adminEmail: "lucy@holidayhomesandlets.co.uk",

      // Shown in the footer as multiple lines
      addressLines: [
        "Bwthyn Preswylfa",
        "Cromlech Ter",
        "Tregele",
        "Cemaes",
        "LL67 0DW",
      ],

      // Optional per-property social links (footer uses these if present)
      social: {
        facebook: "https://www.facebook.com/p/bwythn-preswylfa-61557385151261/",
        instagram: "https://www.instagram.com/bwythnpreswylfa1",
      },
    },

    // Pricing rules (if property-specific)
    pricing: {
      type: "cleaning_charge",
      cleaningChargeNights: 3, // Apply £60 charge if stay is <= this many nights
      cleaningCharge: 60,
    },
  },

  piddleInn: {
    id: "piddle-inn",
    name: "escape the ordinary",
    slug: "piddle-inn",

    // Owner wants this exact casing from his copy
    tagline: "4 bed 4 en-suite Sleeps 10 Pet friendly",

    // Location
    location: {
      address: "Piddletrenthide, Dorset, England",
      coordinates: {
        // Owner’s copy: 4 bed, 4 en-suite, sleeps 10, pet friendly.
        // Coordinates here are still approximate – update when you have exact ones.
        lat: 50.7833,
        lng: -2.4833,
      },
      mapEmbedUrl: null, // TODO: Get Google Maps embed URL
    },

    // Capacity
    capacity: {
      sleeps: 10, // Updated per owner's copy: "Sleeps 10" – confirm bed/sofa arrangements
      bedrooms: 4,
      bathrooms: 4, // 4 en-suite shower rooms + 1 cloakroom
      pets: true,
      petsAllowed: "Yes - 2 well-behaved pets welcome",
      maxPets: 2,
    },

    // Main description (mapped from his Word doc)
    description: {
      // From: "Welcome to escape the ordinary"
      welcome: "Welcome to escape the ordinary",

      // From: "Welcome to my home, a large character 300yr old Inn close to Dorchester and the coast."
      main: "Welcome to my home, a large character 300yr old Inn close to Dorchester and the coast.",

      // From the garden / herbs / parking / footpaths paragraphs
      additional:
        "Landscaped with trees, shrubs, vines, flowers plus many herbs for your culinary use, all creating a welcoming atmosphere, so gather family & friends for milestones in life’s adventure. Collect your favourite people, view the photos, make plans. Ample private parking and direct access to numerous footpaths makes this charming retreat an ideal getaway for those seeking a relaxing countryside escape, yet convenient for towns, villages, beaches & pubs; an area bursting with history, natural beauty & hidden potential.",

      // From: "Create lasting memories as you explore all this and more during your stay at the Piddle Inn."
      closing:
        "Create lasting memories as you explore all this and more during your stay at the Piddle Inn.",
    },

    // Property details (kept as you had them – they’re factual/clear)
    details: {
      summary:
        "A delightful 4-bedroom house in the heart of Piddletrenthide, Dorset. Perfect for families and friends seeking a countryside escape, with space for up to 10 guests and 2 pets. Each bedroom has its own en-suite shower room, and the property features a fully equipped kitchen, spacious living areas, and a charming terrace overlooking the River Piddle.",

      spaces: [
        {
          title: "Kitchen",
          description:
            "Spacious kitchen fully equipped to cater to all your culinary needs. The garden usually has an abundant supply of rosemary, bay, thyme and sage for your cooking.",
        },
        {
          title: "Living Room",
          description:
            "Generously proportioned living room complete with TV, Bluetooth speakers, and games for your entertainment.",
        },
        {
          title: "Dining Room",
          description:
            "Dining table for the whole group where you can gather for meals and plan the day's adventures.",
        },
        {
          title: "Bedrooms",
          description:
            "Four well-presented bedrooms: three doubles and one twin, all offering serene spaces to rest after a day of exploration. Each bedroom has its own en-suite shower room with walk-in shower, basin, and WC. One shower room features a double basin for added convenience.",
        },
        {
          title: "Bathrooms",
          description:
            "Four en-suite shower rooms (each with walk-in shower, basin, and WC) plus a convenient cloakroom with basin and WC.",
        },
        {
          title: "Outside",
          description:
            "Charming furnished terrace providing the perfect spot to enjoy morning coffee or evening drinks, soaking up the calm surroundings and views of the adjoining River Piddle.",
        },
      ],

      additionalInfo: null,
    },

    // Amenities
    amenities: [
      "Off-road parking",
      "Fully equipped kitchen",
      "TV and Bluetooth speakers",
      "Games provided",
      "4 en-suite shower rooms",
      "Cloakroom",
      "Furnished terrace",
      "Garden herbs available",
      "River Piddle views",
      "2 pets welcome",
    ],

    // Accessibility – still waiting on proper info from him
    accessibility: null, // TODO: Get accessibility information from client

    // Original flat list kept for potential reuse elsewhere
    attractions: [
      "Pretty towns, villages, beaches and harbours to explore",
      "Art galleries and museums including D-Day, Tank, Dorset and Dinosaur museums",
      "Educational wildlife parks and children's farms",
      "Vintage railways, aircraft collections and steam fairs",
      "Medieval swannery, music concerts and subtropical gardens",
      "Activities and sports: boating, golf, coasteering, riding and fishing",
      "Historic abbeys, castles, houses and gardens (around 10,000 listed buildings in Dorset)",
      "Pre-historic, Saxon, Roman, Norman and Tudor historic sites and properties",
      "Over 50% of Dorset is designated as an Area of Outstanding Natural Beauty",
      "Many National Trust houses, gardens and coastal paths",
      "Thomas Hardy’s cottages, Tolpuddle Martyrs sites and the Cerne Giant",
      "Fantasy Island Fun Park",
      "SEA LIFE Centre and Oceanarium",
      "Monkey World",
      "Durdle Door, Old Harry Rocks, Lulworth Cove and Chesil Beach – part of England’s only UNESCO Natural World Heritage Site",
    ],

    // New: structured guide sections for the What To Do page
    guide: {
      sections: [
        {
          key: "jurassic-coast",
          title: "Jurassic Coast & Natural Wonders",
          imageFilter: "coast",
          paragraphs: [
            "Explore the world-famous Jurassic Coast, with its dramatic cliffs, coves and sweeping sea views, all within easy reach of the Piddle Inn.",
          ],
          bullets: [
            "Durdle Door and its iconic limestone arch",
            "Old Harry Rocks and coastal walks",
            "Lulworth Cove and surrounding coastal paths",
            "Chesil Beach – part of England’s only UNESCO Natural World Heritage Site",
          ],
        },
        {
          key: "towns-villages",
          title: "Towns, Villages, Beaches & Harbours",
          imageFilter: "village",
          paragraphs: [
            "Dorset is dotted with pretty towns, villages, beaches and traditional harbours, perfect for slow days out, local food and seaside strolls.",
          ],
          bullets: [
            "Pretty towns and villages throughout Dorset",
            "Beaches and harbours with classic seaside charm",
            "Weymouth Beach and Harbour for a traditional day at the seaside",
          ],
        },
        {
          key: "history-heritage",
          title: "History, Heritage & National Trust",
          imageFilter: "heritage",
          paragraphs: [
            "This is a county rich in history, from pre-historic landscapes to Tudor mansions, with countless historic buildings and National Trust properties to discover.",
          ],
          bullets: [
            "Historic abbeys, castles, houses and gardens (around 10,000 listed buildings in Dorset)",
            "Pre-historic, Saxon, Roman, Norman and Tudor historic sites and properties",
            "Over 50% of Dorset is designated as an Area of Outstanding Natural Beauty",
            "Many National Trust houses, gardens and coastal paths",
            "Thomas Hardy’s cottages and literary landscape",
            "Tolpuddle Martyrs sites and the Cerne Giant",
          ],
        },
        {
          key: "museums-gardens-wildlife",
          title: "Museums, Gardens & Wildlife",
          imageFilter: "museums",
          paragraphs: [
            "From museums and galleries to unique gardens and wildlife experiences, there is plenty to see and learn across Dorset.",
          ],
          bullets: [
            "Dorset Museum & Art Gallery",
            "D-Day, Tank and Dinosaur museums",
            "Medieval swannery and music concerts",
            "Abbotsbury Swannery and Abbotsbury Subtropical Gardens",
            "Educational wildlife parks and children's farms",
          ],
        },
        {
          key: "family-attractions",
          title: "Family Attractions & Days Out",
          imageFilter: "family",
          paragraphs: [
            "Families are spoilt for choice with attractions that will keep all ages entertained, whatever the weather.",
          ],
          bullets: [
            "Fantasy Island Fun Park",
            "SEA LIFE Centre Weymouth",
            "Oceanarium",
            "Monkey World",
          ],
        },
        {
          key: "activities-sport",
          title: "Outdoor Activities & Sport",
          imageFilter: "activity",
          paragraphs: [
            "Make the most of Dorset’s coast and countryside with a wide range of outdoor activities and adventures.",
          ],
          bullets: [
            "Boating and coastal trips",
            "Golf on nearby courses",
            "Coasteering along the Jurassic Coast",
            "Horse riding in the surrounding countryside",
            "Fishing on local rivers and coastline",
          ],
        },
      ],
    },

    // Images - resolved via bundler
    images: {
      hero: [
        resolveAsset("piddle-inn/piddle-4.jpg"),
        resolveAsset("piddle-inn/piddle-5.jpg"),
        resolveAsset("piddle-inn/piddle-6.jpg"),
        resolveAsset("piddle-inn/piddle-7.jpg"),
        resolveAsset("piddle-inn/piddle-8.jpg"),
        resolveAsset("piddle-inn/piddle-9.jpg"),
        resolveAsset("piddle-inn/piddle-10.jpg"),
      ],

      gallery: [
        resolveAsset("piddle-inn/piddle-4.jpg"),
        resolveAsset("piddle-inn/piddle-5.jpg"),
        resolveAsset("piddle-inn/piddle-6.jpg"),
        resolveAsset("piddle-inn/piddle-7.jpg"),
        resolveAsset("piddle-inn/piddle-8.jpg"),
        resolveAsset("piddle-inn/piddle-9.jpg"),
        resolveAsset("piddle-inn/piddle-10.jpg"),
        resolveAsset("piddle-inn/piddle-11.jpg"),
        resolveAsset("piddle-inn/piddle-12.jpg"),
        resolveAsset("piddle-inn/piddle-13.jpg"),
        resolveAsset("piddle-inn/piddle-14.jpg"),
        resolveAsset("piddle-inn/piddle-15.jpg"),
        resolveAsset("piddle-inn/piddle-16.jpg"),
        resolveAsset("piddle-inn/piddle-17.jpg"),
        resolveAsset("piddle-inn/piddle-18.jpg"),
        resolveAsset("piddle-inn/piddle-19.jpg"),
        resolveAsset("piddle-inn/piddle-20.jpg"),
        resolveAsset("piddle-inn/piddle-21.jpg"),
        resolveAsset("piddle-inn/piddle-22.jpg"),
        resolveAsset("piddle-inn/piddle-23.jpg"),
        resolveAsset("piddle-inn/piddle-24.jpg"),
        resolveAsset("piddle-inn/piddle-25.jpg"),
        resolveAsset("piddle-inn/piddle-26.jpg"),
        resolveAsset("piddle-inn/piddle-27.jpg"),
        resolveAsset("piddle-inn/piddle-28.jpg"),
        resolveAsset("piddle-inn/piddle-29.jpg"),
        resolveAsset("piddle-inn/piddle-30.jpg"),
        resolveAsset("piddle-inn/piddle-31.jpg"),
        resolveAsset("piddle-inn/piddle-32.jpg"),
        resolveAsset("piddle-inn/piddle-33.jpg"),
        resolveAsset("piddle-inn/piddle-34.jpg"),
        resolveAsset("piddle-inn/piddle-35.jpg"),
        resolveAsset("piddle-inn/piddle-36.jpg"),
        resolveAsset("piddle-inn/piddle-37.jpg"),
        resolveAsset("piddle-inn/piddle-38.jpg"),
        resolveAsset("piddle-inn/piddle-39.jpg"),
        resolveAsset("piddle-inn/piddle-40.jpg"),
        resolveAsset("piddle-inn/piddle-41.jpg"),
        resolveAsset("piddle-inn/piddle-42.jpg"),
        resolveAsset("piddle-inn/piddle-43.jpg"),
        resolveAsset("piddle-inn/piddle-44.jpg"),
        resolveAsset("piddle-inn/piddle-45.jpg"),
        resolveAsset("piddle-inn/piddle-46.jpg"),
        resolveAsset("piddle-inn/piddle-47.jpg"),
        resolveAsset("piddle-inn/piddle-48.jpg"),
        resolveAsset("piddle-inn/piddle-49.jpg"),
        resolveAsset("piddle-inn/piddle-50.jpg"),
        resolveAsset("piddle-inn/piddle-51.jpg"),
        resolveAsset("piddle-inn/piddle-52.jpg"),
        resolveAsset("piddle-inn/piddle-53.jpg"),
        resolveAsset("piddle-inn/piddle-54.jpg"),
        resolveAsset("piddle-inn/piddle-55.jpg"),
        resolveAsset("piddle-inn/piddle-56.jpg"),
        resolveAsset("piddle-inn/coast-1.jpg"),
        resolveAsset("piddle-inn/coast-2.jpg"),
        resolveAsset("piddle-inn/coast-3.jpg"),
        resolveAsset("piddle-inn/village-1.jpg"),
        resolveAsset("piddle-inn/village-2.jpg"),
        resolveAsset("piddle-inn/heritage-1.jpg"),
        resolveAsset("piddle-inn/heritage-2.jpg"),
        resolveAsset("piddle-inn/museums-1.jpg"),
        resolveAsset("piddle-inn/museums-2.jpg"),
        resolveAsset("piddle-inn/family-1.jpg"),
        resolveAsset("piddle-inn/family-2.jpg"),
        resolveAsset("piddle-inn/family-3.jpg"),
        resolveAsset("piddle-inn/activity-1.jpg"),
        resolveAsset("piddle-inn/activity-2.jpg"),
      ],

      logo: resolveAsset("piddle-inn/piddle-logo.png"),
      topbar: resolveAsset("piddle-inn/Topbar3.png"),
      welcomeTo: resolveAsset("piddle-inn/welcome2.png"),
    },

    // Contact/Booking
    contact: {
      email: "dorset@holidayhomesandlets.co.uk",
      adminEmail: "dorset@holidayhomesandlets.co.uk",
    },

    // Pricing rules (if property-specific)
    pricing: {
      type: "security_deposit",
      securityDepositBase: 300, // Base security deposit per booking
      securityDepositPerPet: 50, // Additional deposit per pet
      minimumNights: 2, // Minimum booking length
      discounts: [
        { nights: 28, percentage: 30 }, // 30% off for 28+ nights
        { nights: 7, percentage: 20 }, // 20% off for 7+ nights
      ],
    },
  },
};

// Helper function to get property by slug
export const getPropertyBySlug = (slug) => {
  return Object.values(PROPERTIES).find((property) => property.slug === slug);
};

// Helper function to get property by id
export const getPropertyById = (id) => {
  return PROPERTIES[id];
};

// List of all properties for navigation/selection
export const PROPERTY_LIST = Object.values(PROPERTIES);
