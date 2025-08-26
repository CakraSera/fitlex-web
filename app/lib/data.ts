import type { CartItem, User } from "./types";

export const dummyCartItems: CartItem[] = [
  {
    product: {
      id: "01K2B30X9RYX6D5K5880P9RN3N",
      sku: "BAL-1935",
      slug: "balance-board-pro",
      name: "Balance Board Pro",
      category: "Balance & Stability",
      description:
        "Wooden balance board for core strengthening and stability training. Great for rehabilitation too.",
      stockQuantity: 0,
      price: 249000,
      featuredProduct: false,
      imageUrls: [
        "https://ucarecdn.com/dcc9896c-67ab-41eb-b0f6-c4c5677d4edf/-/preview/500x500/",
        "/placeholder.svg?height=400&width=400&text=Balance+Board+2",
      ],
      primaryIndexUrl: 0,
      specifications: [
        "Material: Birch plywood",
        "Diameter: 16 inches",
        "Height: 3 inches",
        "Weight capacity: 300 lbs",
        "Non-slip surface",
      ],
      benefits: [
        "Improves balance and coordination",
        "Strengthens core muscles",
        "Enhances proprioception",
        "Injury prevention",
      ],
    },
    quantity: 2,
  },
  {
    product: {
      id: "2",
      name: "Adjustable Dumbbells Compact",
      price: 899000,
      description:
        "Space-saving adjustable dumbbells that replace an entire weight set. Perfect for apartment workouts.",
      specifications: [
        "Weight range: 5-25 lbs per dumbbell",
        "Material: Cast iron with rubber coating",
        'Dimensions: 14" x 6" x 6"',
        "Quick-adjust mechanism",
        "Total weight: 50 lbs",
      ],
      benefits: [
        "Replaces multiple dumbbells",
        "Quick weight adjustment",
        "Compact storage",
        "Durable construction",
      ],
      imageUrls: [
        "https://ucarecdn.com/8661c810-105d-4292-81a4-6eb48a6b43be/-/preview/1000x1000/",
        "https://ucarecdn.com/8661c810-105d-4292-81a4-6eb48a6b43be/-/preview/1000x666/",
      ],
      videos: ["/placeholder.svg?height=300&width=400&text=Dumbbells+Video"],
      category: "Free Weights",
      sku: "AD-COMP-002",
      stockQuantity: 5,
      featuredProduct: true,
      relatedPrograms: ["Upper Body Power", "Core Strength", "HIIT Workouts"],
      slug: "",
      primaryIndexUrl: 0,
    }, // Adjustable Dumbbells Compact
    quantity: 1,
  },
];

export const user: User = {
  fullName: "Rakhel Cakra Kusumadinata Sera",
  email: "rakhel.sera@gmail.com",
};

type NavigationType = {
  to: string;
  title: string;
};
export const NavigationLink: NavigationType[] = [
  {
    to: "/home",
    title: "Home",
  },
  {
    to: "/products",
    title: "Products",
  },
];
