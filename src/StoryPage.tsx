import React, { useState, useEffect } from 'react';
import SceneDisplay from './components/SceneDisplay';
import MysteryForm from './components/MysteryForm';
import { GameState, Scene, Story } from './types';
//import { generateImage, loadNextScene } from './api';

import { getImageURL } from './api';

interface StoryPageProps {
    imageId: string;
    story: Story
    loading: boolean
}

const StoryPage: React.FC<StoryPageProps> = ({ imageId, story, loading }) => {
    const [gameState, setGameState] = useState<GameState>({
        imageId: imageId,
        currentScene: 's1',
        backgroundImage: '',
        choiceImages: { a: '', b: '' },
    });
    const [currentScene, setCurrentScene] = useState<Scene | null>(null);
    const [showMysteryForm, setShowMysteryForm] = useState(false);
    const [isLoading, setIsLoading] = useState(loading);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    // const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        loadScene(gameState.currentScene);
    }, [gameState.currentScene, loading]);

    const loadScene = async (sceneId: string) => {
        setIsLoading(true);
        try {
            setCurrentScene(story[sceneId]);
            const bgImage = getImageURL(imageId, sceneId);
            setGameState(prev => ({ ...prev, backgroundImage: bgImage }));
        } catch (error) {
            console.error('Error loading scene:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChoiceSelect = (choice: 'a' | 'b') => {
        if (currentScene && currentScene.choices[choice]) {
            const nextSceneId = currentScene.choices[choice].nextScene;
            setGameState(prev => ({ ...prev, currentScene: nextSceneId }));
            if (nextSceneId === 's4') {
                setShowMysteryForm(true);
                //setTimerActive(true);
            }
        }
    };

    const handleMysterySubmit = (answer: string) => {
        //setTimerActive(false);
        const isCorrect = answer.toLowerCase() === 'hash';
        setGameState(prev => ({ ...prev, currentScene: isCorrect ? 's5' : 'lose' }));
        setShowMysteryForm(false);
        setTimeLeft(120);
    };

    if (!currentScene) {
        return <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100" >Loading...</div>;
    }

    return (<>
        <SceneDisplay scene={currentScene} gameState={gameState} onChoiceSelect={handleChoiceSelect} />
        {showMysteryForm && (
            <MysteryForm onSubmit={handleMysterySubmit} timeLeft={timeLeft} />
        )}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div className="text-2xl text-white">Loading...</div>
                <div className="text-2xl text-gray-100">We are generating creepy images, it takes time, you can go get some popcorn</div>
                <div>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

            </div >
        )}
    </>);
}

export default StoryPage;