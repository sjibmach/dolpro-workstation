import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="">
            <main className="m-4">
                <Button className="cursor-pointer">Click me</Button>
            </main>
            <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
        </div>
    );
}
