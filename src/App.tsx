import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu } from 'lucide-react';
import GameTerminal from './components/GameTerminal';
import Instructions from './components/Instructions';

function App() {
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col">
      <header className="p-4 bg-gray-900 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={24} />
          <h1 className="text-xl font-bold">Hacker's Terminal</h1>
        </div>
        <div className="flex space-x-4">
          <Shield size={24} />
          <Cpu size={24} />
        </div>
      </header>
      <main className="flex-grow flex">
        {showInstructions ? (
          <Instructions />
        ) : (
          <GameTerminal />
        )}
      </main>
      <footer className="p-2 bg-gray-900 text-center text-xs">
        &copy; 2024 Hacker's Terminal | Use responsibly
      </footer>
    </div>
  );
}

export default App;