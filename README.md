# Ollama Chat Interface

A modern web interface for interacting with your local Ollama instance. Built with React, TypeScript, and Vite.

## Table of Contents

- [Ollama Chat Interface](#ollama-chat-interface)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Local Ollama Setup](#local-ollama-setup)
  - [Development](#development)
  - [Tech Stack](#tech-stack)

## Features

- 🤖 Connect to your local Ollama instance
- 📝 Real-time streaming chat responses
- 🔄 Dynamic model switching between available Ollama models
- 💅 Clean UI with Tailwind CSS
- ⚡ Fast refresh and HMR with Vite

## Prerequisites

- [Ollama](https://ollama.com) installed and running locally
- Node.js
- pnpm (recommended) or npm

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
pnpm install
```

3. Start the development server:

```sh
pnpm dev
```

4. Open `http://localhost:5173` in your browser

## Local Ollama Setup

Make sure you have:

1. Ollama installed on your computer
2. The Ollama service running
3. Ollama accessible at `http://localhost:11434`

Visit ollama.com for installation instructions.

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- React Markdown
- Axios
