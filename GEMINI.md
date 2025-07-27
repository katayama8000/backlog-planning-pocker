# GitHub Copilot Instructions

This is a planning poker application built with Next.js, TypeScript, and TailwindCSS. The UI is designed for Japanese users.

## Core Guidelines

- **TypeScript First:** Prioritize type safety. All type errors must be resolved before committing.
- **Modern React:** Use functional components and React Hooks (`useState`, `useEffect`, custom hooks) for all state management and logic.
- **Exports:** Use `export function` (named exports). The only exception is Next.js pages (`app/page.tsx`), which require a `export default`.
- **Styling:** Use TailwindCSS for all styling.
- **Components:** Keep components small, reusable, and focused on a single responsibility.
- **Clarity:** Use the early return pattern and add comments only for complex logic (`why`, not `what`).

## Key Feature: Backlog Integration

- The app integrates with the Backlog API using the `backlog-js` library.
- The `BacklogConnection` component manages API authentication and fetches issues.
- Fetched Backlog issues are used as the stories for planning poker.