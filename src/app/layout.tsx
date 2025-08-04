import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/layout/app-layout';
import ThemeProviders from '@/providers/theme-provider';
import ClientOnly from '@/components/client-only';
import ReactQueryProvider from '@/providers/react-query-provider';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'PWA NextJS',
    description: "It's a simple progressive web application made with NextJS",
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
    themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
    authors: [
        {
            name: 'imvinojanv',
            url: 'https://www.linkedin.com/in/imvinojanv/',
        },
    ],
    viewport:
        'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
    icons: [
        { rel: 'apple-touch-icon', url: '/icon-128x128.png' },
        { rel: 'icon', url: '/icon-128x128.png' },
    ],
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning>
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-amber-50 antialiased dark:bg-gray-950`}
            >
                <ClientOnly>
                    <ReactQueryProvider>
                        <ThemeProviders>
                            <Toaster />
                            <AppLayout>{children}</AppLayout>
                        </ThemeProviders>
                    </ReactQueryProvider>
                </ClientOnly>
            </body>
        </html>
    );
}
