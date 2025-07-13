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
            <div className="pl-80">{children}</div>
            <aside className="fixed top-16 bottom-0 left-20 hidden w-80 overflow-y-auto border-r border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8 xl:block dark:border-gray-700 dark:bg-gray-950">
                {asideContent}
            </aside>
        </>
    );
};

export default TwoColumnsLayout;
