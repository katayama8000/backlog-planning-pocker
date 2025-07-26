# GitHub Copilot Instructions

This project is a planning poker application using Next.js, TypeScript, and TailwindCSS.

## Coding Guidelines

### Basic Policy
- Use **Named Export** as a rule (do not use default export)
- Emphasize TypeScript type safety
- Use functional components
- Use React hooks appropriately
- Prefer arrow functions for defining functions whenever possible

### Export/Import Rules
```typescript
// ❌ Default Export (do not use)
export default function Component() {}
import Component from './Component';

// ✅ Named Export (recommended)
export function Component() {}
import { Component } from './Component';

// Exception: Next.js page components
export function Home() {}
export default Home; // Required for Next.js
```

### Component Design
- Follow the single responsibility principle
- Clearly define prop types
- Create reusable components
- Set appropriate defaultProps

### Type Definitions
```typescript
// Example type definitions
export type Player = {
  id: string;
  name: string;
  selectedCard: number | null;
  hasVoted: boolean;
};

export type Story = {
  id: string;
  title: string;
  description: string;
};
```

### Styling
- Use TailwindCSS

### State Management
- Use React Hooks (useState, useEffect, etc.)
- Explicitly specify generics for useState
- Use custom hooks to group related state and logic
- Minimize state
- Separate state appropriately

```typescript
// useState example
const [players, setPlayers] = useState<Player[]>([]);
const [isVisible, setIsVisible] = useState<boolean>(false);
const [message, setMessage] = useState<string>('');

// Custom hook example
const { isConnected, connect, disconnect } = useBacklogApi();
```

### Accessibility
- Use semantic HTML elements
- Set appropriate aria-label, aria-describedby
- Support keyboard navigation
- Consider information transmission beyond color

### Performance
- Avoid unnecessary re-rendering
- Use useCallback and useMemo appropriately
- Optimize images

## Development Notes
- Resolve type errors before committing
- Do not ignore ESLint warnings
- Clarify component responsibilities
- Write testable code
- Design for Japanese UI support

## Recommended Best Practices
- Use early return pattern
- Simplify conditional branches
- Add appropriate comments
- Keep functions pure
- Implement error handling

## Backlog API Integration
- Use the backlog-js library to integrate with the Backlog API
- Implement issue retrieval via API key authentication
- Use retrieved issues as planning poker topics
- Manage connection and issue selection in the BacklogConnection component
- Automatically convert issue information (issue key, summary, description, assignee, etc.) to stories
