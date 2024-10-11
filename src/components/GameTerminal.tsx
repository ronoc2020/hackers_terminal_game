import React, { useState, useEffect, useRef } from 'react';
import { commands, tools, fileSystem, missions, decodeBase64 } from '../data/gameData';

const GameTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to Hacker\'s Terminal. Type "help" for available commands.', 'Type "mission" to start your first mission.']);
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [currentMission, setCurrentMission] = useState(1);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  const getDirectoryContents = (path: string): string[] | null => {
    const parts = path.split('/').filter(Boolean);
    let current: any = fileSystem['/'];
    for (const part of parts) {
      if (current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    return Object.keys(current);
  };

  const getFileContents = (path: string): string | null => {
    const parts = path.split('/').filter(Boolean);
    let current: any = fileSystem['/'];
    for (const part of parts.slice(0, -1)) {
      if (current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    const fileName = parts[parts.length - 1];
    return current[fileName] || null;
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(' ');
    setOutput(prev => [...prev, `$ ${cmd}`]);

    switch (command) {
      case 'help':
        setOutput(prev => [
          ...prev,
          'Available commands:',
          ...Object.keys(commands).map(cmd => `  ${cmd}: ${commands[cmd]}`),
          '',
          'Available tools:',
          ...Object.keys(tools).map(tool => `  ${tool}: ${tools[tool]}`)
        ]);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'ls':
        const contents = getDirectoryContents(currentDirectory);
        if (contents) {
          setOutput(prev => [...prev, ...contents]);
        } else {
          setOutput(prev => [...prev, 'Directory not found']);
        }
        break;
      case 'cd':
        if (args[0]) {
          const newPath = args[0].startsWith('/') ? args[0] : `${currentDirectory}/${args[0]}`;
          const contents = getDirectoryContents(newPath);
          if (contents) {
            setCurrentDirectory(newPath);
            setOutput(prev => [...prev, `Changed directory to ${newPath}`]);
          } else {
            setOutput(prev => [...prev, 'Directory not found']);
          }
        } else {
          setOutput(prev => [...prev, 'Usage: cd <directory>']);
        }
        break;
      case 'cat':
        if (args[0]) {
          const filePath = args[0].startsWith('/') ? args[0] : `${currentDirectory}/${args[0]}`;
          const contents = getFileContents(filePath);
          if (contents) {
            setOutput(prev => [...prev, contents]);
          } else {
            setOutput(prev => [...prev, 'File not found']);
          }
        } else {
          setOutput(prev => [...prev, 'Usage: cat <filename>']);
        }
        break;
      case 'decode':
        if (args[0]) {
          const decoded = decodeBase64(args[0]);
          setOutput(prev => [...prev, `Decoded message: ${decoded}`]);
        } else {
          setOutput(prev => [...prev, 'Usage: decode <base64_string>']);
        }
        break;
      case 'mission':
        const mission = missions[currentMission];
        if (mission) {
          setOutput(prev => [
            ...prev,
            `Mission ${currentMission}:`,
            mission.description,
            'Objectives:',
            ...mission.objectives.map((obj, index) => `${index + 1}. ${obj}`),
            `Reward: ${mission.reward} points`
          ]);
        } else {
          setOutput(prev => [...prev, 'No more missions available. You\'ve completed the game!']);
        }
        break;
      default:
        if (commands[command]) {
          setOutput(prev => [...prev, `Simulating: ${commands[command]}`]);
          checkMissionProgress(command, args.join(' '));
        } else if (tools[command]) {
          setOutput(prev => [...prev, `Using tool: ${tools[command]}`]);
          checkMissionProgress(command, args.join(' '));
        } else {
          setOutput(prev => [...prev, `Command not recognized: ${command}. Type "help" for available commands.`]);
        }
    }
  };

  const checkMissionProgress = (command: string, args: string) => {
    const mission = missions[currentMission];
    if (mission) {
      const completedObjective = mission.objectives.find(obj => 
        obj.toLowerCase().includes(command) && (!args || obj.toLowerCase().includes(args))
      );
      if (completedObjective) {
        setOutput(prev => [...prev, 'Objective completed!']);
        const remainingObjectives = mission.objectives.filter(obj => obj !== completedObjective);
        if (remainingObjectives.length === 0) {
          setScore(prev => prev + mission.reward);
          setCurrentMission(prev => prev + 1);
          setOutput(prev => [
            ...prev,
            `Congratulations! You've completed Mission ${currentMission}!`,
            `You've earned ${mission.reward} points.`,
            'Type "mission" to see your next objective.'
          ]);
        }
      }
    }
  };

  return (
    <div className="flex-grow bg-black p-4 overflow-hidden flex flex-col">
      <div className="mb-2">
        <span className="text-blue-500">Current Mission: {currentMission}</span>
        <span className="text-yellow-500 ml-4">Score: {score}</span>
      </div>
      <div ref={outputRef} className="flex-grow overflow-auto mb-4">
        {output.map((line, index) => (
          <p key={index} className="mb-1">{line}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2 text-green-500">{currentDirectory} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow bg-transparent outline-none text-green-500"
          autoFocus
        />
      </form>
    </div>
  );
};

export default GameTerminal;