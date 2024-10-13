import React, { useState, useEffect } from 'react'

const ScaryLetter: React.FC<{ char: string; index: number }> = ({ char, index }) => {
    const animationDuration = 5 + Math.random() * 5 // Between 5 and 10 seconds
    const animationDelay = Math.random() * 5 // Between 0 and 5 seconds

    return (
        <span
            className="absolute text-red-600 select-none opacity-0"
            style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                fontSize: `${Math.random() * 4 + 1}rem`,
                textShadow: '0 0 5px rgba(255, 0, 0, 0.5)',
                animation: `float-${index} ${animationDuration}s ease-in-out ${animationDelay}s infinite`,
            }}
            aria-hidden="true"
        >
            {char}
        </span>
    )
}

export default function ScaryBackground() {
    const [letters, setLetters] = useState<JSX.Element[]>([])

    useEffect(() => {
        const scaryWords = ['FEAR', 'DREAD', 'TERROR', 'HORROR', 'PANIC', 'SCREAM', 'DOOM', 'DEATH', 'HACK']
        const newLetters = []

        for (let i = 0; i < 100; i++) {
            const word = scaryWords[Math.floor(Math.random() * scaryWords.length)]
            const char = word[Math.floor(Math.random() * word.length)]
            newLetters.push(<ScaryLetter key={i} char={char} index={i} />)
        }

        setLetters(newLetters)
    }, [])

    return (
        <div className="fixed inset-0 bg-gray-900 overflow-hidden -z-10" aria-label="Scary background with floating letters">
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-red-900/30"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] animate-[fog_20s_linear_infinite] z-20"></div>
            <div className="absolute inset-0 z-0">
                {letters}
                <style>{`
          @keyframes float-base {
            0%, 100% { opacity: 0.1; transform: translate(0, 0) rotate(0deg); }
            50% { opacity: 0.3; transform: translate(-10px, -10px) rotate(3deg); }
          }
          ${letters.map((_, i) => `
            @keyframes float-${i} {
              0%, 100% { opacity: 0.0; transform: translate(0, 0) rotate(0deg); }
              50% { opacity: 0.3; transform: translate(${Math.random() * 100 - 10}px, ${Math.random() * 100 - 10}px) rotate(${Math.random() * 6 - 3}deg); }
            }
          `).join('\n')}
        `}</style>
            </div>
            <div className="relative z-30 h-screen flex items-center justify-center">
                <h1 className="text-red-600 text-6xl font-bold tracking-widest animate-pulse">
                </h1>
            </div>
        </div>
    )
}