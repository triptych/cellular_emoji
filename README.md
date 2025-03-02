# Emoji Cellular Automata

A web-based simulator for cellular automata that renders cells as emojis. This interactive tool allows users to configure rulesets, save/load configurations, and visualize the evolution of cellular automata in real-time.

## Features

- **Interactive Grid System**: Responsive grid-based layout that adapts to different screen sizes with zoom functionality
- **Emoji Cell Representation**: Cells are rendered as emojis based on their values (0-100)
- **Flexible Rule Configuration**: Intuitive syntax for defining complex rules that determine cell behavior
- **Preset Automata**: Built-in presets for common cellular automata:
  - Conway's Game of Life
  - Forest Fire
  - Cyclic Cellular Automaton
  - Brian's Brain
- **Save/Load System**: Save, load, export, and import custom configurations
- **Statistics Tracking**: Real-time statistics on population, generations, and value distribution

## Technical Implementation

The simulator is built with performance in mind:
- Uses typed arrays (Uint8Array) for efficient memory management
- Implements ping-pong buffering for state updates
- Precalculates neighbor indices to avoid redundant calculations
- Optimized for real-time interactivity

## How to Use

1. **Grid Settings**: Adjust the width, height, and cell size of the grid
2. **Simulation Controls**: Play, pause, step through generations, or clear the grid
3. **Random Fill**: Populate the grid with random values based on a percentage
4. **Rules**: Create custom rules or load presets to define cell behavior
5. **Save/Load**: Save your configurations for later use or share them with others

## Getting Started

Simply open `index.html` in a web browser to start using the simulator. No installation or additional dependencies required.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author

Created by [Andrew Wooldridge](https://andreww.xyz)
