import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizById, saveCompletedAttempt } from '../services/quizRepository';
import QuestionCard from '../components/QuestionCard';

// PUBLIC_INTERFACE
export default function QuizTakingPage() {
  /** Quiz taking screen with question navigation and submission. */
  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz = useMemo(() => getQuizById(quizId), [quizId]);

  const [startedAt] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [answersByQuestionId, setAnswersByQuestionId] = useState({});

  useEffect(() => {
    if (!quiz) navigate('/', { replace: true });
  }, [quiz, navigate]);

  const total = quiz?.questions?.length || 0;
  const current = quiz?.questions?.[index];

  const progressPct = total === 0 ? 0 : Math.round(((index + 1) / total) * 100);

  const onSetAnswer = useCallback(
    (questionId, selectedOptionIds) => {
      setAnswersByQuestionId((prev) => ({ ...prev, [questionId]: selectedOptionIds }));
    },
    [setAnswersByQuestionId]
  );

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total]);

  const answeredCount = useMemo(() => Object.keys(answersByQuestionId).length, [answersByQuestionId]);

  const canSubmit = total > 0 && answeredCount === total;

  const submit = useCallback(() => {
    if (!quiz) return;
    const completedAt = Date.now();
    const attempt = saveCompletedAttempt({ quiz, startedAt, completedAt, answersByQuestionId });
    navigate(`/results/${attempt.id}`, { replace: true });
  }, [quiz, startedAt, answersByQuestionId, navigate]);

  if (!quiz || !current) return null;

  return (
    <div className="grid">
      <section className="card card-pad" aria-label="Quiz header">
        <div className="pills">
          <span className="pill pill-primary">{quiz.difficulty}</span>
          <span className="pill">{quiz.questions.length} questions</span>
          <span className="pill">Answered {answeredCount}/{total}</span>
        </div>

        <h1 className="h1" style={{ marginTop: 10 }}>
          {quiz.title}
        </h1>
        <p className="p">{quiz.description}</p>

        <div className="divider" />
        <div className="progress" aria-label="Quiz progress">
          <span style={{ width: `${progressPct}%` }} />
        </div>
        <div className="help" aria-label="Progress details">
          Question {index + 1} of {total}
        </div>
      </section>

      <QuestionCard
        quizId={quiz.id}
        question={current}
        questionNumber={index + 1}
        totalQuestions={total}
        selectedOptionIds={answersByQuestionId[current.id] || []}
        onChangeSelected={(ids) => onSetAnswer(current.id, ids)}
      />

      <section className="card card-pad" aria-label="Quiz navigation">
        <div className="btn-row">
          <button className="btn" onClick={goPrev} disabled={index === 0} aria-label="Previous question">
            Prev
          </button>
          <button className="btn" onClick={goNext} disabled={index === total - 1} aria-label="Next question">
            Next
          </button>

          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={!canSubmit}
            aria-label="Submit quiz"
            title={!canSubmit ? 'Answer all questions to submit' : 'Submit quiz'}
          >
            Submit
          </button>

          <button className="btn btn-ghost" onClick={() => navigate('/')} aria-label="Exit quiz">
            Exit
          </button>
        </div>

        {!canSubmit ? (
          <p className="help" style={{ marginTop: 10 }}>
            You can navigate between questions. Submission is enabled once all questions are answered.
          </p>
        ) : null}
      </section>
    </div>
  );
}
