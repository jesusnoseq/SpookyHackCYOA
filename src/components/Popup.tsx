import React, { useState, useEffect } from 'react'

interface PopupProps {
    message: string
    onClose: () => void
}

export default function Popup({
    message = "Beware of the digital ghosts lurking within...",
    onClose = () => { },
}: PopupProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        onClose()
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="popup-title"
                className="bg-gray-900 border-2 border-red-700 rounded-lg shadow-lg max-w-md w-full"
            >
                <div className="p-6">
                    <h2 id="popup-title" className="text-2xl font-bold text-red-600 mb-4">
                        🎃 Something important 🎃
                    </h2>
                    <p className="text-gray-300 mb-4 font-semibold">{message}</p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleClose}
                            className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Accept Your Fate 👻
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}