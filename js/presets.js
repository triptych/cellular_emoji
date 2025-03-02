/**
 * Preset configurations for different cellular automata
 */

/**
 * Conway's Game of Life rules:
 * 1. Any live cell with fewer than two live neighbors dies (underpopulation)
 * 2. Any live cell with two or three live neighbors lives on
 * 3. Any live cell with more than three live neighbors dies (overpopulation)
 * 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
 */
export function loadGameOfLife(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
    simulator.addRule({
        cellValue: {
            type: 'non-zero'
        },
        neighborCount: {
            type: 'less-than',
            value: 2
        },
        neighborValue: {
            type: 'non-zero'
        },
        newValue: 0
    });

    // 2. Any live cell with two or three live neighbors lives on
    // (This is handled by default - cells stay the same unless a rule changes them)

    // 3. Any live cell with more than three live neighbors dies (overpopulation)
    simulator.addRule({
        cellValue: {
            type: 'non-zero'
        },
        neighborCount: {
            type: 'greater-than',
            value: 3
        },
        neighborValue: {
            type: 'non-zero'
        },
        newValue: 0
    });

    // 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'exactly',
            value: 3
        },
        neighborValue: {
            type: 'non-zero'
        },
        newValue: 1
    });
}

/**
 * Forest Fire model:
 * - Empty (0) -> Tree (1) with probability p
 * - Tree (1) -> Burning (2) if any neighbor is burning
 * - Burning (2) -> Empty (0)
 */
export function loadForestFire(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // Empty to Tree (growth)
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'exactly',
            value: 1
        }, // Just a placeholder, actual growth is random
        neighborValue: {
            type: 'any'
        },
        newValue: 20 // Young tree
    });

    // Tree grows older
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 1,
            max: 40
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 40 // Mature tree
    });

    // Tree catches fire if neighbor is burning
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 20,
            max: 60
        },
        neighborCount: {
            type: 'greater-than',
            value: 0
        },
        neighborValue: {
            type: 'range',
            min: 61,
            max: 80
        },
        newValue: 70 // Burning
    });

    // Burning tree turns to ash
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 61,
            max: 80
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 90 // Ash
    });

    // Ash eventually clears
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 81,
            max: 100
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 0 // Empty
    });
}

/**
 * Cyclic Cellular Automaton:
 * Each cell cycles through states 0-5
 * A cell in state n changes to state n+1 if it has at least one neighbor in state n+1
 */
export function loadCyclic(simulator) {
    // Clear existing rules
    simulator.clearRules();

    for (let i = 0; i < 5; i++) {
        const nextState = (i + 1) % 6;
        const value = Math.floor(i * 20);
        const nextValue = Math.floor(nextState * 20);

        simulator.addRule({
            cellValue: {
                type: 'range',
                min: value,
                max: value + 19
            },
            neighborCount: {
                type: 'greater-than',
                value: 0
            },
            neighborValue: {
                type: 'range',
                min: nextValue,
                max: nextValue + 19
            },
            newValue: nextValue
        });
    }
}

/**
 * Brian's Brain:
 * 0 = dead, 1 = alive, 2 = dying
 * Dead -> Alive if exactly 2 alive neighbors
 * Alive -> Dying (always)
 * Dying -> Dead (always)
 */
export function loadBrianBrain(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // Dead to Alive
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'exactly',
            value: 2
        },
        neighborValue: {
            type: 'range',
            min: 1,
            max: 20
        },
        newValue: 10
    });

    // Alive to Dying
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 1,
            max: 20
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 70
    });

    // Dying to Dead
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 61,
            max: 80
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 0
    });
}

/**
 * Gradient Waves:
 * Cells gradually increase or decrease in value based on their neighbors,
 * creating wave-like patterns with smooth gradients.
 */
export function loadGradientWaves(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // Empty cells with higher-value neighbors grow
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 0,
            max: 90
        },
        neighborCount: {
            type: 'greater-than',
            value: 2
        },
        neighborValue: {
            type: 'range',
            min: 20,
            max: 100
        },
        newValue: 20 // Start growing
    });

    // Gradual growth
    for (let i = 20; i < 90; i += 10) {
        simulator.addRule({
            cellValue: {
                type: 'range',
                min: i,
                max: i + 9
            },
            neighborCount: {
                type: 'greater-than',
                value: 1
            },
            neighborValue: {
                type: 'range',
                min: i + 10,
                max: 100
            },
            newValue: i + 10 // Grow to next stage
        });
    }

    // Decay when overcrowded
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 50,
            max: 100
        },
        neighborCount: {
            type: 'greater-than',
            value: 5
        },
        neighborValue: {
            type: 'range',
            min: 50,
            max: 100
        },
        newValue: 40 // Decay
    });

    // Gradual decay
    for (let i = 40; i > 0; i -= 10) {
        simulator.addRule({
            cellValue: {
                type: 'range',
                min: i,
                max: i + 9
            },
            neighborCount: {
                type: 'less-than',
                value: 2
            },
            neighborValue: {
                type: 'any'
            },
            newValue: Math.max(0, i - 10) // Decay to previous stage
        });
    }
}

/**
 * Ecosystem Simulation:
 * A complex simulation with multiple stages of life, predator-prey relationships,
 * and environmental factors.
 *
 * Value ranges:
 * 0: Empty
 * 1-20: Seeds/Sprouts
 * 21-40: Young plants
 * 41-60: Mature plants
 * 61-70: Herbivores
 * 71-85: Predators
 * 86-100: Decay/Remains
 */
export function loadEcosystem(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // Seeds sprout in empty spaces
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'range',
            min: 1,
            max: 3
        },
        neighborValue: {
            type: 'range',
            min: 21,
            max: 60
        },
        newValue: 10 // Seed/Sprout
    });

    // Plants grow
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 1,
            max: 20
        },
        neighborCount: {
            type: 'less-than',
            value: 5
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 30 // Young plant
    });

    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 21,
            max: 40
        },
        neighborCount: {
            type: 'less-than',
            value: 6
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 50 // Mature plant
    });

    // Herbivores appear near plants
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'greater-than',
            value: 3
        },
        neighborValue: {
            type: 'range',
            min: 41,
            max: 60
        },
        newValue: 65 // Herbivore
    });

    // Herbivores eat plants
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 41,
            max: 60
        },
        neighborCount: {
            type: 'greater-than',
            value: 0
        },
        neighborValue: {
            type: 'range',
            min: 61,
            max: 70
        },
        newValue: 0 // Plant eaten
    });

    // Predators appear near herbivores
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'greater-than',
            value: 2
        },
        neighborValue: {
            type: 'range',
            min: 61,
            max: 70
        },
        newValue: 80 // Predator
    });

    // Predators eat herbivores
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 61,
            max: 70
        },
        neighborCount: {
            type: 'greater-than',
            value: 0
        },
        neighborValue: {
            type: 'range',
            min: 71,
            max: 85
        },
        newValue: 0 // Herbivore eaten
    });

    // Animals die and decay
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 61,
            max: 85
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 90 // Decay/Remains
    });

    // Decay eventually disappears
    simulator.addRule({
        cellValue: {
            type: 'range',
            min: 86,
            max: 100
        },
        neighborCount: {
            type: 'any'
        },
        neighborValue: {
            type: 'any'
        },
        newValue: 0 // Empty
    });
}

/**
 * Value Averaging:
 * Cells tend to average their values with their neighbors,
 * creating interesting blending and smoothing effects.
 */
export function loadValueAveraging(simulator) {
    // Clear existing rules
    simulator.clearRules();

    // Create rules for different value ranges
    const ranges = [
        [0, 20], [21, 40], [41, 60], [61, 80], [81, 100]
    ];

    // For each range, create rules to average with neighbors
    ranges.forEach(([min, max]) => {
        // Average up if surrounded by higher values
        simulator.addRule({
            cellValue: {
                type: 'range',
                min: min,
                max: max
            },
            neighborCount: {
                type: 'greater-than',
                value: 3
            },
            neighborValue: {
                type: 'range',
                min: max + 1,
                max: 100
            },
            newValue: Math.min(100, max + 10) // Increase value
        });

        // Average down if surrounded by lower values
        simulator.addRule({
            cellValue: {
                type: 'range',
                min: min,
                max: max
            },
            neighborCount: {
                type: 'greater-than',
                value: 3
            },
            neighborValue: {
                type: 'range',
                min: 0,
                max: min - 1
            },
            newValue: Math.max(0, min - 10) // Decrease value
        });
    });

    // Special rule for empty cells to start growing
    simulator.addRule({
        cellValue: {
            type: '0'
        },
        neighborCount: {
            type: 'greater-than',
            value: 2
        },
        neighborValue: {
            type: 'non-zero'
        },
        newValue: 10 // Start with a low value
    });
}

// Export a map of preset names to their loader functions
export const presets = {
    'game-of-life': loadGameOfLife,
    'forest-fire': loadForestFire,
    'cyclic': loadCyclic,
    'brian-brain': loadBrianBrain,
    'gradient-waves': loadGradientWaves,
    'ecosystem': loadEcosystem,
    'value-averaging': loadValueAveraging
};
