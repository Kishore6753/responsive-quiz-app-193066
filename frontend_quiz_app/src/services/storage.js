/**
 * LocalStorage helper with defensive parsing.
 * All quiz data is stored locally (no backend).
 */

const KEY_PREFIX = 'rqz_v1';

export const STORAGE_KEYS = {
  quizzes: `${KEY_PREFIX}:quizzes`,
  attempts: `${KEY_PREFIX}:attempts`
};

/**
 * PUBLIC_INTERFACE
 * Read JSON from localStorage, returning a fallback when missing/invalid.
 */
export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * Write JSON to localStorage.
 */
export function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * PUBLIC_INTERFACE
 * Remove a key from localStorage.
 */
export function removeKey(key) {
  window.localStorage.removeItem(key);
}
