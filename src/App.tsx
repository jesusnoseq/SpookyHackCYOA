import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoryPage from './StoryPage';
import SpookyUpload from './components/SpookyUpload';
import Header from './components/Header';
import GameAudioPlayer from './components/GameAudioPlayer';
import ScaryBackground from './components/ScaryBackground';


function App() {
  const [imageId, setImageId] = useState<string | null>(null);


  return (
    <div className="App min-h-screen">
      <Header />
      <ScaryBackground />
      <GameAudioPlayer />
      <Router>
        <Routes>
          <Route path="/" element={<SpookyUpload onUpload={setImageId} />} />
          <Route path="/story" element={<StoryPage imageId={imageId as string} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;