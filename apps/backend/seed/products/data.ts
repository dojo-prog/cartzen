interface MockProduct {
  name: string;
  subcategory_name: string;
  description: string;
  price_cents: number;
  weight_grams: number;
  initial_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  thumbnail_url?: string;
}

const mockProducts: MockProduct[] = [
  // Fresh Produce
  {
    name: "Premium Red Apples",
    subcategory_name: "Fruits",
    description: "Crisp and sweet red apples, perfect for snacking or baking.",
    price_cents: 18900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Carrots",
    subcategory_name: "Root Vegetables",
    description:
      "Fresh and crunchy carrots suitable for salads, soups, and cooking.",
    price_cents: 7900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1639427444459-85a1b6ac2d68?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Spinach",
    subcategory_name: "Leafy Greens",
    description:
      "Tender fresh spinach leaves packed with nutrients and flavor.",
    price_cents: 6500,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Button Mushrooms",
    subcategory_name: "Mushrooms",
    description: "Fresh button mushrooms with a mild earthy flavor.",
    price_cents: 14900,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1552825897-bb5efa86eab1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Meat & Poultry
  {
    name: "Premium Beef Sirloin",
    subcategory_name: "Beef",
    description:
      "Tender beef sirloin cuts ideal for grilling, frying, or roasting.",
    price_cents: 69900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1690983323540-d6e889c4b107?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pork Liempo",
    subcategory_name: "Pork",
    description: "Fresh pork belly with a balanced layer of meat and fat.",
    price_cents: 45900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1623047437095-27418540c288?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Chicken Breast",
    subcategory_name: "Chicken",
    description:
      "Boneless and skinless chicken breast suitable for everyday meals.",
    price_cents: 32900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Beef Hotdog",
    subcategory_name: "Processed Meat",
    description:
      "Juicy beef hotdogs that are perfect for breakfast and quick meals.",
    price_cents: 15900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1624772398066-98584aa2f214?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Seafood
  {
    name: "Fresh Bangus",
    subcategory_name: "Fresh Fish",
    description: "Fresh milkfish cleaned and prepared for convenient cooking.",
    price_cents: 29900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1672056777346-ec237198f34b?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Shrimp",
    subcategory_name: "Shellfish",
    description:
      "Fresh medium-sized shrimp perfect for grilling, frying, or pasta.",
    price_cents: 54900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1504309250229-4f08315f3b5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Frozen Salmon Fillet",
    subcategory_name: "Frozen Seafood",
    description: "Individually packed frozen salmon fillets with rich flavor.",
    price_cents: 79900,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Dairy & Eggs
  {
    name: "Fresh Whole Milk",
    subcategory_name: "Milk",
    description: "Creamy whole milk with a rich and smooth taste.",
    price_cents: 11900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cheddar Cheese Block",
    subcategory_name: "Cheese",
    description:
      "Mild cheddar cheese with a smooth texture for sandwiches and cooking.",
    price_cents: 21900,
    weight_grams: 200,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Plain Greek Yogurt",
    subcategory_name: "Yogurt",
    description:
      "Thick and creamy plain Greek yogurt with a naturally tangy flavor.",
    price_cents: 16900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Premium Brown Eggs",
    subcategory_name: "Eggs",
    description: "Farm-fresh brown eggs suitable for breakfast and baking.",
    price_cents: 12900,
    weight_grams: 600,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1043&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Bakery
  {
    name: "Classic White Bread",
    subcategory_name: "Bread",
    description: "Soft sliced white bread perfect for sandwiches and toast.",
    price_cents: 8900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1598373182308-3270495d2f58?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Butter Croissant",
    subcategory_name: "Pastries",
    description: "Flaky golden croissant made with rich butter.",
    price_cents: 7900,
    weight_grams: 80,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chocolate Fudge Cake",
    subcategory_name: "Cakes",
    description: "Moist chocolate cake topped with smooth chocolate frosting.",
    price_cents: 59900,
    weight_grams: 800,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1586985289906-406988974504?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Canned & Packaged Foods
  {
    name: "Premium Canned Corned Beef",
    subcategory_name: "Canned Meat",
    description: "Savory canned corned beef that's quick and easy to prepare.",
    price_cents: 9990,
    weight_grams: 175,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1738618140037-09e11c8e644a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Canned Tuna Flakes",
    subcategory_name: "Canned Fish",
    description:
      "Tender tuna flakes packed in oil for quick and convenient meals.",
    price_cents: 8900,
    weight_grams: 180,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1738618140037-09e11c8e644a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Instant Chicken Noodles",
    subcategory_name: "Instant Meals",
    description: "Quick-cooking chicken-flavored noodles for an easy meal.",
    price_cents: 1590,
    weight_grams: 60,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1684011716915-e533f2cff14f?q=80&w=1237&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Macaroni Pasta Pack",
    subcategory_name: "Packaged Foods",
    description:
      "Durable dried macaroni pasta suitable for soups and baked dishes.",
    price_cents: 8900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1590060846796-0418842f3908?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Rice, Grains & Pasta
  {
    name: "Premium Jasmine Rice",
    subcategory_name: "Rice",
    description:
      "Fragrant long-grain jasmine rice with a soft and fluffy texture.",
    price_cents: 32900,
    weight_grams: 5000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Spaghetti Pasta",
    subcategory_name: "Pasta",
    description:
      "Classic dried spaghetti pasta ideal for everyday pasta dishes.",
    price_cents: 10900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1612966893103-790e549a2ab1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Instant Ramen Noodles",
    subcategory_name: "Noodles",
    description:
      "Springy noodles that cook quickly and pair well with soups and sauces.",
    price_cents: 6900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1684011716915-e533f2cff14f?q=80&w=1237&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rolled Oats",
    subcategory_name: "Grains",
    description:
      "Whole grain rolled oats perfect for breakfast bowls and baking.",
    price_cents: 14900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1614373532018-92a75430a0da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Snacks
  {
    name: "Original Potato Chips",
    subcategory_name: "Chips",
    description:
      "Crispy golden potato chips with a classic lightly salted flavor.",
    price_cents: 9900,
    weight_grams: 150,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Butter Biscuits",
    subcategory_name: "Biscuits",
    description:
      "Crunchy buttery biscuits that pair perfectly with coffee or tea.",
    price_cents: 7900,
    weight_grams: 200,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1577259261938-d3748e69b9aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Milk Chocolate Bar",
    subcategory_name: "Chocolate",
    description: "Smooth and creamy milk chocolate bar for a sweet treat.",
    price_cents: 8900,
    weight_grams: 100,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1627647227768-705244233b56?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Assorted Fruit Candies",
    subcategory_name: "Candy",
    description:
      "A colorful assortment of individually wrapped fruit-flavored candies.",
    price_cents: 5900,
    weight_grams: 150,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1666274694243-9997eb427237?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Beverages
  {
    name: "Cola Soft Drink",
    subcategory_name: "Soft Drinks",
    description:
      "Refreshing carbonated cola drink with a classic sweet flavor.",
    price_cents: 6900,
    weight_grams: 1500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Orange Juice",
    subcategory_name: "Juices",
    description:
      "Refreshing orange juice with a naturally sweet and citrusy flavor.",
    price_cents: 12900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Purified Drinking Water",
    subcategory_name: "Water",
    description: "Clean and refreshing purified drinking water.",
    price_cents: 3500,
    weight_grams: 1500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1548780607-46c78f38182d?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Electrolyte Sports Drink",
    subcategory_name: "Sports & Energy Drinks",
    description:
      "Refreshing electrolyte drink designed to help replenish fluids after activity.",
    price_cents: 8900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1741520504670-fe79bf6c476f?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Coffee & Tea
  {
    name: "Premium Ground Coffee",
    subcategory_name: "Coffee",
    description:
      "Rich roasted ground coffee with a smooth aroma and bold flavor.",
    price_cents: 24900,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: true,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Earl Grey Tea Bags",
    subcategory_name: "Tea",
    description: "Aromatic black tea infused with fragrant bergamot flavor.",
    price_cents: 17900,
    weight_grams: 40,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Creamy Hot Chocolate Mix",
    subcategory_name: "Hot Chocolate",
    description: "Rich chocolate drink mix for a warm and comforting beverage.",
    price_cents: 15900,
    weight_grams: 300,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1637572815755-c4b80092dce1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Condiments & Sauces
  {
    name: "Classic Tomato Ketchup",
    subcategory_name: "Ketchup",
    description: "Rich tomato ketchup with a balanced sweet and tangy flavor.",
    price_cents: 9900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1611100369029-c0d5ddb80a51?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Creamy Mayonnaise",
    subcategory_name: "Mayonnaise",
    description:
      "Smooth and creamy mayonnaise perfect for sandwiches and salads.",
    price_cents: 14900,
    weight_grams: 470,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Premium Soy Sauce",
    subcategory_name: "Soy Sauce",
    description:
      "Savory soy sauce that adds depth and umami to everyday dishes.",
    price_cents: 7900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1582581720432-de83a98176ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cane Vinegar",
    subcategory_name: "Vinegar",
    description:
      "Mild cane vinegar suitable for marinades, dipping sauces, and cooking.",
    price_cents: 5900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1623870605527-fe47e6b24193?q=80&w=642&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Cooking Essentials
  {
    name: "Premium Cooking Oil",
    subcategory_name: "Cooking Oil",
    description:
      "Light and versatile cooking oil suitable for frying and everyday cooking.",
    price_cents: 19900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fine Iodized Salt",
    subcategory_name: "Salt & Sugar",
    description: "Fine iodized salt for seasoning and everyday cooking.",
    price_cents: 3900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1630501439385-a55dada3f46b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "All-Purpose Flour",
    subcategory_name: "Flour",
    description: "Versatile all-purpose flour suitable for baking and cooking.",
    price_cents: 8900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ground Black Pepper",
    subcategory_name: "Spices",
    description:
      "Aromatic ground black pepper for seasoning meat, vegetables, and soups.",
    price_cents: 9900,
    weight_grams: 100,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1660728684136-0cdf1a0c2e02?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Frozen Foods
  {
    name: "Frozen Mixed Vegetables",
    subcategory_name: "Frozen Vegetables",
    description:
      "Convenient frozen mix of carrots, peas, corn, and green beans.",
    price_cents: 12900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1651383140368-9b3ee59c2981?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Frozen Chicken Nuggets",
    subcategory_name: "Frozen Meat",
    description:
      "Crispy breaded chicken nuggets that are easy to prepare at home.",
    price_cents: 22900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1651383140368-9b3ee59c2981?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Vanilla Ice Cream",
    subcategory_name: "Ice Cream",
    description: "Smooth and creamy vanilla ice cream with a classic flavor.",
    price_cents: 29900,
    weight_grams: 1000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Frozen Beef Lasagna",
    subcategory_name: "Frozen Meals",
    description:
      "Convenient frozen lasagna layered with pasta, beef, tomato sauce, and cheese.",
    price_cents: 24900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1713802611143-d14c927e2217?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Breakfast Foods
  {
    name: "Honey Corn Flakes",
    subcategory_name: "Cereal",
    description: "Crunchy corn flakes lightly coated with sweet honey flavor.",
    price_cents: 19900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1506368197720-c242fdaa44dc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Instant Oatmeal",
    subcategory_name: "Oatmeal",
    description: "Quick-cooking oatmeal that's convenient for busy mornings.",
    price_cents: 13900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1586810504230-09dab6b8e01b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Creamy Peanut Butter",
    subcategory_name: "Spreads",
    description:
      "Smooth creamy peanut butter perfect for toast, sandwiches, and snacks.",
    price_cents: 17900,
    weight_grams: 340,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1615110250484-e8c3b151b957?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Personal Care
  {
    name: "Daily Moisture Shampoo",
    subcategory_name: "Shampoo & Conditioner",
    description:
      "Gentle shampoo formulated for everyday cleansing and soft hair.",
    price_cents: 19900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Moisturizing Body Wash",
    subcategory_name: "Soap & Body Wash",
    description:
      "Gentle body wash that cleanses while helping maintain skin moisture.",
    price_cents: 15900,
    weight_grams: 400,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1669212408959-fdde3b2ed6a2?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mint Toothpaste",
    subcategory_name: "Oral Care",
    description: "Refreshing mint toothpaste for everyday oral hygiene.",
    price_cents: 8900,
    weight_grams: 150,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1648729800687-7316ea086e8f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fresh Deodorant Roll-On",
    subcategory_name: "Deodorants",
    description:
      "Long-lasting roll-on deodorant with a clean and refreshing scent.",
    price_cents: 10900,
    weight_grams: 50,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1728487893915-84f66d01fcfb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Household Essentials
  {
    name: "Premium Toilet Tissue",
    subcategory_name: "Paper Products",
    description: "Soft and absorbent toilet tissue for everyday household use.",
    price_cents: 19900,
    weight_grams: 700,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1583496597467-d968d2fa33a8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Stackable Storage Container",
    subcategory_name: "Storage & Organization",
    description:
      "Durable plastic storage container for organizing household items.",
    price_cents: 24900,
    weight_grams: 300,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1665667111473-fcca0e8ea4f0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Non-Stick Frying Pan",
    subcategory_name: "Kitchen Essentials",
    description: "Durable non-stick frying pan suitable for everyday cooking.",
    price_cents: 59900,
    weight_grams: 900,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1653806347022-d40d152ca3a4?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Cleaning Supplies
  {
    name: "Liquid Laundry Detergent",
    subcategory_name: "Laundry Detergent",
    description:
      "Powerful liquid detergent designed to remove everyday stains and odors.",
    price_cents: 24900,
    weight_grams: 1500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1624372635310-01d078c05dd9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dishwashing Liquid",
    subcategory_name: "Dishwashing",
    description:
      "Concentrated dishwashing liquid that cuts through grease and food residue.",
    price_cents: 9900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1643107303813-077f2061cec1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Multi-Surface Cleaner",
    subcategory_name: "Surface Cleaners",
    description: "Versatile cleaner for everyday household surfaces.",
    price_cents: 12900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?q=80&w=1312&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Household Disinfectant",
    subcategory_name: "Disinfectants",
    description:
      "Multi-purpose disinfectant for cleaning and sanitizing household surfaces.",
    price_cents: 15900,
    weight_grams: 500,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Baby Care
  {
    name: "Baby Diapers Medium",
    subcategory_name: "Diapers",
    description:
      "Soft and absorbent diapers designed to keep babies comfortable and dry.",
    price_cents: 39900,
    weight_grams: 900,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1584839404042-8bc21d240e91?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Baby Rice Cereal",
    subcategory_name: "Baby Food",
    description:
      "Gentle rice cereal suitable as an introductory solid food for babies.",
    price_cents: 18900,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1521483451569-e33803c0330c?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gentle Baby Shampoo",
    subcategory_name: "Baby Hygiene",
    description: "Mild baby shampoo designed for gentle everyday cleansing.",
    price_cents: 15900,
    weight_grams: 200,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1738892248232-a5fd26a98ec4?q=80&w=742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Pet Supplies
  {
    name: "Premium Chicken Dog Food",
    subcategory_name: "Dog Food",
    description:
      "Complete dry dog food with chicken flavor for everyday nutrition.",
    price_cents: 34900,
    weight_grams: 2000,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1682536192307-c25211b1d4ac?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tuna Cat Food",
    subcategory_name: "Cat Food",
    description:
      "Moist cat food with tuna flavor formulated for everyday feeding.",
    price_cents: 7900,
    weight_grams: 85,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1655210913315-e8147faf7600?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Crunchy Dog Treats",
    subcategory_name: "Pet Treats",
    description:
      "Crunchy bite-sized treats suitable for rewarding dogs during training.",
    price_cents: 12900,
    weight_grams: 200,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1592468257342-8375cb556a69?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pet Grooming Shampoo",
    subcategory_name: "Pet Care",
    description:
      "Gentle pet shampoo designed to clean fur while leaving it soft and fresh.",
    price_cents: 19900,
    weight_grams: 250,
    initial_quantity: Math.floor(Math.random() * 100) + 1,
    is_featured: false,
    is_active: true,
    thumbnail_url:
      "https://images.unsplash.com/photo-1669281392832-9181a2b484af?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default mockProducts;
