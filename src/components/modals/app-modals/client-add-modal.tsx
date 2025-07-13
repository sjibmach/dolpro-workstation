import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '../modal';
import { Button } from '@/components/ui/button';
import { HiPlus } from 'react-icons/hi2';

export function ClientAddModal() {
    const body = (
        <div className="grid gap-4">
            <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                />
            </div>
        </div>
    );
    const trigger = (
        <Button size="sm" variant="outline">
            <HiPlus />
            Neu
        </Button>
    );
    return (
        <Modal
            trigger={trigger}
            size="md"
            title="Test Modal"
            description="This is a test modal to demonstrate the modal functionality."
            body={body}
            dialogAction={() => console.log('Action triggered')}
            dialogClose={true}
            dialogActionLabel="Hinzufügen"
        />
    );
}
