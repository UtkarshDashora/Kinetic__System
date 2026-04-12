import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://we-chat-app-e96ad-default-rtdb.firebaseio.com"
});

const db = admin.database();
const app = express();

app.use(cors());
app.use(express.json());

// Tactical Data (Source of Truth)
const initialTacticalData = {
  alerts: {
    current: {
      title: "CROWD ALERT: GATE 4A CONGESTION",
      description: "High traffic detected at North Entrance. We recommend using Gate 2B for faster entry.",
      wait: 14,
      severity: "secondary",
      icon: "warning"
    }
  },
  countdown: {
    kickOffTimeUnix: 1776437800000, 
    minutesRem: 42,
    secondsRem: 18
  },
  schedule: [
    { id: 1, date: "14", month: "OCT", fixture: "VELOCITY VS DRAGONS", status: "PLAYOFF QUARTER-FINALS", time: "19:30", active: true },
    { id: 2, date: "21", month: "OCT", fixture: "STORM VS TITANS", status: "REGULAR SEASON", time: "20:00", active: false },
    { id: 3, date: "28", month: "OCT", fixture: "VELOCITY VS RAIDERS", status: "SEASON FINALE", time: "18:00", active: true }
  ],
  crowd: {
    sensors: [
      { id: "s1", x: 400, y: 300, icon: "fastfood", label: "GRID IRON GRILL", sublabel: "Busy • 12m wait", color: "bg-secondary" },
      { id: "s2", x: 600, y: 220, icon: "wc", label: "RESTROOM C", sublabel: "Clear • No wait", color: "bg-primary" }
    ],
    hotspots: [
      { id: "h1", x: "25%", y: "33%", size: "w-32 h-32", color: "bg-error/40" },
      { id: "h2", x: "75%", y: "75%", size: "w-48 h-48", color: "bg-secondary/30" }
    ]
  },
  concessions: {
    featured: {
        id: "neon-burger",
        name: "NEON BURGER CO.",
        wait: 5,
        desc: "The stadium's signature charcoal-bun burgers with electric-blue garlic aioli."
    },
    vendors: [
        { id: "apex", name: "APEX PIZZA", wait: "12 MIN", color: "text-tertiary", icon: "local_pizza", desc: "Stone-fired thin crust with volcanic spicy pepperoni." },
        { id: "velocity", name: "VELOCITY BREWS", wait: "2 MIN", color: "text-primary", icon: "liquor", desc: "Craft beers and artisanal nitrogen-infused refreshments." },
        { id: "zero", name: "ZERO DEGREE", wait: "25 MIN", color: "text-secondary", icon: "icecream", desc: "Liquid nitrogen flash-frozen treats and dairy-free peaks." }
    ]
  },
  squad: [
    { id: "marcus", name: "MARCUS_FLYNN", location: "SECTION 102 • ROW 12", x: "35%", y: "65%", color: "secondary", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM2paBR8rsi9OTiWX-D_k6MDdxNUq6uKA2REonfK8LJbnsEKBLNw-jnum5tCHrveU1JIhUtzg4fXynjrUSID3Woy6OY0Q4ehcbyhb45fzbOuEOAVqiTeXYbjCcsRkzMefpioLtwjfOLsda5bhOdTvwQSuW9gRqOqz0eARGvZsxYtBzpKCbeETdEBT9LyD5yz7TbuoC7kXp7W3eUuMnz09KmDl0wg3j9RBi5lbxwGs9b5bt6Azf6TJVLFSPsd4NSKApMNazP6Ke1w" },
    { id: "sarah", name: "SARAH_JONES", location: "CONCOURSE B • MERCH", x: "60%", y: "30%", color: "primary", active: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt4-THs_Gh6WhBUq1qOnYK6Din2kAXyAIX1JhXre8_Pk_m-TWg24m3mEYRSpPtquHPjlZI_b1hzKgi3G5Q9_OHG9MzQwq2V9haG_AZe8tXbq904yG42Q3tVw3bj75Nm0QGm6QSeDSb-Q0v8EC2nX7reQVEBDgqv5snaViWuRczLaOWyK_99D-9cI55Y9Btt4grM1g5h-39TiZD2mNujjiHOyZ86ofb7M7Nc2PHsOFkKndOp-XEgB_kXvHTulbZZ9kbibUyt_8GTg" },
    { id: "devron", name: "DEVRON_77", location: "GATE 4A • ENTRY", x: "20%", y: "40%", color: "secondary", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIj50wg8BU3Xp5Txr388t6bimo7gb9tTCYzySLXpW1pd1IGHW8sVq8ZFGX8Hkgh1v4QmCWECOH_gZHhCLOprg4FWtYMxXnwyujRjtFN9O4jDn4mZ5kYJObol7XVhTPbuWTgs6BcQuGn4b4mzu4KpkGcTP92W7Q4XU1ylZR2O25_Ig7dWthGkVXYwVWJBsjFZMgZaNEjHWIcNFTqomkl7D_gndqrgCx6T_TffyG_CCqllJ6GaxSf1yOv0U2XGSy_joAyfbnB0OAFA" }
  ]
};

// Seeding Endpoint
app.post('/api/seed', async (req, res) => {
  try {
    const stadiumRef = db.ref('stadium_vitals');
    await stadiumRef.set(initialTacticalData);
    console.log("Tactical Database seeded successfully!");
    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Kinetic Stadium Backend running on port ${PORT}`);
});
