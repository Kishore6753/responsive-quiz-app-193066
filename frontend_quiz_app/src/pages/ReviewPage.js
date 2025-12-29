import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAttemptById } from '../services/quizRepository';

// PUBLIC_INTERFACE
export default function ReviewPage() {
  /** Review screen showing correct answers and user selections per question. */
  const { attemptId } = useParams();
  const attempt = useMemo(() => getAttemptById(attemptId), [attemptId]);

  if (!attempt) {
    return (
      <div className="card card-pad">
        <h1 className="h1">Review not available</h1>
        <p className="p">That attempt does not exist (maybe it was cleared).</p>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <Link className="btn btn-primary" to="/" aria-label="Back to dashboard">
            Go to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { questions = [], quizTitle } = attempt.snapshot || {};
  const answersByQuestionId = attempt.answersByQuestionId || {};

  return (
    <div className="grid">
      <section className="card card-pad" aria-label="Review header">
        <h1 className="h1">Review: {quizTitle || attempt.quizId}</h1>
        <p className="p">
          Correct answers are highlighted. Your selections are shown for each question.
        </p>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <Link className="btn" to={`/results/${attempt.id}`} aria-label="Back to results">
            Back to results
          </Link>
          <Link className="btn btn-ghost" to="/" aria-label="Back to dashboard">
            Dashboard
          </Link>
        </div>
      </section>

      {questions.map((q, idx) => {
        const selected = answersByQuestionId[q.id] || [];
        const correct = q.correctOptionIds || [];

        const selectedKey = [...selected].sort().join('|');
        const correctKey = [...correct].sort().join('|');
        const isCorrect = selectedKey === correctKey;

        return (
          <article key={q.id} className="card card-pad" aria-label={`Review question ${idx + 1}`}>
            <div className="pills">
              <span className={`pill ${isCorrect ? 'pill-success' : 'pill-danger'}`}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
              <span className="pill">{q.type === 'multiple' ? 'Multiple choice' : 'Single choice'}</span>
            </div>

            <h2 style={{ margin: '10px 0 0', fontSize: 16, fontWeight: 900 }}>
              {idx + 1}. {q.prompt}
            </h2>

            <div className="divider" />

            <div className="grid" aria-label="Answer options review">
              {q.options.map((opt) => {
                const isSelected = selected.includes(opt.id);
                const isCorrectOpt = correct.includes(opt.id);

                const className = `option ${
                  isCorrectOpt ? 'option-correct' : isSelected && !isCorrectOpt ? 'option-wrong' : ''
                }`;

                return (
                  <div key={opt.id} className={className} aria-label={`Option ${opt.text}`}>
                    <div style={{ minWidth: 18, fontWeight: 900 }}>
                      {isCorrectOpt ? '✓' : isSelected ? '•' : ''}
                    </div>
                    <div>
                      <div className="option-title">{opt.text}</div>
                      <div className="option-meta">
                        {isCorrectOpt ? 'Correct answer' : isSelected ? 'Your choice' : 'Not selected'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {q.explanation ? (
              <p className="help" style={{ marginTop: 12 }}>
                <strong>Explanation:</strong> {q.explanation}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
