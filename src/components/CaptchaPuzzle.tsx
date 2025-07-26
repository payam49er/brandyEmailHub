import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw, AlertCircle } from 'lucide-react';

interface CaptchaPuzzleProps {
  onVerified: () => void;
  isVisible: boolean;
}

/**
 * CAPTCHA puzzle component to prevent bot abuse
 * Uses simple math problems and visual verification
 */
export const CaptchaPuzzle: React.FC<CaptchaPuzzleProps> = ({ onVerified, isVisible }) => {
  const [puzzle, setPuzzle] = useState({ num1: 0, num2: 0, operation: '+' });
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  /**
   * Generates a new math puzzle
   */
  const generatePuzzle = () => {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25;
        num2 = Math.floor(Math.random() * 25) + 1;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        break;
      default:
        num1 = 5;
        num2 = 3;
    }
    
    setPuzzle({ num1, num2, operation });
    setUserAnswer('');
    setError('');
  };

  /**
   * Calculates the correct answer for the current puzzle
   */
  const getCorrectAnswer = (): number => {
    switch (puzzle.operation) {
      case '+':
        return puzzle.num1 + puzzle.num2;
      case '-':
        return puzzle.num1 - puzzle.num2;
      case '×':
        return puzzle.num1 * puzzle.num2;
      default:
        return 0;
    }
  };

  /**
   * Handles puzzle submission and verification
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const correctAnswer = getCorrectAnswer();
    const userAnswerNum = parseInt(userAnswer.trim());

    if (isNaN(userAnswerNum) || userAnswerNum !== correctAnswer) {
      setAttempts(prev => prev + 1);
      
      if (attempts + 1 >= maxAttempts) {
        setError(`Maximum attempts reached. Please refresh and try again.`);
      } else {
        setError(`Incorrect answer. ${maxAttempts - attempts - 1} attempts remaining.`);
        generatePuzzle();
      }
      setIsVerifying(false);
      return;
    }

    // Success
    setIsVerifying(false);
    onVerified();
  };

  // Generate initial puzzle
  useEffect(() => {
    if (isVisible) {
      generatePuzzle();
      setAttempts(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Security Verification</h3>
          <p className="text-gray-600">
            Please solve this puzzle to verify you're human and prevent automated abuse.
          </p>
        </div>

        {attempts >= maxAttempts ? (
          <div className="text-center">
            <div className="flex items-center justify-center text-red-600 mb-4">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span className="font-medium">Verification Failed</span>
            </div>
            <p className="text-gray-600 mb-4">
              Too many incorrect attempts. Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-3">What is the result of:</p>
              <div className="text-3xl font-bold text-gray-900 mb-4 font-mono">
                {puzzle.num1} {puzzle.operation} {puzzle.num2} = ?
              </div>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="?"
                required
                disabled={isVerifying}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={generatePuzzle}
                disabled={isVerifying}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Puzzle
              </button>
              <button
                type="submit"
                disabled={isVerifying || !userAnswer.trim()}
                className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Attempt {attempts + 1} of {maxAttempts}
            </div>
          </form>
        )}

        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Why do we need this?</strong> This verification helps prevent automated bots from abusing our email service and ensures fair usage for all users.
          </p>
        </div>
      </div>
    </div>
  );
};