import { ReactNode } from 'react';

const TwoColumnsLayout = ({
    children,
    asideContent,
}: {
    children: ReactNode;
    asideContent: ReactNode;
}) => {
    return (
        <>
            <div className="ml-0 max-w-5xl py-8 xl:ml-80 2xl:ml-96">
                {children}
            </div>
            <aside className="fixed top-16 bottom-0 left-20 hidden w-80 overflow-y-auto border-r border-gray-200 bg-white px-2 py-4 sm:px-4 lg:px-6 xl:block dark:border-gray-700 dark:bg-gray-950">
                {asideContent}
            </aside>
        </>
    );
};

export default TwoColumnsLayout;
