/**
 * CellularAutomata class
 * Handles the cellular automata simulation logic
 */
export default class CellularAutomata {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.currentGrid = new Uint8Array(width * height);
        this.nextGrid = new Uint8Array(width * height);
        this.rules = [];
        this.generation = 0;
        this.running = false;
        this.interval = null;
        this.speed = 200; // ms

        // Precalculate neighbor indices for each cell
        this.neighborIndices = this.calculateNeighborIndices();
    }

    calculateNeighborIndices() {
        const indices = new Array(this.width * this.height);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const idx = y * this.width + x;
                const neighbors = [];

                // Check all 8 surrounding cells (Moore neighborhood)
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0)
                            continue; // Skip self

                        // Calculate neighbor coordinates with wrapping
                        const nx = (x + dx + this.width) % this.width;
                        const ny = (y + dy + this.height) % this.height;
                        const nidx = ny * this.width + nx;

                        neighbors.push(nidx);
                    }
                }

                indices[idx] = neighbors;
            }
        }

        return indices;
    }

    setCellValue(x, y, value) {
        const idx = y * this.width + x;
        this.currentGrid[idx] = value;
    }

    getCellValue(x, y) {
        const idx = y * this.width + x;
        return this.currentGrid[idx];
    }

    clear() {
        this.currentGrid.fill(0);
        this.nextGrid.fill(0);
        this.generation = 0;
    }

    randomize(fillPercentage = 30) {
        this.clear();
        const threshold = fillPercentage / 100;

        for (let i = 0; i < this.currentGrid.length; i++) {
            if (Math.random() < threshold) {
                // Random value between 1 and 100
                this.currentGrid[i] = Math.floor(Math.random() * 100) + 1;
            }
        }
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    clearRules() {
        this.rules = [];
    }

    step() {
        // Reset next grid
        this.nextGrid.fill(0);

        // Apply rules to each cell
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const idx = y * this.width + x;
                const cellValue = this.currentGrid[idx];

                // Get neighbor values
                const neighbors = this.neighborIndices[idx]
                    .map(nidx => this.currentGrid[nidx]);

                // Default: cell stays the same
                this.nextGrid[idx] = cellValue;

                // Apply rules in order (first matching rule wins)
                for (const rule of this.rules) {
                    if (this.ruleApplies(cellValue, neighbors, rule)) {
                        this.nextGrid[idx] = rule.newValue;
                        break;
                    }
                }
            }
        }

        // Swap grids using typed array for efficiency
        [this.currentGrid, this.nextGrid] = [this.nextGrid, this.currentGrid];
        this.generation++;

        return this.getStatistics();
    }

    ruleApplies(cellValue, neighbors, rule) {
        // Check if cell value matches rule condition
        if (!this.cellValueMatches(cellValue, rule.cellValue)) {
            return false;
        }

        // Count neighbors that match the neighbor value condition
        const matchingNeighbors = neighbors.filter(value => this.cellValueMatches(value, rule.neighborValue));

        // Check if neighbor count matches rule condition
        return this.neighborCountMatches(matchingNeighbors.length, rule.neighborCount);
    }

    cellValueMatches(value, condition) {
        if (condition.type === 'any') {
            return true;
        } else if (condition.type === '0') {
            return value === 0;
        } else if (condition.type === 'non-zero') {
            return value > 0;
        } else if (condition.type === 'range') {
            return value >= condition.min && value <= condition.max;
        }
        return false;
    }

    neighborCountMatches(count, condition) {
        if (condition.type === 'exactly') {
            return count === condition.value;
        } else if (condition.type === 'less-than') {
            return count < condition.value;
        } else if (condition.type === 'greater-than') {
            return count > condition.value;
        } else if (condition.type === 'range') {
            return count >= condition.min && count <= condition.max;
        }
        return false;
    }

    start() {
        if (this.running)
            return;

        this.running = true;
        this.interval = setInterval(() => {
            const stats = this.step();
            this.onStep?.(stats);
        }, this.speed);
    }

    stop() {
        if (!this.running)
            return;

        this.running = false;
        clearInterval(this.interval);
        this.interval = null;
    }

    setSpeed(speed) {
        this.speed = speed;
        if (this.running) {
            this.stop();
            this.start();
        }
    }

    resize(width, height) {
        const newGrid = new Uint8Array(width * height);
        const newNextGrid = new Uint8Array(width * height);

        // Copy existing grid data where possible
        const minWidth = Math.min(this.width, width);
        const minHeight = Math.min(this.height, height);

        for (let y = 0; y < minHeight; y++) {
            for (let x = 0; x < minWidth; x++) {
                const oldIdx = y * this.width + x;
                const newIdx = y * width + x;
                newGrid[newIdx] = this.currentGrid[oldIdx];
            }
        }

        this.width = width;
        this.height = height;
        this.currentGrid = newGrid;
        this.nextGrid = newNextGrid;

        // Recalculate neighbor indices
        this.neighborIndices = this.calculateNeighborIndices();
    }

    getStatistics() {
        const stats = {
            generation: this.generation,
            population: 0,
            valueCounts: new Array(101).fill(0) // 0-100
        };

        for (let i = 0; i < this.currentGrid.length; i++) {
            const value = this.currentGrid[i];
            if (value > 0) {
                stats.population++;
            }
            stats.valueCounts[value]++;
        }

        return stats;
    }

    exportConfiguration() {
        return {
            width: this.width,
            height: this.height,
            rules: this.rules,
            grid: Array.from(this.currentGrid),
            generation: this.generation
        };
    }

    importConfiguration(config) {
        this.resize(config.width, config.height);
        this.rules = config.rules;
        this.currentGrid = new Uint8Array(config.grid);
        this.nextGrid = new Uint8Array(this.width * this.height);
        this.generation = config.generation || 0;
    }
}
