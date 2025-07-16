'use client';
import { HiOutlineClipboard } from 'react-icons/hi2';
import { toast } from 'sonner';

const CopyButton = ({ copyText }: { copyText: string }) => {
    return (
        <div
            className="cursor-pointer rounded-lg p-2 hover:bg-orange-200 dark:hover:bg-orange-700"
            onClick={() => {
                navigator.clipboard.writeText(copyText);
                toast.success('ID in die Zwischenablage kopiert');
            }}
        >
            <HiOutlineClipboard size={20} />
        </div>
    );
};

export default CopyButton;
