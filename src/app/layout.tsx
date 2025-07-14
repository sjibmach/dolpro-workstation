import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/layout/app-layout';
import ThemeProviders from '@/providers/theme-provider';
import ClientOnly from '@/components/client-only';
import ReactQueryProvider from '@/providers/react-query-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

// export const metadata = {
//     title: 'Dolpro',
//     description: 'Delpro Workstation',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-amber-50 antialiased dark:bg-gray-950`}
            >
                <ClientOnly>
                    <ReactQueryProvider>
                        <ThemeProviders>
                            <AppLayout>{children}</AppLayout>
                        </ThemeProviders>
                    </ReactQueryProvider>
                </ClientOnly>
            </body>
        </html>
    );
}
