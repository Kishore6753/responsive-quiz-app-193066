import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAttemptById, getQuizById } from '../services/quizRepository';
import { formatDateTime } from '../utils/format';

// PUBLIC_INTERFACE
export default function ResultsPage() {
  /** Results screen showing score and navigation actions to review or retry. */
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const attempt = useMemo(() => getAttemptById(attemptId), [attemptId]);
  const quiz = useMemo(() => (attempt ? getQuizById(attempt.quizId) : null), [attempt]);

  const score = attempt?.score || { correctCount: 0, total: 0, percent: 0 };

  if (!attempt) {
    return (
      <div className="card card-pad">
        <h1 className="h1">Results not found</h1>
        <p className="p">That attempt does not exist (maybe it was cleared).</p>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <Link className="btn btn-primary" to="/" aria-label="Back to dashboard">
            Go to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const pillClass =
    score.percent >= 80 ? 'pill-success' : score.percent >= 50 ? 'pill-primary' : 'pill-danger';

  return (
    <div className="grid">
      <section className="card card-pad" aria-label="Score summary">
        <div className="pills">
          <span className={`pill ${pillClass}`}>{score.percent}%</span>
          <span className="pill">
            {score.correctCount}/{score.total} correct
          </span>
          <span className="pill">{formatDateTime(attempt.completedAt)}</span>
        </div>

        <h1 className="h1" style={{ marginTop: 10 }}>
          {attempt.snapshot?.quizTitle || 'Quiz results'}
        </h1>

        <p className="p">
          Review your answers to learn what you got right and where you can improve.
        </p>

        <div className="divider" />

        <dl aria-label="Score details">
          <div className="kv">
            <dt>Correct</dt>
            <dd>{score.correctCount}</dd>
          </div>
          <div className="kv">
            <dt>Total</dt>
            <dd>{score.total}</dd>
          </div>
          <div className="kv">
            <dt>Score</dt>
            <dd>{score.percent}%</dd>
          </div>
        </dl>

        <div className="btn-row" style={{ marginTop: 14 }}>
          <Link className="btn btn-primary" to={`/review/${attempt.id}`} aria-label="Review answers">
            Review answers
          </Link>

          {quiz ? (
            <button
              className="btn"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              aria-label="Retry quiz"
              title="Retry starts a new attempt"
            >
              Retry
            </button>
          ) : null}

          <Link className="btn btn-ghost" to="/" aria-label="Back to dashboard">
            Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
