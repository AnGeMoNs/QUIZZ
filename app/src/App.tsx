import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import quizDataRaw from './data/quiz.json';

// Type definition for a question
type Question = {
  category: string;
  question: string;
  options: string[];
  answer: string;
};

// We shuffle the questions so each player gets a different mix
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const quizData: Question[] = quizDataRaw as Question[];

// Background component for the glowing orbs
const Background = () => (
  <div className="background-wrapper">
    <div className="blob blob-1"></div>
    <div className="blob blob-2"></div>
    <div className="blob blob-3"></div>
  </div>
);

// HOME PAGE - Enter Name
const Home = ({ onStart }: { onStart: (name: string) => void }) => {
  const [name, setName] = useState('');
  const [showQR, setShowQR] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel"
      style={{ textAlign: 'center' }}
    >
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Disquizz</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>¡Demuestra tu conocimiento!</p>
      
      {!showQR ? (
        <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) onStart(name); }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Ingresa tu nombre..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            Comenzar Quiz
          </button>
          
          <button 
            type="button" 
            onClick={() => setShowQR(true)}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Mostrar QR para escanear
          </button>
        </form>
      ) : (
        <div>
          <p style={{ marginBottom: '1rem' }}>Escanea para jugar en tu teléfono:</p>
          <div className="qr-container">
            <QRCodeSVG value={window.location.origin} size={200} />
          </div>
          <br/>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => setShowQR(false)}
          >
            Volver
          </button>
        </div>
      )}
    </motion.div>
  );
};

// QUIZ PAGE - The Questions
const Quiz = ({ onComplete }: { onComplete: (score: number, total: number) => void }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    // Select 40 random questions for a quick game
    const shuffled = shuffleArray(quizData).slice(0, 40);
    setQuestions(shuffled);
  }, []);

  if (questions.length === 0) return <p>Cargando preguntas...</p>;

  const currentQ = questions[currentIndex];
  
  const handleOptionClick = (option: string) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    setSelectedOption(option);
    
    const isCorrect = option === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswering(false);
      } else {
        onComplete(score + (isCorrect ? 1 : 0), questions.length);
      }
    }, 1500); // Wait 1.5s to show correct/incorrect state
  };

  const progressPercentage = ((currentIndex) / questions.length) * 100;

  return (
    <motion.div 
      key={currentIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="glass-panel"
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge">{currentQ.category}</span>
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', lineHeight: '1.4' }}>
        {currentQ.question}
      </h2>

      <div className="options-container">
        {currentQ.options.map((opt, idx) => {
          let btnClass = "option-btn";
          if (isAnswering) {
            if (opt === currentQ.answer) btnClass += " correct";
            else if (opt === selectedOption) btnClass += " incorrect";
          } else if (opt === selectedOption) {
            btnClass += " selected";
          }

          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleOptionClick(opt)}
              disabled={isAnswering}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

// RESULTS PAGE
const Results = ({ name, score, total, onRestart }: { name: string, score: number, total: number, onRestart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ textAlign: 'center' }}
    >
      <h2>¡Juego Terminado!</h2>
      <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Gran esfuerzo, <strong style={{ color: 'var(--primary-color)' }}>{name}</strong></p>
      
      <div className="score-display">
        {score} <span style={{ fontSize: '2rem', color: 'var(--text-color)' }}>/ {total}</span>
      </div>
      
      <p style={{ marginBottom: '2rem' }}>Puntos obtenidos</p>
      
      <button className="btn-primary" onClick={onRestart}>
        Jugar de Nuevo
      </button>
    </motion.div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<'home' | 'quiz' | 'results'>('home');
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [totalQs, setTotalQs] = useState(0);

  const startGame = (name: string) => {
    setPlayerName(name);
    setGameState('quiz');
  };

  const finishGame = (score: number, total: number) => {
    setFinalScore(score);
    setTotalQs(total);
    setGameState('results');
  };

  const restartGame = () => {
    setGameState('home');
  };

  return (
    <>
      <Background />
      <div className="app-container">
        <AnimatePresence mode="wait">
          {gameState === 'home' && <Home key="home" onStart={startGame} />}
          {gameState === 'quiz' && <Quiz key="quiz" onComplete={finishGame} />}
          {gameState === 'results' && <Results key="results" name={playerName} score={finalScore} total={totalQs} onRestart={restartGame} />}
        </AnimatePresence>
      </div>
    </>
  );
}
