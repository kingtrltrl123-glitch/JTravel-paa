"use client";

import { useState } from "react";

const foodData = [
    { city: "Tokyo", dish: "Sushi", description: "Fresh seafood over vinegared rice", price: "2000-5000 yen", restaurant: "Uogashi Nihon-Ichi" },
    { city: "Tokyo", dish: "Ramen", description: "Noodle soup with pork broth", price: "800-1500 yen", restaurant: "Ichiran" },
    { city: "Osaka", dish: "Takoyaki", description: "Octopus balls with sauce", price: "500-800 yen", restaurant: "Kukuru" },
    { city: "Osaka", dish: "Okonomiyaki", description: "Savory pancake", price: "800-1500 yen", restaurant: "Chibo" },
    { city: "Kyoto", dish: "Yudofu", description: "Tofu hot pot", price: "1500-3000 yen", restaurant: "Tousuiro" },
    { city: "Kyoto", dish: "Matcha Desserts", description: "Green tea sweets", price: "600-1200 yen", restaurant: "Nakamura Tokichi" },
    { city: "Hokkaido", dish: "Soup Curry", description: "Spicy soup with vegetables", price: "1200-2000 yen", restaurant: "Garaku" },
    { city: "Hiroshima", dish: "Hiroshima Okonomiyaki", description: "Layered pancake with noodles", price: "800-1500 yen", restaurant: "Hassho" },
];

export default function FoodPage() {
    const [selectedCity, setSelectedCity] = useState("All");
    const cities = ["All", "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Hiroshima"];

    const filteredFood = selectedCity === "All" ? foodData : foodData.filter(f => f.city === selectedCity);

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "40px 20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>Food Recommendations</h1>
                <p style={{ color: "rgba(255,255,255,0.9)", textAlign: "center", marginBottom: "40px" }}>
                    Must-eat local dishes across Japan
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "30px" }}>
                    {cities.map(city => (
                        <button
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            style={{
                                padding: "10px 20px",
                                background: selectedCity === city ? "white" : "rgba(255,255,255,0.2)",
                                color: selectedCity === city ? "#667eea" : "white",
                                border: "none",
                                borderRadius: "25px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                    {filteredFood.map((item, index) => (
                        <div key={index} style={{ background: "white", borderRadius: "15px", padding: "20px" }}>
                            <h3 style={{ color: "#667eea", marginBottom: "5px" }}>{item.dish}</h3>
                            <p style={{ color: "#999", fontSize: "14px", marginBottom: "10px" }}>{item.city}</p>
                            <p style={{ color: "#333", marginBottom: "10px" }}>{item.description}</p>
                            <p style={{ fontWeight: "bold", color: "#ff6b6b" }}>{item.price}</p>
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>Restaurant: {item.restaurant}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}