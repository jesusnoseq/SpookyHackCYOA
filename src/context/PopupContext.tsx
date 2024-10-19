import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Popup from '../components/Popup';

interface PopupContextType {
    showPopup: (message: string, onClose?: () => void) => void;
    closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = (): PopupContextType => {
    const context = useContext(PopupContext);
    if (!context) throw new Error('usePopup must be used within a PopupProvider');
    return context;
};

interface PopupProviderProps {
    children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);

    const showPopup = useCallback((message: string, onClose?: () => void) => {
        setPopupMessage(message);
        setOnCloseCallback(() => onClose || null);
    }, []);

    const closePopup = useCallback(() => {
        if (onCloseCallback) onCloseCallback();
        setPopupMessage(null);
        setOnCloseCallback(null);
    }, [onCloseCallback]);

    return (
        <PopupContext.Provider value={{ showPopup, closePopup }}>
            {children}
            {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
        </PopupContext.Provider>
    );
};
