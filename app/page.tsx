"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [destination, setDestination] = useState("");

    const popularCities = [
        { name: "Tokyo", slug: "tokyo", description: "Modern metropolis with ancient temples", image: "🗼" },
        { name: "Osaka", slug: "osaka", description: "Street food and entertainment capital", image: "🏯" },
        { name: "Kyoto", slug: "kyoto", description: "Traditional culture and temples", image: "⛩️" },
        { name: "Hokkaido", slug: "hokkaido", description: "Snow festival and nature", image: "❄️" },
        { name: "Okinawa", slug: "okinawa", description: "Tropical beaches and unique culture", image: "🏖️" },
        { name: "Hiroshima", slug: "hiroshima", description: "Peace memorial and oysters", image: "🕊️" },
    ];

    const handleSearch = () => {
        if (destination) {
            window.location.href = `/city/${destination.toLowerCase()}`;
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>

                {/* Header */}
                <div style={{ textAlign: "center", color: "white", marginBottom: "60px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ fontSize: "60px", display: "block", marginBottom: "10px" }}>🗾</span>
                        <h1 style={{
                            fontSize: "3.5rem",
                            fontWeight: "800",
                            background: "linear-gradient(135deg, #fff, #ffe0b5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "10px",
                            letterSpacing: "-0.02em"
                        }}>
                            JTravel
                        </h1>
                        <p style={{
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.9)",
                            letterSpacing: "0.5px"
                        }}>
                            by student developer
                        </p>
                    </div>

                    {/* Search Box */}
                    <div style={{ display: "flex", maxWidth: "550px", margin: "30px auto 0", gap: "12px" }}>
                        <input
                            type="text"
                            placeholder="Search a city... (Tokyo, Osaka, Kyoto)"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            style={{
                                flex: 1,
                                padding: "16px 20px",
                                borderRadius: "50px",
                                border: "none",
                                fontSize: "16px",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                outline: "none"
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: "16px 32px",
                                background: "#ff6b6b",
                                color: "white",
                                border: "none",
                                borderRadius: "50px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "16px",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                transition: "all 0.3s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#ff5252";
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#ff6b6b";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            🔍 Search
                        </button>
                    </div>
                </div>

                {/* Popular Cities */}
                <h2 style={{ color: "white", textAlign: "center", marginBottom: "40px", fontSize: "1.8rem", fontWeight: "600" }}>
                    [5/22/2026 11:36 PM] Zaw Linn Naing: ✨ Popular Destinations
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
                    {popularCities.map((city) => (
                        <Link href={`/city/${city.slug}`} key={city.slug} style={{ textDecoration: "none" }}>
                            <div style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "30px 20px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                                }}>
                                <div style={{ fontSize: "48px", marginBottom: "15px" }}>{city.image}</div>
                                <h3 style={{ color: "#333", marginBottom: "10px", fontSize: "1.5rem" }}>{city.name}</h3>
                                <p style={{ color: "#666", marginBottom: "15px" }}>{city.description}</p>
                                <span style={{ display: "inline-block", color: "#667eea", fontWeight: "bold" }}>Explore →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Links - Train & Food */}
                <div style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                    <Link href="/train" style={{ textDecoration: "none" }}>
                        <div style={{
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            padding: "25px",
                            textAlign: "center",
                            color: "white",
                            transition: "all 0.3s",
                            border: "1px solid rgba(255,255,255,0.2)"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}>
                            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🚆</div>
                            <h3>Train Crowdedness</h3>
                            <p style={{ opacity: 0.9, marginTop: "8px" }}>Know before you ride • Avoid rush hour</p>
                        </div>
                    </Link>
                    <Link href="/food" style={{ textDecoration: "none" }}>
                        <div style={{
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "20px",
                            padding: "25px",
                            textAlign: "center",
                            color: "white",
                            transition: "all 0.3s",
                            border: "1px solid rgba(255,255,255,0.2)"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}>
                            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🍜</div>
                            <h3>Food Recommendations</h3>
                            <p style={{ opacity: 0.9, marginTop: "8px" }}>Must-eat local dishes • Restaurant tips</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}