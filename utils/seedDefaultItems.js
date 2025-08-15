const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ClothingItem = require("../models/clothingItem");
const User = require("../models/user");

const MONGO_URL = "mongodb://127.0.0.1:27017/test_db";

const defaultClothingItems = [
  {
    owner: null,
    name: "Beanie",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Beanie.png?etag=bc10497cc80fa557f036e94f9999f7b2",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Boot",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png?etag=0953a2ea59f1c6ebc832fabacdc9c70e",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Dress",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Dress.png?etag=1f9cd32a311ab139cab43494883720bf",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Hoodie",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Jeans",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png?etag=58345e8bef1ce5f95ac882e71d309e6c",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Loafers",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Loafers.png?etag=dc2d6e1ca7b297597406e35c40aef030",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Sandals",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png?etag=9bea85a77c0306586d2b71a33b626d41",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Scarf",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Scarf.png?etag=74efbee93810c926b5507e862c6cb76c",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Shorts",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png?etag=d728c496643f610de8d8fea92dd915ba",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Skirt",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Skirt.png?etag=27a6bea7e1b63218820d615876fa31d1",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Sneakers",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Sunglasses",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sunglasses.png?etag=a1bced9e331d36cb278c45df51150432",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "Sweatshirt",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweatshirt.png?etag=008a9674757bea2e0bdb31242e364be0",
    likes: [],
    isDefault: true,
  },
  {
    owner: null,
    name: "T-Shirt",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    likes: [],
    isDefault: true,
  },
  {
    name: "Beanie ",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_LyFE8AbxFga6e031BkleGyuE93O3ZP-hQ&s",
    weather: "cold",
    owner: null,
    likes: [],
    isDefault: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);

    // 1️⃣ Create or find system user
    const systemEmail = "system@example.com";
    let systemUser = await User.findOne({ email: systemEmail });

    if (!systemUser) {
      const hashedPassword = await bcrypt.hash("defaultpass123", 10);
      systemUser = await User.create({
        name: "System",
        email: systemEmail,
        password: hashedPassword,
        avatar: "https://example.com/system-avatar.png",
      });
      console.log("✅ Created system user");
    } else {
      console.log("ℹ️ System user already exists");
    }

    // 2️⃣ Clear and insert items
    await ClothingItem.deleteMany({});
    const itemsWithOwner = defaultClothingItems.map((Item) => ({
      ...Item,
      owner: systemUser._id,
    }));

    await ClothingItem.insertMany(itemsWithOwner);
    console.log(`✅ Inserted ${itemsWithOwner.length} default items.`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding default items:", err);
    process.exit(1);
  }
}

seed();
