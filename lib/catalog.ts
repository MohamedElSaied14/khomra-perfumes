// Single source of truth for products and pricing.
// The storefront renders from this list and the orders API re-prices against it,
// so a tampered client payload can never change what the customer is charged.

export type Product = { id:number; nameAr:string; nameEn:string; familyAr:string; familyEn:string; price:number; old?:number; badgeAr?:string; badgeEn?:string; color:string; note:string; image?:string };

export const products: Product[] = [
  {id:1,nameAr:"أكسينتو",nameEn:"Accento",familyAr:"صيفي · فاكهي",familyEn:"Summer · Fruity",price:700,badgeAr:"الأكثر مبيعًا",badgeEn:"Best seller",color:"#493326",note:"ACCENTO",image:"https://diamondperfumes-eg.store/cdn/shop/files/rn-image_picker_lib_temp_52f7956d-4129-49ec-a39b-981ff33b90e4.jpg?v=1771788559&width=600"},
  {id:2,nameAr:"أكوا دي جيو",nameEn:"Acqua di Gio",familyAr:"صيفي · مائي",familyEn:"Summer · Aquatic",price:500,badgeAr:"اختيار صيفي",badgeEn:"Summer pick",color:"#d8c8b0",note:"AQUA",image:"https://diamondperfumes-eg.store/cdn/shop/files/rn-image_picker_lib_temp_bad93588-74c0-4f4a-9777-530cf8f181dd.png?v=1771789128&width=600"},
  {id:3,nameAr:"فورتي نوتس",nameEn:"40 Knots",familyAr:"صيفي · بحري",familyEn:"Summer · Marine",price:800,badgeAr:"نيش",badgeEn:"Niche",color:"#8c4c53",note:"40 KNOTS",image:"https://diamondperfumes-eg.store/cdn/shop/files/rn-image_picker_lib_temp_11e52412-ae4e-4148-9a63-ff38924e2dc6.jpg?v=1771787141&width=600"},
  {id:4,nameAr:"212 في آي بي",nameEn:"212 VIP",familyAr:"شتوي · عنبري",familyEn:"Winter · Amber",price:500,color:"#6d7259",note:"212 VIP",image:"https://diamondperfumes-eg.store/cdn/shop/files/rn-image_picker_lib_temp_e8519759-29da-42ce-8b26-3435d5f1c7c1.jpg?v=1771789210&width=600"},
  {id:5,nameAr:"أمبر دور",nameEn:"Ambre D’Or",familyAr:"شتوي · عنبر وعسل",familyEn:"Winter · Amber & Honey",price:850,badgeAr:"توقيع خمرة",badgeEn:"Khomra signature",color:"#7b3f14",note:"AMBRE",image:"/products/ambre-dor.png"},
  {id:6,nameAr:"أكوا أورا",nameEn:"Aqua Aura",familyAr:"صيفي · حمضيات مائية",familyEn:"Summer · Aquatic Citrus",price:650,badgeAr:"جديد",badgeEn:"New",color:"#1686a7",note:"AQUA",image:"/products/aqua-aura.png"},
  {id:7,nameAr:"ذا كوليكشن",nameEn:"The Collection",familyAr:"باقة · ٣ عطور",familyEn:"Bundle · 3 scents",price:1200,badgeAr:"باقة هدايا",badgeEn:"Gift bundle",color:"#5a2634",note:"TRIO",image:"/products/zara-collection.png"},
  {id:8,nameAr:"أمبر إليوجن",nameEn:"Amber Illusion",familyAr:"شتوي · عنبري",familyEn:"Winter · Amber",price:780,color:"#39200f",note:"AMBER",image:"/products/amber-illusion.png"},
  {id:9,nameAr:"أورورا",nameEn:"Aurora",familyAr:"نسائي · زهري فانيليا",familyEn:"Floral · Vanilla",price:720,color:"#d5a9a3",note:"AURORA",image:"/products/aurora.png"},
  {id:10,nameAr:"رويال عود",nameEn:"Royal Oud",familyAr:"شتوي · عود مدخن",familyEn:"Winter · Smoky Oud",price:900,color:"#24150d",note:"OUD",image:"/products/royal-oud.png"},
];

export const sizes = ["3ml","30ml","55ml","110ml"] as const;
export type Size = (typeof sizes)[number];
export const defaultSize: Size = "55ml";

const sizeFactor: Record<Size, number> = {"3ml":.08,"30ml":.45,"55ml":.7,"110ml":1};

export const isSize = (value: string): value is Size => (sizes as readonly string[]).includes(value);

export const sizePrice = (product: Product, size: Size) =>
  Math.max(size === "3ml" ? 40 : 0, Math.round(product.price * sizeFactor[size] / 10) * 10);

export const productById = (id: number) => products.find(p => p.id === id);

/** Confirmation deposit: 15% of the order rounded up to the nearest 10 EGP, minimum 100 EGP. */
export const depositFor = (total: number) => Math.max(100, Math.ceil(total * .15 / 10) * 10);
