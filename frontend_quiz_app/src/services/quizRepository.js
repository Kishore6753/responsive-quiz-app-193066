import { seedQuizzes } from '../data/quizzes';
import { readJson, STORAGE_KEYS, writeJson } from './storage';

/**
 * Attempt schema:
 * {
 *   id: string,
 *   quizId: string,
 *   startedAt: number,
 *   completedAt: number,
 *   score: { correctCount, total, percent },
 *   answersByQuestionId: { [questionId]: string[] },  // selected option ids
 *   snapshot: {
 *     quizTitle: string,
 *     questions: Array<{ id, type, prompt, options, correctOptionIds }>
 *   }
 * }
 */

function ensureSeededQuizzes() {
  const existing = readJson(STORAGE_KEYS.quizzes, null);
  if (existing && Array.isArray(existing) && existing.length > 0) return existing;
  writeJson(STORAGE_KEYS.quizzes, seedQuizzes);
  return seedQuizzes;
}

/** PUBLIC_INTERFACE */
export function getAllQuizzes() {
  /** Returns all quizzes (seeded on first run). */
  return ensureSeededQuizzes();
}

/** PUBLIC_INTERFACE */
export function getQuizById(quizId) {
  /** Returns a quiz by id or null. */
  const quizzes = ensureSeededQuizzes();
  return quizzes.find((q) => q.id === quizId) || null;
}

/** PUBLIC_INTERFACE */
export function getAttempts() {
  /** Returns attempts sorted by completedAt desc. */
  const attempts = readJson(STORAGE_KEYS.attempts, []);
  return [...attempts].sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
}

/** PUBLIC_INTERFACE */
export function getAttemptById(attemptId) {
  /** Returns a specific attempt or null. */
  const attempts = readJson(STORAGE_KEYS.attempts, []);
  return attempts.find((a) => a.id === attemptId) || null;
}

function computeScore(quiz, answersByQuestionId) {
  const total = quiz.questions.length;
  let correctCount = 0;

  for (const q of quiz.questions) {
    const selected = answersByQuestionId[q.id] || [];
    const correct = q.correctOptionIds;

    // Normalize sorting for multiple choice
    const a = [...selected].sort().join('|');
    const b = [...correct].sort().join('|');
    if (a === b) correctCount += 1;
  }

  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  return { correctCount, total, percent };
}

function makeId() {
  return `att_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

/** PUBLIC_INTERFACE */
export function saveCompletedAttempt({ quiz, startedAt, completedAt, answersByQuestionId }) {
  /**
   * Saves a completed quiz attempt (including a snapshot of questions for stable review).
   * Returns the created attempt.
   */
  const attempt = {
    id: makeId(),
    quizId: quiz.id,
    startedAt,
    completedAt,
    score: computeScore(quiz, answersByQuestionId),
    answersByQuestionId,
    snapshot: {
      quizTitle: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        options: q.options,
        correctOptionIds: q.correctOptionIds,
        explanation: q.explanation
      }))
    }
  };

  const attempts = readJson(STORAGE_KEYS.attempts, []);
  writeJson(STORAGE_KEYS.attempts, [attempt, ...attempts]);
  return attempt;
}

/** PUBLIC_INTERFACE */
export function clearAllAttempts() {
  /** Clears attempts only (quizzes remain). */
  writeJson(STORAGE_KEYS.attempts, []);
}
