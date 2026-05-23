"use client";

import { useState } from "react";
import { useLanguage } from "../app/context/LanguageContext";

export default function AIPlanner() {
    const { t } = useLanguage();
    const [destination, setDestination] = useState("Tokyo");
    const [days, setDays] = useState(3);
    const [budget, setBudget] = useState("mid-range");
    const [style, setStyle] = useState("solo");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ destination, days, budget, travelStyle: style }),
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("AI error:", error);
        }
        setLoading(false);
    };

    const startVoiceInput = () => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice not supported");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (event: any) => {
            setDestination(event.results[0][0].transcript);
            setTimeout(generatePlan, 100);
        };
        recognition.start();
    };

    const budgetOptions = [
        { value: "budget", label: t('budget.budget') },
        { value: "mid-range", label: t('budget.mid') },
        { value: "luxury", label: t('budget.luxury') },
    ];

    const styleOptions = [
        { value: "solo", label: t('style.solo') },
        { value: "couple", label: t('style.couple') },
        { value: "family", label: t('style.family') },
        { value: "friends", label: t('style.friends') },
    ];

    return (
        <div style={{ background: "white", borderRadius: "20px", padding: "30px" }}>
            <h2 style={{ marginBottom: "20px" }}>🤖 {t('ai.generate')}</h2>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t('ai.destination')}</label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t('ai.days')}</label>
                <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t('ai.budget')}</label>
                <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                >
                    {budgetOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{t('ai.style')}</label>
                <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                >
                    {styleOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </select>
            </div>

            <button
                onClick={generatePlan}
                style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
                {t('ai.generate')}
            </button>

            <button
                onClick={startVoiceInput}
                style={{ width: "100%", padding: "14px", background: "#ff6b6b", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}
            >
                🎤 {t('ai.voice')}
            </button>

            {loading && <div style={{ textAlign: "center", marginTop: "20px" }}>{t('ai.planning')}</div>}

            {result && result.dailyPlans && (
                <div style={{ marginTop: "20px" }}>
                    <h3>{result.overview}</h3>
                    {result.dailyPlans.map((day: any, i: number) => (
                        <div key={i} style={{ borderLeft: "4px solid #667eea", padding: "15px", margin: "15px 0", background: "#f8f9fa", borderRadius: "10px" }}>
                            <span style={{ background: "#667eea", color: "white", padding: "4px 12px", borderRadius: "20px" }}>Day {day.day}</span>
                            <h4>{day.title}</h4>
                            <ul>{day.activities?.map((act: string, j: number) => <li key={j}>{act}</li>)}</ul>
                            <div style={{ background: "#fff3cd", padding: "8px", borderRadius: "6px" }}>{t('train.tip')}: {day.trainTips}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}