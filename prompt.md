# Emoji Cellular Automata Simulator

## Project Overview

Create a web-based simulator for cellular automata that renders cells as emojis. The simulator should allow users to configure rulesets, save/load configurations, and visualize the evolution of the automata in real-time.

## Core Requirements

### Grid System
- Create a responsive grid-based layout that adapts to different screen sizes
- Allow users to configure grid dimensions (width × height)
- Implement zoom and pan functionality for large grids
- Support both square and hexagonal grid layouts (optional)

### Cell Representation
- Render each cell as an emoji based on its value (0-100)
- Create a mapping system where different value ranges correspond to different emojis
- Allow users to customize emoji mappings
- Example mapping:
  - 0: ⬜ (empty/dead cell)
  - 1-20: 🌱 (new growth)
  - 21-40: 🌿 (young)
  - 41-60: 🌳 (mature)
  - 61-80: 🔥 (burning)
  - 81-100: 🪨 (burnt out)

### Rule Configuration
- Implement a simple, intuitive syntax for defining rules
- Rules should follow this format: "If a cell has value X and is surrounded by Y neighbors with values in range Z, then set its value to W in the next generation"
- Support multiple rules that can be prioritized
- Include preset rule configurations for common automata (Conway's Game of Life, Forest Fire, etc.)
- Example rule: "If cell value = 0 AND 3 neighbors with value > 0, then cell value = 20"

### Save/Load System
- Allow users to save and name their custom rulesets
- Implement local storage for saving configurations
- Enable sharing configurations via URL parameters or exportable JSON
- Include a library of preset configurations

### User Interface
- Create an intuitive control panel for adjusting parameters
- Implement play/pause/step controls for simulation
- Add speed control for adjusting simulation rate
- Include a clear button to reset the grid
- Provide a random initialization option with configurable parameters

## Technical Implementation

### Performance Optimization
Based on the findings document, implement these optimizations:
- Use typed arrays (Uint8Array) for efficient memory management
- Implement ping-pong buffering for state updates
- Precalculate neighbor indices to avoid redundant calculations
- Consider using Web Workers for background processing on large grids
- Optimize for smaller grids (64×64) for real-time interactivity

### Technology Stack
- **HTML5**: Semantic markup for structure
- **CSS3**: Responsive design with Grid/Flexbox
- **Vanilla JavaScript**: No external libraries or frameworks
- **SVG**: For UI elements and potentially grid visualization
- **Emoji**: Unicode emojis for cell representation
- **LocalStorage API**: For saving/loading configurations

### Code Organization
- Separate concerns into modules:
  - Grid management
  - Rule processing
  - Rendering
  - UI controls
  - Storage handling
- Use ES6+ features for clean, maintainable code
- Document code thoroughly with comments

## Bonus Features

- Implement statistics tracking (population counts, generation metrics)
- Add heatmap visualization mode
- Create a rule builder with visual interface
- Support for different neighborhood types (Moore, Von Neumann, etc.)
- Add export functionality for animations/screenshots
- Implement custom emoji upload

## Deliverables

1. Index.html with complete application
2. CSS file(s) for styling
3. JavaScript file(s) for application logic
4. Documentation explaining the implementation and how to use the simulator
5. Example configurations demonstrating different automata behaviors

## Implementation Notes

- Focus on performance optimization for smooth animation
- Ensure the UI is intuitive and accessible
- Make the design visually appealing but prioritize functionality
- Test across different browsers and devices
- Consider progressive enhancement for older browsers
