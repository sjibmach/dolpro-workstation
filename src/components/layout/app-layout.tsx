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
                <main className="xl:pl-96">
                    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        {/* Main area */}
                        {children}
                    </div>
                </main>
            </div>

            {/* Secondary column (hidden on smaller screens) */}
            {/* <aside className="fixed top-16 bottom-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    </aside> */}
        </div>
    );
};

export default AppLayout;
