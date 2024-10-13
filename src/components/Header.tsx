import React from 'react';
import { Skull } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-gray-950 text-gray-100 p-6 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center">
                    <Skull className="mr-2 text-red-500 w-8 h-8" />
                    Spooky Hack
                </h1>
            </div>
        </header>
    );
}
