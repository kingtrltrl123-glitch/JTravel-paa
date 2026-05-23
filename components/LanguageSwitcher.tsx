"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "my", name: "မြန်မာ", flag: "🇲🇲" },
        { code: "jp", name: "日本語", flag: "🇯🇵" },
        { code: "ko", name: "한국어", flag: "🇰🇷" },
        { code: "zh", name: "中文", flag: "🇨🇳" },
    ];

    const handleLanguageChange = (langCode: any) => {
        setLanguage(langCode);
        setIsOpen(false);
        // စာမျက်နှာ ပြန်တင်ဖို့ မလိုဘူး၊ context က အလိုလို refresh ဖြစ်မယ်
    };

    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: "transparent",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontSize: "22px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
                🌐
            </button>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "45px",
                        right: "0",
                        background: "white",
                        borderRadius: "12px",
                        padding: "8px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        zIndex: 100,
                        minWidth: "140px"
                    }}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%",
                                padding: "8px 12px",
                                border: "none",
                                background: language === lang.code ? "#667eea" : "transparent",
                                color: language === lang.code ? "white" : "#333",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "14px",
                                marginBottom: "4px"
                            }}
                        >
                            <span>{lang.flag}</span>
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}