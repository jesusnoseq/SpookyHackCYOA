import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoryPage from './StoryPage';
import SpookyUpload from './components/SpookyUpload';
import Header from './components/Header';
import GameAudioPlayer from './components/GameAudioPlayer';
import ScaryBackground from './components/ScaryBackground';
import { story } from './story';
import { prefetchImage, getImageURL } from './api';

function App() {
  const [imageId, setImageId] = useState<string | null>(null);
  const [isLoadingImages, setLoadingImages] = useState<boolean>(false);

  useEffect(() => {
    const prefetchImages = async () => {
      if (imageId !== null) {
        setLoadingImages(true);
        console.log("Loading stars");
        const keys = Object.keys(story);
        const allPromises = keys.map((key) => prefetchImage(getImageURL(imageId, key)));
        await Promise.all(allPromises.slice(0, 3));
        setLoadingImages(false);
        console.log("Finished loading the first 3 image");
        await Promise.all(allPromises);
        console.log("All images loaded");
      }
    }

    prefetchImages();
    const timeoutId = setTimeout(() => {
      setLoadingImages(false);
    }, 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [imageId]);

  return (
    <div className="App min-h-screen">
      <Router>
        <Header />
        <ScaryBackground />
        <GameAudioPlayer />
        <Routes>
          <Route path="/" element={<SpookyUpload onUpload={setImageId} />} />
          <Route path="/story" element={<StoryPage loading={isLoadingImages} story={story} imageId={imageId as string} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;