
import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from "lucide-react"

export default function GameAudioPlayer() {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('audio/Dark Code Chronicles.mp3');
        audio.muted = true;
        audio.loop = true;
        audio.muted = true;

        audioRef.current = audio

        audio.play().catch(error => console.log("Audio playback failed:", error))

        return () => {
            audio.pause();
            audio.volume = 0.5;
        }
    }, [])

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className="fixed top-4 right-4 backdrop-grayscale z-50">
            <button id='muteButton'
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-gray-850 text-gray-100 hover:bg-gray-700 transition-colors shadow-lg flex items-center justify-center"
            >
                {isMuted ? <VolumeX className="h-6 w-6 text-gray-400" /> : <Volume2 className="h-6 w-6 text-gray-400" />}
            </button>
        </div>
    )
}