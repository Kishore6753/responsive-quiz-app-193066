import React, { useCallback, useMemo } from 'react';

// PUBLIC_INTERFACE
export default function QuestionCard({
  quizId,
  question,
  questionNumber,
  totalQuestions,
  selectedOptionIds,
  onChangeSelected
}) {
  /** Renders a single question with accessible single/multiple choice options. */

  const isMultiple = question.type === 'multiple';
  const groupName = useMemo(() => `quiz_${quizId}_q_${question.id}`, [quizId, question.id]);

  const toggle = useCallback(
    (optId) => {
      if (!isMultiple) {
        onChangeSelected([optId]);
        return;
      }
      const has = selectedOptionIds.includes(optId);
      const next = has ? selectedOptionIds.filter((x) => x !== optId) : [...selectedOptionIds, optId];
      onChangeSelected(next);
    },
    [isMultiple, selectedOptionIds, onChangeSelected]
  );

  const inputType = isMultiple ? 'checkbox' : 'radio';

  return (
    <section className="card card-pad" aria-label={`Question ${questionNumber} of ${totalQuestions}`}>
      <div className="pills">
        <span className="pill pill-primary">
          Question {questionNumber}/{totalQuestions}
        </span>
        <span className="pill">{isMultiple ? 'Select all that apply' : 'Select one'}</span>
      </div>

      <h2 style={{ margin: '10px 0 0', fontSize: 18, fontWeight: 900 }}>{question.prompt}</h2>

      <p className="help" style={{ marginTop: 8 }}>
        Use Tab/Shift+Tab to move through options. Use Space/Enter to toggle selection.
      </p>

      <div className="divider" />

      <div className="grid" role="group" aria-label="Answer choices">
        {question.options.map((opt) => {
          const checked = selectedOptionIds.includes(opt.id);
          const inputId = `${groupName}_${opt.id}`;

          return (
            <label
              key={opt.id}
              className="option"
              htmlFor={inputId}
              aria-label={`Option: ${opt.text}`}
            >
              <input
                id={inputId}
                type={inputType}
                name={groupName}
                checked={checked}
                onChange={() => toggle(opt.id)}
                aria-label={opt.text}
              />
              <div>
                <div className="option-title">{opt.text}</div>
                <div className="option-meta">{checked ? 'Selected' : 'Not selected'}</div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
