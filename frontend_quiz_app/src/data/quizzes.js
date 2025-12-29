/**
 * Seed quiz data model.
 * - Questions support single choice and multiple choice.
 * - correctOptionIds is always an array (length 1 for single).
 */

export const seedQuizzes = [
  {
    id: 'web-basics',
    title: 'Web Basics',
    description: 'HTML, CSS, and accessibility fundamentals.',
    difficulty: 'Easy',
    estimatedMinutes: 6,
    questions: [
      {
        id: 'q1',
        type: 'single',
        prompt: 'What does HTML stand for?',
        options: [
          { id: 'a', text: 'HyperText Markup Language' },
          { id: 'b', text: 'High Transfer Markdown Language' },
          { id: 'c', text: 'Home Tool Markup Language' },
          { id: 'd', text: 'Hyperlink and Text Management Layer' }
        ],
        correctOptionIds: ['a'],
        explanation: 'HTML is the standard markup language used to create web pages.'
      },
      {
        id: 'q2',
        type: 'multiple',
        prompt: 'Which of these improve accessibility? (Select all that apply)',
        options: [
          { id: 'a', text: 'Providing meaningful alt text for images' },
          { id: 'b', text: 'Using heading levels in order (h1 → h2 → h3)' },
          { id: 'c', text: 'Relying only on color to convey important information' },
          { id: 'd', text: 'Using label elements for form controls' }
        ],
        correctOptionIds: ['a', 'b', 'd'],
        explanation:
          'Alt text, semantic headings, and proper labels help assistive technologies; color-only cues are not sufficient.'
      },
      {
        id: 'q3',
        type: 'single',
        prompt: 'In CSS, what does “display: flex” primarily enable?',
        options: [
          { id: 'a', text: 'GPU-accelerated animations by default' },
          { id: 'b', text: 'A flexible layout model for arranging items in a row/column' },
          { id: 'c', text: 'Automatic CSS variable generation' },
          { id: 'd', text: 'Server-side rendering of styles' }
        ],
        correctOptionIds: ['b'],
        explanation: 'Flexbox provides a flexible way to align and distribute space among items in a container.'
      }
    ]
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Components, state, and rendering.',
    difficulty: 'Medium',
    estimatedMinutes: 8,
    questions: [
      {
        id: 'q1',
        type: 'single',
        prompt: 'What is the correct way to pass data from a parent to a child component?',
        options: [
          { id: 'a', text: 'Through props' },
          { id: 'b', text: 'Through localStorage only' },
          { id: 'c', text: 'By mutating the child state directly' },
          { id: 'd', text: 'By editing the DOM manually' }
        ],
        correctOptionIds: ['a'],
        explanation: 'Props are the standard way to pass data down the component tree.'
      },
      {
        id: 'q2',
        type: 'multiple',
        prompt: 'Which statements about React state are true? (Select all that apply)',
        options: [
          { id: 'a', text: 'State updates may be batched and are asynchronous' },
          { id: 'b', text: 'You should treat state as immutable' },
          { id: 'c', text: 'You should always modify state directly for performance' },
          { id: 'd', text: 'State can be managed with hooks like useState' }
        ],
        correctOptionIds: ['a', 'b', 'd'],
        explanation: 'React state is immutable by convention; updates can be batched; hooks like useState manage state.'
      },
      {
        id: 'q3',
        type: 'single',
        prompt: 'What does a key prop help React with when rendering lists?',
        options: [
          { id: 'a', text: 'Encrypting list items' },
          { id: 'b', text: 'Identifying which items changed to optimize re-renders' },
          { id: 'c', text: 'Changing CSS specificity' },
          { id: 'd', text: 'Preventing network requests' }
        ],
        correctOptionIds: ['b'],
        explanation: 'Stable keys help React reconcile list items efficiently.'
      }
    ]
  },
  {
    id: 'general-trivia',
    title: 'General Trivia',
    description: 'A quick mix of fun questions.',
    difficulty: 'Easy',
    estimatedMinutes: 5,
    questions: [
      {
        id: 'q1',
        type: 'single',
        prompt: 'Which planet is known as the Red Planet?',
        options: [
          { id: 'a', text: 'Venus' },
          { id: 'b', text: 'Mars' },
          { id: 'c', text: 'Jupiter' },
          { id: 'd', text: 'Mercury' }
        ],
        correctOptionIds: ['b'],
        explanation: 'Mars appears red due to iron oxide (rust) on its surface.'
      },
      {
        id: 'q2',
        type: 'multiple',
        prompt: 'Select the primary colors of light (additive).',
        options: [
          { id: 'a', text: 'Red' },
          { id: 'b', text: 'Green' },
          { id: 'c', text: 'Blue' },
          { id: 'd', text: 'Yellow' }
        ],
        correctOptionIds: ['a', 'b', 'c'],
        explanation: 'Additive primaries are RGB.'
      },
      {
        id: 'q3',
        type: 'single',
        prompt: 'How many continents are there on Earth?',
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '6' },
          { id: 'c', text: '7' },
          { id: 'd', text: '8' }
        ],
        correctOptionIds: ['c'],
        explanation: 'There are 7 commonly recognized continents.'
      }
    ]
  }
];
