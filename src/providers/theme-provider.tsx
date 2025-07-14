'use client';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const ThemeProviders: React.FC<Props> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>;

    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemeProviders;
