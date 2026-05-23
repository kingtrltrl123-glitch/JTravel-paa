"use client";

import Link from 'next/link';
import './globals.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Navbar Component - ဘာသာစကားနဲ့ ချိတ်ဆက်ထားတယ်
function Navbar() {
    const { t } = useLanguage();  // ← ဒါက လက်ရှိဘာသာစကားအတိုင်း စာသားပြန်ပေးတယ်

    return (
        <nav style={{
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '12px 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <Link href="/" style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textDecoration: 'none'
                }}>
                    {t('app.title')}
                </Link>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                        {t('nav.home')}
                    </Link>
                    <Link href="/train" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                        {t('nav.train')}
                    </Link>
                    <Link href="/food" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                        {t('nav.food')}
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>JTravel - Japan Travel AI</title>
                <meta name="description" content="AI-powered Japan travel planner" />
            </head>
            <body>
                <LanguageProvider>
                    <Navbar />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}