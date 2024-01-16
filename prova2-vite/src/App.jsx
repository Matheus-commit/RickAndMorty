import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Planets from './Components/PlanetsLocation';
import RickAndMortyCharactes from './Components/RickAndMortyCharactes';
import EpisodeDetails from './Components/EpisodeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RickAndMortyCharactes />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/episodes" element={<EpisodeDetails />} />
      </Routes>
    </Router>
  );
}

export default App
