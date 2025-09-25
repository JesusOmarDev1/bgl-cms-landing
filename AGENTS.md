# BGL CMS Landing Agent Instructions

## Project Structure

- **Frontend Application**: Located in the `src/` directory with Next.js 15 App Router architecture
  - `src/app/` - Next.js App Router pages and API routes
  - `src/components/` - Reusable React components organized by feature
  - `src/access/` - Payload CMS access control functions
  - `src/Footer/` - Footer component with hooks and utilities
  - `src/Header/` - Header component with navigation and sheet components
- **Payload CMS Configuration**: Located in `src/app/(payload)/` directory
  - Contains Payload CMS admin interface and configuration
- **Database**: SQLite database file `bgl-cms.db` for development
- **Testing**: Located in `tests/` directory
  - `tests/e2e/` - End-to-end tests with Playwright
  - `tests/int/` - Integration tests
- **Configuration Files**:
  - `package.json` - Dependencies and scripts
  - `next.config.js` - Next.js configuration
  - `tailwind.config.mjs` - TailwindCSS configuration
  - `payload.config.ts` - Payload CMS configuration
  - `tsconfig.json` - TypeScript configuration

## Technology Stack

- **Next.js 15.4.4**: App Router, Server Components, Server Actions, Turbopack
- **React 19.1.0**: Latest React patterns and hooks
- **Payload CMS 3.53.0**: Headless CMS with SQLite adapter
- **TypeScript 5.7.3**: Strict typing and best practices
- **TailwindCSS 4.1.12**: Utility-first styling
- **SQLite**: Database adapter for development

## Dev Environment Tips

- **Start Development Server**: Use `pnpm dev` to start the development server with Turbopack
- **Environment Variables**: Copy `.env.example` to `.env` and configure:
  - `DATABASE_URI` - SQLite database connection
  - `PAYLOAD_SECRET` - Payload CMS secret key
  - `NEXT_PUBLIC_SERVER_URL` - Public server URL
  - `CRON_SECRET` - Cron job secret
  - `PREVIEW_SECRET` - Preview mode secret
- **Build Commands**:
  - `pnpm build` - Build the application for production
  - `pnpm start` - Start the production server
- **Database Management**:
  - Database file is `bgl-cms.db` in the root directory
  - Use Payload admin interface to manage content
- **Code Quality**:
  - `pnpm lint` - Run ESLint for code quality checks
  - `pnpm format` - Format code with Prettier

## Testing Instructions

- **Unit Tests**: Run with `pnpm test:unit` using Vitest
- **Integration Tests**: Run with `pnpm test:int` for API and component integration tests
- **E2E Tests**: Run with `pnpm test:e2e` using Playwright
- **All Tests**: Run with `pnpm test` to execute the complete test suite
- **Test Configuration**:
  - `vitest.config.mts` - Vitest configuration
  - `playwright.config.ts` - Playwright configuration
  - `vitest.setup.ts` - Test setup and utilities

## Content Management

- **Payload CMS Admin**: Access at `/admin` when server is running
- **Collections**: Configure in `src/app/(payload)/config.ts`
- **Media Management**: File uploads and media library management
- **User Management**: Admin users and access control
- **Rich Text Editor**: Lexical-based content editing with Spanish language support

## Deployment Guidelines

- **Build Process**: Use `pnpm build` to create production build
- **Environment Setup**: Ensure all environment variables are configured for production
- **Static Generation**: Next.js handles static site generation automatically
- **Database**: Production database should be configured appropriately

## Code Style Guidelines

- **TypeScript**: Strict typing with proper interfaces and type definitions
- **Component Structure**: Use functional components with hooks
- **Styling**: TailwindCSS utility classes with custom design tokens
- **File Organization**: Feature-based organization within directories
- **Imports**: Group imports by external libraries, then internal modules

## PR Guidelines

- **Conventional Commits**: Follow conventional commit format for PR titles
- **PR Title Format**: `<type>(<scope>): <title>` - Title must start with lowercase letter
- **Valid Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Valid Scopes**: `components`, `admin`, `frontend`, `api`, `database`, `config`, `tests`
- **Examples**:
  - `feat(components): add new product card component`
  - `fix(admin): resolve image upload issue`
  - `docs: update README with deployment instructions`

## Commit Guidelines

- **First Commit**: Must follow PR title format with proper type and scope
- **Subsequent Commits**: Use `chore` type without scope for ongoing work
- **Message Format**: Keep commit messages clear and descriptive
- **Squash Strategy**: Commits will be squashed into the first commit when merging
