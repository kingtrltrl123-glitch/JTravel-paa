"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from './translations';

type Language = keyof typeof translations;  // 'en' | 'my' | 'ja' | 'zh' | 'ko'

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        // translations ရှိမရှိ စစ်ပါ
        if (!translations || !translations[language]) {
            console.error('Translations not found for language:', language);
            return key;
        }

        // key ကို dot notation နဲ့ ခွဲထုတ်မယ် (ဥပမာ "app.title")
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result === undefined || result[k] === undefined) {
                return key;  // မတွေ့ရင် key ကိုပြန်ပြ
            }
            result = result[k];
        }

        return result || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}