import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const SIZE_CLASSES = {
    sm: 'sm:max-w-[425px]',
    md: 'sm:max-w-[650px]',
    lg: 'sm:max-w-[800px]',
    xl: 'sm:max-w-[1000px]',
};

const Modal = ({
    trigger = <Button variant="outline">Öffnen</Button>,
    title,
    description,
    body,
    dialogClose,
    dialogActionLabel,
    dialogAction,
    size = 'sm',
    open,
    onOpenChange,
}: {
    trigger?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    body?: ReactNode;
    dialogClose?: boolean;
    dialogActionLabel?: string;
    dialogAction?: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                className={cn(
                    'max-h-[90vh] overflow-y-auto',
                    SIZE_CLASSES[size] || SIZE_CLASSES.sm
                )}
            >
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {body}
                <DialogFooter>
                    {dialogClose && (
                        <DialogClose asChild>
                            <Button variant="outline">Abbrechen</Button>
                        </DialogClose>
                    )}
                    {dialogAction && (
                        <Button onClick={dialogAction}>
                            {dialogActionLabel}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
