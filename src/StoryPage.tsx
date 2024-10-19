import React, { useState, useEffect } from 'react';
import SceneDisplay from './components/SceneDisplay';
import MysteryForm from './components/MysteryForm';
import ScrambledCode from './components/ScrambledCode';
import { GameState, Scene, Story } from './types';
import { usePopup } from './context/PopupContext';

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
    const [showScrambledCode, setShowScrambledCode] = useState(false);
    const [isLoading, setIsLoading] = useState(loading);
    const [timeLeft, setTimeLeft] = useState(666);
    const [timerActive, setTimerActive] = useState(false);
    const [afterQuestNextScene, setAfterQuestNextScene] = useState("");
    const { showPopup } = usePopup();

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

    useEffect(() => {
        let interval: number;
        if (!timerActive) {
            return;
        }
        if (timeLeft > 0) {
            interval = window.setInterval(() => {
                console.log("timeLeft", timeLeft)
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            showPopup("You have dared to ignore me?\nNow you're coming with me, we will be good friends.", () => {
                setGameState(prev => ({ ...prev, currentScene: "s5b" }));
            });
        }

        return () => {
            clearInterval(interval);
        };
    }, [timerActive, timeLeft]);

    const handleChoiceSelect = (choice: 'a' | 'b') => {
        if (currentScene && currentScene.choices[choice]) {
            const nextSceneId = currentScene.choices[choice].nextScene;
            const quest = currentScene.choices[choice].quest

            if (quest) {
                console.log("Quest time!", quest);
                setAfterQuestNextScene(nextSceneId)
                if (quest === "MisteryForm") {
                    setShowMysteryForm(true);
                } else if (quest === "ScrambledCode") {
                    setShowScrambledCode(true);
                } else if (quest === "Countdown") {
                    setTimerActive(true);
                    setTimeLeft(131);
                    setGameState(prev => ({ ...prev, currentScene: nextSceneId }));
                }
            } else {
                setGameState(prev => ({ ...prev, currentScene: nextSceneId }));
            }
        }
    };


    const handleScrambledSubmit = () => {
        setShowScrambledCode(false);
        showPopup("You seem to have solved the problem.\nNext time it won't be so easy.", () => {
            setGameState(prev => ({ ...prev, currentScene: afterQuestNextScene }));
        });
    }

    const handleMysterySubmit = (answerOk: boolean) => {
        setShowMysteryForm(false);
        console.log("handleMysterySubmit", answerOk, afterQuestNextScene);
        if (answerOk) {
            setTimerActive(false);
            showPopup("Sadly, the answer is correct.", () => {
                setGameState(prev => ({ ...prev, currentScene: afterQuestNextScene }));
            });
        } else {
            if (afterQuestNextScene.startsWith("s5")) {
                showPopup("That deserves a place in the depths of hell.\nYou come with me, we will be good friends.", () => {
                    setGameState(prev => ({ ...prev, currentScene: afterQuestNextScene.replace("a", "b") }));
                });
            } else {
                showPopup("You don't seem to have it clear. I may give you another chance... or not.", () => {
                    setGameState(prev => ({ ...prev, currentScene: afterQuestNextScene.slice(0, -1) + "b" }));
                });
            }
        }
    };

    if (!currentScene) {
        return <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 animate-fade-in">Loading...</h1>
            <p className="text-lg text-center max-w-md mb-8 animate-fade-in-delay">
                We are generating creepy images. <br />It takes time, so feel free to grab some popcorn!
            </p>
            <div className="animate-spin mb-8">
                <svg className="h-16 w-16 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <p className="text-sm text-gray-400 animate-pulse">
                It can take about 2 minutes.
            </p>
        </div>
    }

    return (<>
        <SceneDisplay scene={currentScene} gameState={gameState} onChoiceSelect={handleChoiceSelect} />
        {showMysteryForm && (
            <MysteryForm onSubmit={handleMysterySubmit} />
        )}
        {showScrambledCode && (
            <ScrambledCode onSuccess={handleScrambledSubmit} />
        )}
        {timerActive &&
            <div className="scary-text text-6xl text-red-500 mb-4 fixed top-10 right-20 z-50">Time left: {timeLeft}</div>
        }
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div className="text-2xl text-white">Loading...</div>
            </div >
        )}
    </>);
}

export default StoryPage;