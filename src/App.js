import './App.css';
import { Route, Routes } from 'react-router-dom';
import { GlobalStats, Navbar } from 'components';
import { Coins, CoinDetails, Portfolio } from 'pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <GlobalStats />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coin" element={<CoinDetails />} />
        <Route path="/:portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
