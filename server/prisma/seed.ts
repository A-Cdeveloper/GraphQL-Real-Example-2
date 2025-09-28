import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 0. Obriši sve postojeće podatke (fresh start)
  console.log("🗑️ Clearing existing data...");
  await prisma.car.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.color.deleteMany();
  await prisma.user.deleteMany();

  // 1. Kreiraj brendove
  console.log("🏭 Creating brands...");
  const brands = await prisma.brand.createMany({
    data: [
      { brandName: "BMW", brandUrl: "https://bmw.com" },
      { brandName: "Mercedes", brandUrl: "https://mercedes-benz.com" },
      { brandName: "Audi", brandUrl: "https://audi.com" },
      { brandName: "Toyota", brandUrl: "https://toyota.com" },
      { brandName: "Honda", brandUrl: "https://honda.com" },
      { brandName: "Ford", brandUrl: "https://ford.com" },
      { brandName: "Nissan", brandUrl: "https://nissan.com" },
      { brandName: "Hyundai", brandUrl: "https://hyundai.com" },
      { brandName: "Kia", brandUrl: "https://kia.com" },
      { brandName: "Mazda", brandUrl: "https://mazda.com" },
      { brandName: "Subaru", brandUrl: "https://subaru.com" },
      { brandName: "Volvo", brandUrl: "https://volvo.com" },
      { brandName: "Lexus", brandUrl: "https://lexus.com" },
      { brandName: "Porsche", brandUrl: "https://porsche.com" },
      { brandName: "Tesla", brandUrl: "https://tesla.com" },
    ],
  });

  // 2. Kreiraj boje
  console.log("🎨 Creating colors...");
  const colors = await prisma.color.createMany({
    data: [
      { colorName: "Crna" },
      { colorName: "Bela" },
      { colorName: "Siva" },
      { colorName: "Crvena" },
      { colorName: "Plava" },
      { colorName: "Zelena" },
      { colorName: "Žuta" },
      { colorName: "Srebrna" },
      { colorName: "Zlatna" },
      { colorName: "Narandžasta" },
    ],
  });

  // 3. Uzmi ID-jeve za relacije
  const brandList = await prisma.brand.findMany();
  const colorList = await prisma.color.findMany();

  // 4. Kreiraj automobile
  console.log("🚗 Creating cars...");
  const carModels = [
    "X5",
    "X3",
    "X1",
    "3 Series",
    "5 Series",
    "7 Series",
    "C-Class",
    "E-Class",
    "S-Class",
    "GLC",
    "GLE",
    "GLS",
    "A3",
    "A4",
    "A6",
    "A8",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "Camry",
    "Corolla",
    "RAV4",
    "Highlander",
    "Prius",
    "Civic",
    "Accord",
    "CR-V",
    "Pilot",
    "Fit",
    "Focus",
    "Fiesta",
    "Mustang",
    "Explorer",
    "Escape",
    "Altima",
    "Sentra",
    "Rogue",
    "Pathfinder",
    "Murano",
    "Elantra",
    "Sonata",
    "Tucson",
    "Santa Fe",
    "Palisade",
    "Forte",
    "Optima",
    "Sorento",
    "Telluride",
    "Stinger",
    "CX-5",
    "CX-9",
    "Mazda3",
    "Mazda6",
    "MX-5",
    "Outback",
    "Forester",
    "Impreza",
    "Legacy",
    "Ascent",
    "XC40",
    "XC60",
    "XC90",
    "S60",
    "S90",
    "IS",
    "ES",
    "LS",
    "RX",
    "GX",
    "911",
    "Cayenne",
    "Macan",
    "Panamera",
    "Taycan",
    "Model S",
    "Model 3",
    "Model X",
    "Model Y",
    "Cybertruck",
  ];

  const cars = [];
  for (let i = 0; i < 50; i++) {
    const randomBrand = brandList[Math.floor(Math.random() * brandList.length)];
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    const randomModel = carModels[Math.floor(Math.random() * carModels.length)];

    cars.push({
      carName: randomModel,
      colorId: randomColor.colorId,
      brandId: randomBrand.brandId,
    });
  }

  await prisma.car.createMany({
    data: cars,
  });

  console.log("✅ Seeding completed!");
  console.log(
    `📊 Created: ${brandList.length} brands, ${colorList.length} colors, ${cars.length} cars`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
