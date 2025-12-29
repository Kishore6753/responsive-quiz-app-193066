import React, { createContext, useContext, useMemo, useState } from 'react';
import { clearAllAttempts, getAllQuizzes, getAttempts } from '../services/quizRepository';

const QuizContext = createContext(null);

// PUBLIC_INTERFACE
export function QuizProvider({ children }) {
  /** Provides quiz data and attempt history to the application. */
  const [quizzes, setQuizzes] = useState(() => getAllQuizzes());
  const [attempts, setAttempts] = useState(() => getAttempts());

  const actions = useMemo(() => {
    return {
      // PUBLIC_INTERFACE
      refreshAttempts() {
        /** Reload attempts from localStorage. */
        setAttempts(getAttempts());
      },
      // PUBLIC_INTERFACE
      refreshQuizzes() {
        /** Reload quizzes from localStorage. */
        setQuizzes(getAllQuizzes());
      },
      // PUBLIC_INTERFACE
      clearAttempts() {
        /** Clear all attempts and refresh. */
        clearAllAttempts();
        setAttempts(getAttempts());
      }
    };
  }, []);

  const value = useMemo(() => ({ quizzes, attempts, actions }), [quizzes, attempts, actions]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// PUBLIC_INTERFACE
export function useQuizContext() {
  /** Hook to access quiz context (quizzes, attempts, actions). */
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizContext must be used within QuizProvider');
  return ctx;
}
