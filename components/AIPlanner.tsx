"use client";

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

export default function AIPlanner() {
    const { language } = useLanguage();
    const [destination, setDestination] = useState("Tokyo");
    const [days, setDays] = useState(3);
    const [budget, setBudget] = useState("mid-range");
    const [style, setStyle] = useState("solo");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generatePlan = async () => {
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const res = await fetch("/api/plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destination, days, budget, travelStyle: style, language }),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError("Failed to generate plan. Please try again.");
        }
        setLoading(false);
    };

    const startVoiceInput = () => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice input not supported in this browser");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'ja' ? 'ja-JP' : language === 'my' ? 'my-MM' : 'en-US';
        recognition.onresult = (event: any) => {
            setDestination(event.results[0][0].transcript);
        };
        recognition.start();
    };

    return (
        <div style={{ background: "white", borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "5px", color: "#333" }}>🤖 AI Travel Planner</h2>
            <p style={{ color: "#666", marginBottom: "25px", fontSize: "14px" }}>Powered by Groq AI</p>

            {/* Destination */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" }}>
                    📍 Destination
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Tokyo, Osaka, Kyoto"
                        style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
                    />
                    <button
                        onClick={startVoiceInput}
                        style={{ padding: "12px 16px", background: "#ff6b6b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "18px" }}
                        title="Voice Input"
                    >
                        🎤
                    </button>
                </div>
            </div>

            {/* Days */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" }}>
                    📅 Number of Days: {days}
                </label>
                <input
                    type="range"
                    min={1} max={14} value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#999" }}>
                    <span>1 day</span><span>7 days</span><span>14 days</span>
                </div>
            </div>
            {/* Budget */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}>
                    💰 Budget
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                    {[
                        { value: "budget", label: "💴 Budget", desc: "¥15,000/day" },
                        { value: "mid-range", label: "💳 Mid", desc: "¥30,000/day" },
                        { value: "luxury", label: "💎 Luxury", desc: "¥50,000+/day" },
                    ].map(opt => (
                        <button key={opt.value} onClick={() => setBudget(opt.value)}
                            style={{
                                flex: 1, padding: "10px", border: "2px solid",
                                borderColor: budget === opt.value ? "#667eea" : "#ddd",
                                borderRadius: "8px", background: budget === opt.value ? "#f0f2ff" : "white",
                                cursor: "pointer", fontSize: "12px", textAlign: "center"
                            }}>
                            <div>{opt.label}</div>
                            <div style={{ color: "#999", fontSize: "11px" }}>{opt.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Travel Style */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}>
                    👥 Travel Style
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[
                        { value: "solo", label: "🧍 Solo" },
                        { value: "couple", label: "👫 Couple" },
                        { value: "family", label: "👨‍👩‍👧 Family" },
                        { value: "friends", label: "👯 Friends" },
                    ].map(opt => (
                        <button key={opt.value} onClick={() => setStyle(opt.value)}
                            style={{
                                padding: "8px 16px", border: "2px solid",
                                borderColor: style === opt.value ? "#667eea" : "#ddd",
                                borderRadius: "20px", background: style === opt.value ? "#667eea" : "white",
                                color: style === opt.value ? "white" : "#333",
                                cursor: "pointer", fontSize: "14px"
                            }}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={generatePlan}
                disabled={loading}
                style={{
                    width: "100%", padding: "16px",
                    background: loading ? "#ccc" : "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white", border: "none", borderRadius: "10px",
                    fontWeight: "bold", fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s"
                }}
            >
                {loading ? "✨ Generating your plan..." : "🗾 Generate AI Travel Plan"}
            </button>

            {/* Error */}
            {error && (
                <div style={{ marginTop: "15px", padding: "12px", background: "#fee", borderRadius: "8px", color: "#c33" }}>
                    ❌ {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: "center", marginTop: "20px", color: "#667eea" }}>
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🤖</div>
                    <p>AI is planning your perfect Japan trip...</p>
                </div>
            )}
            {/* Result */}
            {result && !loading && (
                <div style={{ marginTop: "25px" }}>
                    {/* Overview */}
                    <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
                        <h3 style={{ marginBottom: "10px" }}>🗾 {destination} - {days} Day Trip</h3>
                        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>{result.overview}</p>
                        <div style={{ display: "flex", gap: "15px", marginTop: "15px", flexWrap: "wrap" }}>
                            <span>💰 {result.budgetEstimate}</span>
                            <span>🌸 {result.bestTimeToTravel}</span>
                        </div>
                    </div>

                    {/* Daily Plans */}
                    {result.dailyPlans?.map((day: any, i: number) => (
                        <div key={i} style={{ borderLeft: "4px solid #667eea", padding: "15px", margin: "15px 0", background: "#f8f9fa", borderRadius: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <span style={{ background: "#667eea", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "14px" }}>
                                    Day {day.day}
                                </span>
                                <h4 style={{ margin: 0, color: "#333" }}>{day.title}</h4>
                            </div>
                            <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
                                {day.activities?.map((act: string, j: number) => (
                                    <li key={j} style={{ marginBottom: "5px", color: "#555" }}>{act}</li>
                                ))}
                            </ul>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                                <div style={{ background: "#fff3cd", padding: "8px 12px", borderRadius: "6px", fontSize: "13px" }}>
                                    🚆 {day.trainTips}
                                </div>
                                <div style={{ background: "#d4edda", padding: "8px 12px", borderRadius: "6px", fontSize: "13px" }}>
                                    🍜 {day.foodRecommendation}
                                </div>
                                {day.estimatedCost && (
                                    <div style={{ background: "#cce5ff", padding: "8px 12px", borderRadius: "6px", fontSize: "13px" }}>
                                        💴 {day.estimatedCost}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Extra Info */}
                    {result.packingTips && (
                        <div style={{ background: "#f0f2ff", padding: "15px", borderRadius: "10px", marginTop: "15px" }}>
                            <h4>🎒 Packing Tips</h4>
                            <p style={{ color: "#555" }}>{result.packingTips}</p>
                        </div>
                    )}
                    {result.emergencyInfo && (
                        <div style={{ background: "#fff0f0", padding: "15px", borderRadius: "10px", marginTop: "10px" }}>
                            <h4>🆘 Emergency Info</h4>
                            <p style={{ color: "#555" }}>{result.emergencyInfo}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}