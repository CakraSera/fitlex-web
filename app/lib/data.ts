import type { User, CartItem } from "./types";

export const user: User = {
  name: "John Doe",
  email: "johndoe@gmail.com",
};

export const dummyCartItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Resistance Bands Set Pro",
      price: 299000,
      description:
        "Complete resistance bands set perfect for full-body workouts in small spaces. Includes 5 resistance levels and door anchor.",
      specifications: [
        "Material: Premium latex rubber",
        "Resistance levels: 5 (10-50 lbs)",
        "Length: 48 inches",
        "Includes door anchor and handles",
        "Weight: 2 lbs",
      ],
      benefits: [
        "Full-body strength training",
        "Compact and portable",
        "Suitable for all fitness levels",
        "Joint-friendly resistance",
      ],
      imageUrls: [
        "/placeholder.svg?height=400&width=400&text=Resistance+Bands+1",
        "/placeholder.svg?height=400&width=400&text=Resistance+Bands+2",
      ],
      videos: [
        "/placeholder.svg?height=300&width=400&text=Resistance+Bands+Video",
      ],
      category: "Resistance Training",
      sku: "RB-PRO-001",
      stockQuantity: 5,
      featuredProduct: true,
      relatedPrograms: [
        "Morning Energy Boost",
        "Desk Break Stretches",
        "Full Body Strength",
      ],
      slug: "",
      primaryIndexUrl: 0,
    }, // Resistance Bands Set Pro
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
        "/placeholder.svg?height=400&width=400&text=Adjustable+Dumbbells+1",
        "/placeholder.svg?height=400&width=400&text=Adjustable+Dumbbells+2",
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
