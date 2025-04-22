# Life Restart Simulator (人生重开模拟器)

[简体中文](README.md) | English

A life simulation game based on React and TypeScript that allows players to experience different life paths.

## Game Introduction

Life Restart Simulator is a game that simulates life experiences, where players can:
- Choose different talents to start a new life
- Experience various life stages from childhood to old age
- Deal with random events and make choices that affect the future
- Finally view a summary and statistics of their life journey

## Game Mechanics

### Life Attributes

The game tracks various life attributes including:
- Basic attributes: health, intelligence, charm, wealth, happiness
- Social attributes: family, relationships, marriage, children
- Career attributes: study, career
- Personal attributes: stress, luck, willpower, creativity, independence, talent

### Life Stages

Life is divided into four main stages:
- Childhood (0-10 years)
- Adolescence (10-18 years)
- Adulthood (18-65 years)
- Old Age (65+ years)

### Gameplay Flow

1. **Talent Selection**: Players allocate talent points to different talents
2. **Life Progression**: Players advance through life year by year
3. **Random Events**: Events occur based on current life stage and attributes
4. **Choices**: Some events present choices that affect future outcomes
5. **Life Summary**: At the end, players receive a summary of their life journey

## Tech Stack

- React 19
- TypeScript
- Vite 6

## Development Guide

### Install Dependencies

```
npm install
```

### Run Development Server

```
npm run dev
```

### Build for Production

```
npm run build
```

### Preview Production Build

```
npm run preview
```

## Project Structure

- **src/App.tsx**: Main application component that manages game state and screen transitions
- **src/components/**: UI components
  - StartScreen: Initial screen for talent selection
  - EventScreen: Main gameplay screen showing life events and choices
  - SummaryScreen: Final screen showing life summary and statistics
- **src/logic/**: Game logic implementation
  - LifeSimulator.js: Core game engine
- **src/data/**: Game data files
  - events.js: Collection of life events
  - talents.js: Available talents
