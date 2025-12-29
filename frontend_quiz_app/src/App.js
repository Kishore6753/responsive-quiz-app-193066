import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import { QuizProvider } from './state/QuizContext';
import AppShell from './components/AppShell';
import DashboardPage from './pages/DashboardPage';
import QuizTakingPage from './pages/QuizTakingPage';
import ResultsPage from './pages/ResultsPage';
import ReviewPage from './pages/ReviewPage';

// PUBLIC_INTERFACE
function App() {
  /** Root application component. Provides app state and top-level routes. */
  return (
    <QuizProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/quiz/:quizId" element={<QuizTakingPage />} />
            <Route path="/results/:attemptId" element={<ResultsPage />} />
            <Route path="/review/:attemptId" element={<ReviewPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
