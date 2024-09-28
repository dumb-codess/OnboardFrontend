import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AcrediaPage from './pages/AcrediaPage';
import DownloadUploadPage from './pages/DownUppage';
import FBLandingPage from './pages/FBLandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acredia" element={<AcrediaPage />} />
        <Route path="/fb" element={<DownloadUploadPage />} />
        <Route path="/fb/home" element={<FBLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;