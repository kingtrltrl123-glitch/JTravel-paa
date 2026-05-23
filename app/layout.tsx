import './globals.css';
import { LanguageProvider } from '../lib/LanguageContext';
import Navbar from '@/components/Navbar';

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