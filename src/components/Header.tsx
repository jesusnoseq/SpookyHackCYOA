import React from 'react';
import { Skull } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const obscure = ['/story'].includes(location.pathname);

    return (
        <header
            className={` text-gray-100 p-5 shadow-lg absolute transition-opacity duration-500 ${obscure ? 'opacity-10 bg-gray-900' : 'opacity-100 bg-gray-950'}`}>
            <div className="container mx-auto flex  flex-col items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center">
                    <Skull className="mr-2 text-red-500 w-8 h-8" />
                    Spooky Hack
                </h1>
                <p className="text-sm italic text-gray-400 mt-1">
                    "Where the code haunts you... or not"
                </p>
                <p className="text-sm italic text-gray-700 mt-1">
                    Check the repo → <a href='https://github.com/jesusnoseq/SpookyHackCYOA'>SpookyHackCYOA</a>
                </p>
            </div>
        </header >
    );
}
export default Header;