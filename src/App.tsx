import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoryPage from './StoryPage';
import SpookyUpload from './components/SpookyUpload';
import Header from './components/Header';
import GameAudioPlayer from './components/GameAudioPlayer';
import ScaryBackground from './components/ScaryBackground';
import { story } from './story';
import { prefecthImage, getImageURL } from './api';

function App() {
  const [imageId, setImageId] = useState<string | null>(null);
  const [isLoadingImages, setLoadingImages] = useState<boolean>(false);

  useEffect(() => {
    const prefechImages = async () => {
      if (imageId !== null) {
        setLoadingImages(true);
        for (const key in story) {
          console.log(key);
          await prefecthImage(getImageURL(imageId, key));
        }
        setLoadingImages(false);
      }
    }

    prefechImages();
  }, [imageId]);

  return (
    <div className="App min-h-screen">
      <Header />
      <ScaryBackground />
      <GameAudioPlayer />
      <Router>
        <Routes>
          <Route path="/" element={<SpookyUpload onUpload={setImageId} />} />
          <Route path="/story" element={<StoryPage loading={isLoadingImages} story={story} imageId={imageId as string} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;