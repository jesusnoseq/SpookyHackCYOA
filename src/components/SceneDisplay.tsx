import React, { useState, useEffect } from 'react';
import { Scene, GameState } from '../types';
import ImageFrame from './ImageFrame';
import { useNavigate } from "react-router-dom";

const MS_TO_WAIT_PER_WORD = 50;

interface SceneDisplayProps {
  scene: Scene;
  gameState: GameState;
  onChoiceSelect: (choice: 'a' | 'b') => void;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene, gameState, onChoiceSelect }) => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTextComplete(false);
    const words = scene.text.split(' ');
    let wordIndex = 0;

    const intervalId = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedText(words.slice(0, wordIndex + 1).join(' '));
        wordIndex++;
      } else {
        clearInterval(intervalId);
        setIsTextComplete(true);
      }
    }, MS_TO_WAIT_PER_WORD);


    return () => clearInterval(intervalId);
  }, [scene.text]);

  const renderSkeletonChoices = () => (
    <div className="flex justify-center space-x-4 min-h-[5rem]">
      {['a', 'b'].map((choiceKey) => (
        <div
          key={choiceKey}
          className="flex flex-col items-center w-1/3 p-2 bg-gray-600 rounded animate-pulse opacity-70"
        >
          <div className="h-8 w-3/4 bg-gray-700 rounded opacity-70" />
        </div>
      ))}
    </div>
  );


  return (
    <div className="flex flex-col items-center justify-end min-h-screen text-gray-100 relative">
      <ImageFrame src={gameState.backgroundImage} alt="Scene Background" />
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl mb-6 min-h-[8rem]">{displayedText}</p>
          {!isTextComplete && Object.keys(scene.choices).length > 0 && (
            renderSkeletonChoices()
          )}
          {isTextComplete && Object.keys(scene.choices).length > 0 && (
            <div className="flex justify-center space-x-4 min-h-[5rem]">
              {['a', 'b'].map((choiceKey) => (
                <button
                  key={choiceKey}
                  onClick={() => onChoiceSelect(choiceKey as 'a' | 'b')}
                  className="flex flex-col items-center w-1/3 p-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <span className="text-2xl">{scene.choices[choiceKey as 'a' | 'b']?.action}</span>
                </button>
              ))}
            </div>
          )}
          {isTextComplete && Object.keys(scene.choices).length === 0 && (
            <div className="text-center">
              <p className="text-xl font-bold mb-4">The End</p>
              <button
                onClick={() => {
                  navigate('/');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors m-1"
              >
                Play Again
              </button>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default SceneDisplay;