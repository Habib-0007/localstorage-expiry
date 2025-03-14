# Installation and Publishing Guide

Follow these steps to set up, test, and publish the localstorage-expiry package:

## Setup

1. Create a new directory and initialize the repository:

```bash
mkdir localstorage-expiry
cd localstorage-expiry
git init
```

2. Create the file structure:

```
localstorage-expiry/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── src/
│   └── index.ts
├── tests/
│   └── index.test.ts
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
└── vitest.config.ts
```

3. Install dependencies:

```bash
npm install --save-dev typescript @types/jsdom jsdom vitest eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier
```

## Testing Locally

1. Build the package:

```bash
npm run build
```

2. Run tests:

```bash
npm test
```

3. Lint your code:

```bash
npm run lint
```

## Publishing to GitHub

1. Create a repository on GitHub named "localstorage-expiry"

2. Push your local repository to GitHub:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/habib-0007/localstorage-expiry.git
git push -u origin main
```

## Publishing to NPM

1. Log in to npm:

```bash
npm login
```

2. Add GitHub Secrets:

   - Go to your GitHub repository settings
   - Navigate to Secrets > Actions
   - Add a new secret named `NPM_TOKEN` with your npm token

3. Create a new release on GitHub:

   - Go to your repository
   - Click on "Releases" > "Create a new release"
   - Tag version: v1.0.1
   - Release title: v1.0.1
   - Description: Initial TypeScript release
   - Click "Publish release"

4. The GitHub Action will automatically publish to npm when the release is created.

## Manual Publishing to NPM

If you prefer to publish manually:

```bash
npm publish
```

## Updating the Package

1. Make your changes
2. Update version in package.json
3. Push changes to GitHub
4. Create a new release on GitHub
