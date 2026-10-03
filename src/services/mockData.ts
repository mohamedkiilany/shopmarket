import type { Product, StockStatus } from '@/types';

interface Seed {
  title: string;
  brand: string;
  category: string;
  price: number;
  original?: number;
  rating: number;
  reviews: number;
  stock: StockStatus;
  img: number;
  desc: string;
  colors?: string[];
  tags?: string[];
  featured?: boolean;
  specs: Record<string, string>;
}

const seeds: Seed[] = [
  { title: 'Nova X12 Smartphone 256GB', brand: 'Nova', category: 'phones', price: 699, original: 799, rating: 4.7, reviews: 1284, stock: 'IN_STOCK', img: 1, desc: '6.4-inch OLED display with a 50MP dual camera.', colors: ['#191C1F', '#1B6392', '#E4E7E9'], tags: ['5G', 'OLED'], featured: true, specs: { Display: '6.4" OLED, 120Hz', Storage: '256GB', Battery: '4,800 mAh', Camera: '50MP + 12MP' } },
  { title: 'Volt Mini 5G Smartphone 128GB', brand: 'Volt', category: 'phones', price: 349, rating: 4.3, reviews: 640, stock: 'IN_STOCK', img: 6, desc: 'Compact phone with all-day battery life.', colors: ['#191C1F', '#FA8232'], tags: ['5G'], specs: { Display: '5.8" LCD, 90Hz', Storage: '128GB', Battery: '4,200 mAh', Camera: '48MP' } },
  { title: 'Axiom Book Pro 14" Laptop', brand: 'Axiom', category: 'laptops', price: 1299, original: 1499, rating: 4.8, reviews: 932, stock: 'IN_STOCK', img: 2, desc: 'Thin and light with a 14-inch 2.8K display.', colors: ['#5F6C72', '#E4E7E9'], tags: ['16GB RAM', 'SSD'], featured: true, specs: { Processor: '8-core, 3.4GHz', Memory: '16GB', Storage: '512GB SSD', Display: '14" 2.8K' } },
  { title: 'Kestrel Air 13 Ultrabook', brand: 'Kestrel', category: 'laptops', price: 899, rating: 4.4, reviews: 511, stock: 'LOW_STOCK', img: 7, desc: 'Fanless design that stays silent under load.', colors: ['#5F6C72'], tags: ['Fanless'], specs: { Processor: '6-core, 3.0GHz', Memory: '8GB', Storage: '256GB SSD', Display: '13.3" FHD' } },
  { title: 'Lumen Z7 Mirrorless Camera', brand: 'Lumen', category: 'cameras', price: 1099, original: 1249, rating: 4.9, reviews: 377, stock: 'IN_STOCK', img: 3, desc: '24MP full-frame sensor with in-body stabilization.', colors: ['#191C1F'], tags: ['4K video'], featured: true, specs: { Sensor: '24MP full-frame', Video: '4K 60fps', Stabilization: '5-axis IBIS', Mount: 'L-mount' } },
  { title: 'Orbit Action Cam 4K', brand: 'Orbit', category: 'cameras', price: 249, rating: 4.2, reviews: 802, stock: 'IN_STOCK', img: 8, desc: 'Waterproof to 10m with horizon-lock stabilization.', colors: ['#191C1F', '#FA8232'], tags: ['Waterproof'], specs: { Video: '4K 60fps', Waterproof: '10m', Battery: '1,720 mAh', Screen: '2" touch' } },
  { title: 'Nova Studio Wireless Headphones', brand: 'Nova', category: 'headphones', price: 279, original: 349, rating: 4.6, reviews: 2210, stock: 'IN_STOCK', img: 4, desc: 'Active noise cancelling with 40 hours of playback.', colors: ['#191C1F', '#E4E7E9', '#1B6392'], tags: ['ANC', 'Bluetooth'], featured: true, specs: { Type: 'Over-ear', Battery: '40 hours', Connectivity: 'Bluetooth 5.3', Weight: '254g' } },
  { title: 'Volt Buds Pro True Wireless', brand: 'Volt', category: 'headphones', price: 129, rating: 4.1, reviews: 1543, stock: 'IN_STOCK', img: 6, desc: 'Pocket-sized earbuds with a wireless charging case.', colors: ['#191C1F', '#E4E7E9'], tags: ['Bluetooth'], specs: { Type: 'In-ear', Battery: '8h + 24h case', Connectivity: 'Bluetooth 5.2', Water: 'IPX4' } },
  { title: 'Kestrel Pulse Gaming Console', brand: 'Kestrel', category: 'gaming', price: 499, rating: 4.7, reviews: 3120, stock: 'LOW_STOCK', img: 5, desc: '4K gaming at up to 120fps with a fast SSD.', colors: ['#191C1F', '#E4E7E9'], tags: ['4K', '120fps'], featured: true, specs: { Resolution: '4K', Storage: '1TB SSD', 'Frame rate': 'Up to 120fps', Controllers: '1 included' } },
  { title: 'Axiom Rapid Wireless Gamepad', brand: 'Axiom', category: 'gaming', price: 59, rating: 4.0, reviews: 489, stock: 'IN_STOCK', img: 5, desc: 'Hall-effect sticks and programmable back buttons.', colors: ['#191C1F', '#E74C3C'], tags: ['Wireless'], specs: { Connectivity: '2.4GHz / Bluetooth', Battery: '30 hours', Sticks: 'Hall-effect', Buttons: '2 back paddles' } },
  { title: 'Orbit Smart Watch S3', brand: 'Orbit', category: 'accessories', price: 199, original: 229, rating: 4.4, reviews: 976, stock: 'IN_STOCK', img: 8, desc: 'Heart-rate, GPS and 7-day battery life.', colors: ['#191C1F', '#FA8232', '#E4E7E9'], tags: ['GPS'], specs: { Display: '1.4" AMOLED', Battery: '7 days', Sensors: 'HR, SpO2, GPS', Water: '5 ATM' } },
  { title: 'Lumen 65W GaN Fast Charger', brand: 'Lumen', category: 'accessories', price: 39, rating: 4.5, reviews: 2650, stock: 'IN_STOCK', img: 1, desc: 'Charges a laptop and phone at the same time.', colors: ['#191C1F', '#E4E7E9'], tags: ['USB-C'], specs: { Output: '65W', Ports: '2x USB-C, 1x USB-A', Input: '100-240V', Weight: '112g' } },
  { title: 'Nova Slim Power Bank 20,000mAh', brand: 'Nova', category: 'accessories', price: 49, rating: 4.3, reviews: 1180, stock: 'OUT_OF_STOCK', img: 6, desc: 'Charges two devices at once over USB-C.', colors: ['#191C1F'], tags: ['USB-C'], specs: { Capacity: '20,000 mAh', Output: '45W', Ports: '2x USB-C, 1x USB-A', Weight: '350g' } },
  { title: 'Volt Gaming Laptop 15.6" RTX', brand: 'Volt', category: 'laptops', price: 1599, original: 1799, rating: 4.6, reviews: 428, stock: 'IN_STOCK', img: 7, desc: 'High-refresh display and a dedicated GPU.', colors: ['#191C1F'], tags: ['144Hz', 'GPU'], specs: { Processor: '8-core, 4.4GHz', Memory: '32GB', Storage: '1TB SSD', Display: '15.6" 144Hz' } },
  { title: 'Axiom Studio Monitor Headphones', brand: 'Axiom', category: 'headphones', price: 89, rating: 4.2, reviews: 305, stock: 'IN_STOCK', img: 4, desc: 'Flat response for mixing and editing, wired.', colors: ['#191C1F'], tags: ['Wired'], specs: { Type: 'Over-ear', Impedance: '38 ohm', Cable: '3m detachable', Weight: '285g' } },
  { title: 'Lumen Instant Print Camera', brand: 'Lumen', category: 'cameras', price: 119, rating: 3.9, reviews: 214, stock: 'IN_STOCK', img: 3, desc: 'Prints a photo in under 15 seconds.', colors: ['#E4E7E9', '#FA8232'], tags: ['Instant'], specs: { Sensor: '12MP', Print: '2x3 inch', Battery: '800 mAh', Selfie: 'Mirror + timer' } },
];

export const products: Product[] = seeds.map((s, i) => {
  const id = String(i + 1);
  const discount = s.original
    ? Math.round(((s.original - s.price) / s.original) * 100)
    : undefined;
  const image = `/assets/products/p${s.img}.svg`;
  const alt1 = `/assets/products/p${((s.img + 1) % 8) + 1}.svg`;
  const alt2 = `/assets/products/p${((s.img + 3) % 8) + 1}.svg`;
  return {
    id,
    title: s.title,
    slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    brand: s.brand,
    category: s.category,
    price: s.price,
    originalPrice: s.original,
    discountBadgePercentage: discount,
    rating: s.rating,
    reviewCount: s.reviews,
    sku: `CLC-${String(1000 + i)}`,
    stockStatus: s.stock,
    images: [image, alt1, alt2],
    thumbnail: image,
    shortDescription: s.desc,
    fullDescription: `${s.desc} Built for everyday use, covered by a 12-month warranty and free returns within 30 days.`,
    specifications: s.specs,
    colors: s.colors,
    tags: s.tags,
    isFeatured: s.featured,
  };
});
