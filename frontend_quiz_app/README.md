# Responsive Quiz App (Frontend-only)

A mobile-first quiz application built with React. All quizzes and attempts are stored in **browser localStorage** (no backend).

## Features

- **Dashboard/Home**
  - Browse available quizzes (seeded with 3 example quizzes)
  - See recent attempts and scores
  - Empty state when no attempts exist
  - Clear attempts button (localStorage)

- **Quiz Taking**
  - Single-choice and multiple-choice questions
  - Progress indicator + question navigation
  - Submit enabled only after all questions are answered
  - Basic accessibility (labels, keyboard-friendly inputs)

- **Results**
  - Score summary (correct/total/percent)
  - Actions: review answers, retry, back to dashboard

- **Review**
  - See each question with:
    - Correct answer(s)
    - Your selection(s)
    - Explanation (when provided)

## Data Persistence

- Quizzes are seeded into localStorage on first load.
- Attempts are stored with a stable snapshot of quiz questions at the time of completion.

## How to run

From this directory:

```bash
npm install
npm start
```

Open http://localhost:3000

## Notes

- No external services are used.
- Theme uses accents: `#3b82f6` (primary) and `#06b6d4` (accent).
