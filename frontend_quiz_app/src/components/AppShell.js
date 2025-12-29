import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuizContext } from '../state/QuizContext';

// PUBLIC_INTERFACE
export default function AppShell({ children }) {
  /** Application shell with sticky header and consistent layout. */
  const { attempts } = useQuizContext();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      <header className="header" role="banner">
        <div className="header-inner">
          <div className="brand" aria-label="Quiz app brand">
            <div className="brand-mark" aria-hidden="true" />
            <div className="brand-text">
              <div className="brand-title">Responsive Quiz</div>
              <div className="brand-subtitle">Local-first • No backend</div>
            </div>
          </div>

          <div className="header-actions">
            <span className="badge" aria-label="Attempt count">
              Attempts: <strong>{attempts.length}</strong>
            </span>

            {!isHome ? (
              <Link className="btn btn-ghost" to="/" aria-label="Go to dashboard">
                Dashboard
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <main className="container" role="main">
        {children}
      </main>
    </div>
  );
}
