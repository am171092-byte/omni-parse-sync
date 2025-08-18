export interface ParsedOrder {
  id: string;
  customerName: string;
  productName: string;
  productCode: string;
  quantity: number;
  price: number;
  deliveryAddress: string;
  source: string;
  confidence: number;
  json: any;
  published: boolean;
}

const companies = [
  "Acme Corp", "TechFlow Solutions", "Global Manufacturing Inc", "Precision Dynamics", 
  "Industrial Systems Ltd", "MegaTech Industries", "Advanced Components Co", "Premier Manufacturing",
  "Elite Engineering", "Strategic Solutions Inc", "Innovative Tech Corp", "Dynamic Industries",
  "MetalWorks International", "ProTech Systems", "Summit Manufacturing", "Apex Solutions",
  "Pinnacle Industries", "Superior Components", "Excellence Manufacturing", "Progressive Tech"
];

const products = [
  { name: "Industrial Widgets", code: "IW", basePrice: 29.99 },
  { name: "Premium Connectors", code: "PC", basePrice: 45.00 },
  { name: "Steel Components", code: "SC", basePrice: 125.50 },
  { name: "Precision Bearings", code: "PB", basePrice: 89.99 },
  { name: "Heavy Duty Motors", code: "HDM", basePrice: 299.99 },
  { name: "Control Valves", code: "CV", basePrice: 189.50 },
  { name: "Safety Switches", code: "SS", basePrice: 67.99 },
  { name: "Power Supplies", code: "PS", basePrice: 159.99 },
  { name: "Hydraulic Pumps", code: "HP", basePrice: 459.99 },
  { name: "Ceramic Insulators", code: "CI", basePrice: 34.50 },
  { name: "Aluminum Brackets", code: "AB", basePrice: 78.99 },
  { name: "Titanium Plates", code: "TP", basePrice: 289.99 },
  { name: "Carbon Fiber Sheets", code: "CFS", basePrice: 199.99 },
  { name: "Stainless Steel Rods", code: "SSR", basePrice: 149.50 },
  { name: "Copper Wire Assemblies", code: "CWA", basePrice: 89.99 }
];

const sources = ["Email", "WhatsApp", "Phone Call", "Web Form"];

const cities = [
  "Commerce City, CA", "Tech Valley, NY", "Manufacturing City, TX", "Industrial Park, MI",
  "Business District, FL", "Corporate Center, WA", "Enterprise Zone, IL", "Innovation Hub, CO",
  "Production Center, OH", "Assembly District, PA", "Engineering Plaza, NC", "Factory Row, GA"
];

function generateRandomOrder(index: number): ParsedOrder {
  const company = companies[Math.floor(Math.random() * companies.length)];
  const product = products[Math.floor(Math.random() * products.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const quantity = Math.floor(Math.random() * 500) + 10;
  const priceVariation = 0.8 + Math.random() * 0.4; // ±20% price variation
  const price = Math.round(product.basePrice * priceVariation * 100) / 100;
  const confidence = 0.85 + Math.random() * 0.14; // 85-99% confidence
  
  const orderId = `ORD-${String(index + 1).padStart(3, '0')}`;
  const productCode = `${product.code}-${Math.floor(Math.random() * 9000) + 1000}`;
  const streetNumber = Math.floor(Math.random() * 9999) + 1;
  const streetNames = ["Business St", "Industrial Blvd", "Commerce Ave", "Enterprise Dr", "Corporate Way"];
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const zipCode = Math.floor(Math.random() * 90000) + 10000;
  
  return {
    id: orderId,
    customerName: company,
    productName: product.name,
    productCode: productCode,
    quantity: quantity,
    price: price,
    deliveryAddress: `${streetNumber} ${streetName}, ${city} ${zipCode}`,
    source: source,
    confidence: Math.round(confidence * 100) / 100,
    published: false,
    json: {
      orderId: orderId,
      customer: {
        name: company,
        contact: source === "Email" ? `orders@${company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com` :
                source === "WhatsApp" ? `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` :
                source === "Phone Call" ? `procurement@${company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com` :
                `webform@${company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`
      },
      items: [{
        productCode: productCode,
        productName: product.name,
        quantity: quantity,
        unitPrice: price,
        totalPrice: Math.round(quantity * price * 100) / 100
      }],
      delivery: {
        address: `${streetNumber} ${streetName}, ${city} ${zipCode}`,
        requestedDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      metadata: {
        source: source.toLowerCase().replace(' ', '_'),
        confidence: Math.round(confidence * 100) / 100,
        extractedAt: new Date().toISOString()
      }
    }
  };
}

export function generateMockOrders(count: number = 50): ParsedOrder[] {
  return Array.from({ length: count }, (_, index) => generateRandomOrder(index));
}