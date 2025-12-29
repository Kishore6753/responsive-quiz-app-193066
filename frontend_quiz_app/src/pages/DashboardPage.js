import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuizContext } from '../state/QuizContext';
import { formatDateTime } from '../utils/format';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Home/Dashboard screen listing available quizzes and recent attempt history. */
  const { quizzes, attempts, actions } = useQuizContext();

  const recent = useMemo(() => attempts.slice(0, 6), [attempts]);

  return (
    <div className="grid grid-2">
      <section className="card card-pad" aria-label="Quiz list">
        <h1 className="h1">Choose a quiz</h1>
        <p className="p">Pick a quiz to start. Your attempts are saved locally in this browser.</p>

        <div className="divider" />

        <div className="grid" aria-label="Available quizzes">
          {quizzes.map((q) => (
            <article key={q.id} className="card card-pad" aria-label={`Quiz: ${q.title}`}>
              <div className="pills" aria-label="Quiz metadata">
                <span className="pill pill-primary">{q.difficulty}</span>
                <span className="pill">{q.questions.length} questions</span>
                <span className="pill">{q.estimatedMinutes} min</span>
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 900, fontSize: 16 }}>{q.title}</div>
                <p className="p" style={{ marginTop: 6 }}>
                  {q.description}
                </p>
              </div>

              <div className="btn-row" style={{ marginTop: 12 }}>
                <Link className="btn btn-primary" to={`/quiz/${q.id}`} aria-label={`Start ${q.title}`}>
                  Start quiz
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="card card-pad" aria-label="Recent scores">
        <h2 className="section-title">Recent scores</h2>

        {recent.length === 0 ? (
          <div>
            <p className="p">
              No attempts yet. Start a quiz to see your scores and review answers here.
            </p>
            <div className="divider" />
            <p className="help">
              Tip: Your attempt history is stored in <strong>localStorage</strong>, so it persists across refreshes.
            </p>
          </div>
        ) : (
          <div>
            <table className="table" aria-label="Recent attempts table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th className="sr-only">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id}>
                    <td>{a.snapshot?.quizTitle || a.quizId}</td>
                    <td style={{ fontWeight: 900 }}>{a.score?.percent ?? 0}%</td>
                    <td>{formatDateTime(a.completedAt)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link className="btn" to={`/results/${a.id}`} aria-label={`View results for ${a.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className="btn btn-danger" onClick={actions.clearAttempts} aria-label="Clear all attempts">
                Clear attempts
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
