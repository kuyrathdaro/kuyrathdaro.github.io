# Project Rules and Guidelines

## Technology Stack
- **Framework**: Astro (v6)
- **UI Library**: React (v19)
- **Styling**: Tailwind CSS (v4) & regular CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React & Astro Icon

## General Coding Rules
- Write clean, maintainable, and modular code.
- Prefer TypeScript for all new files to maintain type safety.
- Keep components small, focused, and reusable.
- Ensure all components are fully responsive across mobile, tablet, and desktop views.
- Use semantic HTML tags for better accessibility and SEO.

## Astro Specifics
- Prefer `.astro` files for static content and layout components.
- Use React ONLY when client-side interactivity or state management is needed (`client:load`, `client:visible`, etc.).
- Utilize Astro's routing and layout system effectively.

## Styling (Tailwind CSS v4)
- Use Tailwind CSS utility classes for styling whenever possible.
- Use `clsx` and `tailwind-merge` (`twMerge`) for conditionally joining Tailwind classes.
- Make use of standard Tailwind v4 conventions.
- Custom global styles should go into `src/styles/global.css`.

## Animations
- Use `framer-motion` for complex React component animations.
- Ensure animations are smooth and do not negatively impact performance.
- Respect `prefers-reduced-motion` for accessibility.

## State Management
- Prefer local component state (React `useState`, `useReducer`) where possible.
- Avoid passing props too deep (prop drilling).

## Git & Version Control
- Write detailed, descriptive commit messages.
- Branch off appropriately before making significant changes.
