'use client';

import { ReactNode, useState } from 'react';
import AppSidebar from './app-sidebar';
import AppTopbar from './app-topbar';

const AppLayout = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            <AppSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="lg:pl-20">
                <AppTopbar setSidebarOpen={setSidebarOpen} />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
