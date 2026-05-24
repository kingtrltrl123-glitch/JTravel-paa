"use client";

import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const { t } = useLanguage();

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
                    background: 'linear-gradient(135deg, #717db3, #7b7085)',
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