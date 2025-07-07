'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Home() {
    const handleClick = async () => {
        await axios.post('/api/test');
    };
    return (
        <div className="">
            <main className="m-4" onClick={handleClick}>
                <Button className="cursor-pointer">Click me</Button>
            </main>
            <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
        </div>
    );
}
