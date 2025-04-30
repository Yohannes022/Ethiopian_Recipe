/**
 * Mock data for restaurants, menus, and delivery
 */

import { Restaurant, MenuItem, Order, Review, DeliveryPerson } from "@/types/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Habesha Ethiopian Restaurant",
    description: "Authentic Ethiopian cuisine with traditional injera and a variety of wots and tibs.",
    imageUrl: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?q=80&w=1000",
    coverImageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1000",
    location: {
      latitude: 9.0222,
      longitude: 38.7468,
      address: "Bole Road, Addis Ababa, Ethiopia"
    },
    rating: 4.7,
    reviewCount: 128,
    cuisineType: ["Ethiopian", "Traditional"],
    priceRange: "medium",
    openingHours: {
      open: "10:00",
      close: "22:00"
    },
    contactPhone: "+251911234567",
    contactEmail: "info@habesharestaurant.com",
    ownerId: "5",
    isOpen: true,
    deliveryFee: 50,
    minOrderAmount: 200,
    estimatedDeliveryTime: 45,
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Yod Abyssinia Cultural Restaurant",
    description: "Experience Ethiopian culture with traditional food and live performances.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000",
    coverImageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1000",
    location: {
      latitude: 9.0135,
      longitude: 38.7632,
      address: "Kazanchis, Addis Ababa, Ethiopia"
    },
    rating: 4.9,
    reviewCount: 256,
    cuisineType: ["Ethiopian", "Cultural"],
    priceRange: "high",
    openingHours: {
      open: "12:00",
      close: "23:00"
    },
    contactPhone: "+251922345678",
    contactEmail: "reservations@yodabyssinia.com",
    ownerId: "6",
    isOpen: true,
    deliveryFee: 75,
    minOrderAmount: 300,
    estimatedDeliveryTime: 50,
    createdAt: "2022-11-20T14:15:00Z"
  },
  {
    id: "3",
    name: "Kategna Ethiopian Restaurant",
    description: "Modern take on traditional Ethiopian dishes with a cozy atmosphere.",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1000",
    coverImageUrl: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?q=80&w=1000",
    location: {
      latitude: 9.0110,
      longitude: 38.7612,
      address: "Bole, Addis Ababa, Ethiopia"
    },
    rating: 4.5,
    reviewCount: 98,
    cuisineType: ["Ethiopian", "Modern"],
    priceRange: "medium",
    openingHours: {
      open: "11:00",
      close: "21:30"
    },
    contactPhone: "+251933456789",
    contactEmail: "hello@kategna.com",
    ownerId: "7",
    isOpen: true,
    deliveryFee: 45,
    minOrderAmount: 150,
    estimatedDeliveryTime: 35,
    createdAt: "2023-03-05T09:45:00Z"
  },
  {
    id: "4",
    name: "Lucy Ethiopian Restaurant",
    description: "Named after the famous fossil, serving traditional dishes with a focus on vegetarian options.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1000",
    coverImageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000",
    location: {
      latitude: 9.0298,
      longitude: 38.7584,
      address: "Meskel Square, Addis Ababa, Ethiopia"
    },
    rating: 4.3,
    reviewCount: 76,
    cuisineType: ["Ethiopian", "Vegetarian"],
    priceRange: "low",
    openingHours: {
      open: "09:00",
      close: "20:00"
    },
    contactPhone: "+251944567890",
    contactEmail: "contact@lucyrestaurant.com",
    ownerId: "8",
    isOpen: false,
    deliveryFee: 35,
    minOrderAmount: 100,
    estimatedDeliveryTime: 30,
    createdAt: "2023-05-12T11:20:00Z"
  },
  {
    id: "5",
    name: "Dashen Traditional Restaurant",
    description: "Family-owned restaurant specializing in northern Ethiopian cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1000",
    coverImageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1000",
    location: {
      latitude: 9.0175,
      longitude: 38.7525,
      address: "Piassa, Addis Ababa, Ethiopia"
    },
    rating: 4.6,
    reviewCount: 112,
    cuisineType: ["Ethiopian", "Northern"],
    priceRange: "medium",
    openingHours: {
      open: "11:30",
      close: "22:30"
    },
    contactPhone: "+251955678901",
    contactEmail: "info@dashenrestaurant.com",
    ownerId: "9",
    isOpen: true,
    deliveryFee: 55,
    minOrderAmount: 180,
    estimatedDeliveryTime: 40,
    createdAt: "2023-02-18T13:10:00Z"
  }
];

export const menuItems: MenuItem[] = [
  // Habesha Ethiopian Restaurant
  {
    id: "1-1",
    restaurantId: "1",
    name: "Doro Wat",
    description: "Spicy chicken stew with berbere spice, served with injera.",
    imageUrl: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?q=80&w=500",
    price: 250,
    category: "Main Dishes",
    isAvailable: true,
    isPopular: true,
    recipeId: "1",
    options: [
      {
        id: "opt-1",
        name: "Spice Level",
        choices: [
          { id: "c-1", name: "Mild", price: 0 },
          { id: "c-2", name: "Medium", price: 0 },
          { id: "c-3", name: "Spicy", price: 0 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: "1-2",
    restaurantId: "1",
    name: "Kitfo",
    description: "Ethiopian steak tartare seasoned with mitmita and niter kibbeh.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500",
    price: 280,
    category: "Main Dishes",
    isAvailable: true,
    isPopular: true,
    recipeId: "3",
    options: [
      {
        id: "opt-2",
        name: "Cooking Level",
        choices: [
          { id: "c-4", name: "Raw (Traditional)", price: 0 },
          { id: "c-5", name: "Lightly Cooked", price: 0 },
          { id: "c-6", name: "Well Done", price: 0 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: "1-3",
    restaurantId: "1",
    name: "Injera Platter",
    description: "Large injera with a variety of vegetarian and meat wots.",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=500",
    price: 350,
    category: "Platters",
    isAvailable: true,
    isPopular: true,
    options: [
      {
        id: "opt-3",
        name: "Platter Size",
        choices: [
          { id: "c-7", name: "Small (2 people)", price: -50 },
          { id: "c-8", name: "Medium (3-4 people)", price: 0 },
          { id: "c-9", name: "Large (5-6 people)", price: 100 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  
  // Yod Abyssinia Cultural Restaurant
  {
    id: "2-1",
    restaurantId: "2",
    name: "Special Doro Wat",
    description: "Premium chicken stew with extra eggs and special berbere blend.",
    imageUrl: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?q=80&w=500",
    price: 320,
    category: "Signature Dishes",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "2-2",
    restaurantId: "2",
    name: "Cultural Meat Platter",
    description: "Assortment of tibs, kitfo, and doro wat with injera and ayib.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500",
    price: 450,
    category: "Platters",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "2-3",
    restaurantId: "2",
    name: "Vegetarian Feast",
    description: "Selection of shiro, misir, kik, gomen and other vegetarian dishes.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=500",
    price: 280,
    category: "Vegetarian",
    isAvailable: true
  },
  
  // Kategna Ethiopian Restaurant
  {
    id: "3-1",
    restaurantId: "3",
    name: "Kategna Special Tibs",
    description: "Sautéed beef with rosemary, onions, and peppers in a special sauce.",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=500",
    price: 260,
    category: "Signature Dishes",
    isAvailable: true,
    isPopular: true,
    recipeId: "5"
  },
  {
    id: "3-2",
    restaurantId: "3",
    name: "Shiro Wat",
    description: "Spiced chickpea stew, a staple of Ethiopian cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=500",
    price: 180,
    category: "Vegetarian",
    isAvailable: true,
    isPopular: false,
    recipeId: "4"
  },
  {
    id: "3-3",
    restaurantId: "3",
    name: "Tej (Honey Wine)",
    description: "Traditional Ethiopian honey wine served in a berele.",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500",
    price: 120,
    category: "Beverages",
    isAvailable: true
  },
  
  // Lucy Ethiopian Restaurant
  {
    id: "4-1",
    restaurantId: "4",
    name: "Vegetarian Combo",
    description: "Assortment of vegetarian dishes with injera.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=500",
    price: 200,
    category: "Vegetarian",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "4-2",
    restaurantId: "4",
    name: "Misir Wat",
    description: "Spiced red lentil stew, a popular vegetarian dish.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=500",
    price: 150,
    category: "Vegetarian",
    isAvailable: true
  },
  {
    id: "4-3",
    restaurantId: "4",
    name: "Ethiopian Coffee Ceremony",
    description: "Traditional coffee ceremony with freshly roasted beans.",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500",
    price: 180,
    category: "Beverages",
    isAvailable: true,
    isPopular: true
  },
  
  // Dashen Traditional Restaurant
  {
    id: "5-1",
    restaurantId: "5",
    name: "Gored Gored",
    description: "Cubes of raw beef seasoned with spiced butter and mitmita.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500",
    price: 240,
    category: "Northern Specialties",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "5-2",
    restaurantId: "5",
    name: "Beyaynetu",
    description: "Colorful vegetarian platter served on injera.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=500",
    price: 220,
    category: "Vegetarian",
    isAvailable: true,
    isPopular: true
  },
  {
    id: "5-3",
    restaurantId: "5",
    name: "Dashen Beer",
    description: "Local Ethiopian beer from the Dashen Brewery.",
    imageUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=500",
    price: 80,
    category: "Beverages",
    isAvailable: true
  }
];

export const reviews: Review[] = [
  {
    id: "1",
    userId: "1",
    userName: "Makeda Abebe",
    userAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200",
    restaurantId: "1",
    orderId: "order-1",
    rating: 5,
    comment: "The Doro Wat was absolutely authentic and delicious! Reminds me of my grandmother's recipe.",
    createdAt: "2023-12-15T18:30:00Z",
    likes: 12
  },
  {
    id: "2",
    userId: "2",
    userName: "Dawit Haile",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    restaurantId: "1",
    orderId: "order-2",
    rating: 4,
    comment: "Great food and fast delivery. The injera was fresh and the kitfo was perfectly seasoned.",
    createdAt: "2023-12-10T14:45:00Z",
    likes: 8
  },
  {
    id: "3",
    userId: "3",
    userName: "Tigist Bekele",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    restaurantId: "2",
    orderId: "order-3",
    rating: 5,
    comment: "The cultural experience at Yod Abyssinia is unmatched! Amazing food and service.",
    createdAt: "2023-11-28T20:15:00Z",
    likes: 15
  },
  {
    id: "4",
    userId: "4",
    userName: "Solomon Tadesse",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    restaurantId: "3",
    orderId: "order-4",
    rating: 4,
    comment: "Kategna's tibs are some of the best in the city. Delivery was a bit delayed though.",
    createdAt: "2023-12-05T19:20:00Z",
    likes: 6
  },
  {
    id: "5",
    userId: "5",
    userName: "Hanna Girma",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    restaurantId: "4",
    orderId: "order-5",
    rating: 3,
    comment: "The vegetarian combo was good but not exceptional. Delivery was prompt.",
    createdAt: "2023-12-12T13:10:00Z",
    likes: 2
  }
];

export const deliveryPeople: DeliveryPerson[] = [
  {
    id: "d-1",
    name: "Abebe Kebede",
    phone: "+251911222333",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    currentLocation: {
      latitude: 9.0210,
      longitude: 38.7460
    },
    isAvailable: true,
    rating: 4.8,
    completedDeliveries: 342
  },
  {
    id: "d-2",
    name: "Meron Alemu",
    phone: "+251922333444",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    currentLocation: {
      latitude: 9.0150,
      longitude: 38.7620
    },
    isAvailable: true,
    rating: 4.9,
    completedDeliveries: 287
  },
  {
    id: "d-3",
    name: "Yonas Tesfaye",
    phone: "+251933444555",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200",
    currentLocation: {
      latitude: 9.0280,
      longitude: 38.7580
    },
    isAvailable: false,
    rating: 4.7,
    completedDeliveries: 156
  }
];

export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "1",
    restaurantId: "1",
    items: [
      {
        id: "item-1",
        menuItem: menuItems[0], // Doro Wat
        quantity: 2,
        selectedOptions: [
          {
            optionId: "opt-1",
            choiceIds: ["c-3"] // Spicy
          }
        ],
        totalPrice: 500 // 2 * 250
      },
      {
        id: "item-2",
        menuItem: menuItems[2], // Injera Platter
        quantity: 1,
        selectedOptions: [
          {
            optionId: "opt-3",
            choiceIds: ["c-8"] // Medium
          }
        ],
        totalPrice: 350
      }
    ],
    status: "delivered",
    subtotal: 850,
    deliveryFee: 50,
    tax: 85,
    tip: 100,
    total: 1085,
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    deliveryAddress: {
      latitude: 9.0240,
      longitude: 38.7470,
      address: "Bole, Addis Ababa, Ethiopia"
    },
    deliveryInstructions: "Please call when you arrive at the gate",
    estimatedDeliveryTime: 45,
    actualDeliveryTime: 42,
    deliveryPersonId: "d-1",
    createdAt: "2023-12-15T17:30:00Z",
    updatedAt: "2023-12-15T18:12:00Z"
  },
  {
    id: "order-2",
    userId: "2",
    restaurantId: "2",
    items: [
      {
        id: "item-3",
        menuItem: menuItems[3], // Special Doro Wat
        quantity: 1,
        totalPrice: 320
      },
      {
        id: "item-4",
        menuItem: menuItems[5], // Vegetarian Feast
        quantity: 1,
        totalPrice: 280
      }
    ],
    status: "delivered",
    subtotal: 600,
    deliveryFee: 75,
    tax: 60,
    total: 735,
    paymentMethod: "mobile_money",
    paymentStatus: "completed",
    deliveryAddress: {
      latitude: 9.0130,
      longitude: 38.7640,
      address: "Kazanchis, Addis Ababa, Ethiopia"
    },
    estimatedDeliveryTime: 50,
    actualDeliveryTime: 55,
    deliveryPersonId: "d-2",
    createdAt: "2023-12-10T13:45:00Z",
    updatedAt: "2023-12-10T14:40:00Z"
  },
  {
    id: "order-3",
    userId: "1",
    restaurantId: "3",
    items: [
      {
        id: "item-5",
        menuItem: menuItems[6], // Kategna Special Tibs
        quantity: 1,
        totalPrice: 260
      },
      {
        id: "item-6",
        menuItem: menuItems[8], // Tej
        quantity: 2,
        totalPrice: 240 // 2 * 120
      }
    ],
    status: "out_for_delivery",
    subtotal: 500,
    deliveryFee: 45,
    tax: 50,
    total: 595,
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    deliveryAddress: {
      latitude: 9.0220,
      longitude: 38.7465,
      address: "Bole, Addis Ababa, Ethiopia"
    },
    estimatedDeliveryTime: 35,
    deliveryPersonId: "d-3",
    deliveryPersonLocation: {
      latitude: 9.0190,
      longitude: 38.7520
    },
    createdAt: "2024-01-20T18:30:00Z",
    updatedAt: "2024-01-20T18:45:00Z"
  }
];