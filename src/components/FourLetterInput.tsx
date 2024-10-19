import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface FourLetterInputProps {
    onChange: (letters: string) => void;
}

export default function FourLetterInput({ onChange }: FourLetterInputProps) {
    const [letters, setLetters] = useState<string[]>(['', '', '', '']);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newLetters = [...letters];
            newLetters[index] = value.toUpperCase();
            setLetters(newLetters);
            onChange(newLetters.join(''));

            if (value && index < 3) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !letters[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            {letters.map((letter, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    value={letter}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-400 rounded-md focus:outline-none focus:border-red-500 bg-gray-600"
                    maxLength={1}
                    placeholder="?"
                />
            ))}
        </div>
    );
}