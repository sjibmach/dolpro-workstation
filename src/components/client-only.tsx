'use client';

import { useEffect, useState } from 'react';

type ClientOnlyProps = {
    children: React.ReactNode;
    className?: string;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, className }) => {
    const [mounted, setMounted] = useState(false);
    // console.log(darkMode);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return <div>{children}</div>;
};

export default ClientOnly;
