/**
 * CellularAutomataUI class
 * Handles the UI controller functionality
 */
import CellularAutomata from './CellularAutomata.js';
import { presets } from './presets.js';
import { defaultEmojiMap, getEmojiForValue, renderEmojiMapping, emojiSets } from './emojiMapping.js';

export default class CellularAutomataUI {
    constructor() {
        this.initElements();
        this.emojiMap = defaultEmojiMap;
        this.currentEmojiSetKey = 'nature';
        this.initEmojiMapping();
        this.initEventListeners();
        this.initSimulator();
        this.loadSavedConfigurations();
        this.updateStatistics();
        this.zoom = 1;
    }

    initElements() {
        // Grid settings
        this.gridWidthInput = document.getElementById('grid-width');
        this.gridHeightInput = document.getElementById('grid-height');
        this.cellSizeInput = document.getElementById('cell-size');
        this.applyGridSettingsBtn = document.getElementById('apply-grid-settings');

        // Simulation controls
        this.playPauseBtn = document.getElementById('play-pause');
        this.stepBtn = document.getElementById('step');
        this.clearBtn = document.getElementById('clear');
        this.simulationSpeedInput = document.getElementById('simulation-speed');
        this.randomFillInput = document.getElementById('random-fill');
        this.randomFillBtn = document.getElementById('random-fill-btn');

        // Emoji mapping
        this.emojiSetSelect = document.getElementById('emoji-set-select');
        this.emojiMappingContainer = document.getElementById('emoji-mapping');

        // Rules
        this.ruleCellValueSelect = document.getElementById('rule-cell-value');
        this.cellValueRangeDiv = document.getElementById('cell-value-range');
        this.cellValueMinInput = document.getElementById('cell-value-min');
        this.cellValueMaxInput = document.getElementById('cell-value-max');

        this.ruleNeighborCountSelect = document.getElementById('rule-neighbor-count');
        this.neighborCountValueDiv = document.getElementById('neighbor-count-value');
        this.neighborCountInput = document.getElementById('neighbor-count');
        this.neighborCountRangeDiv = document.getElementById('neighbor-count-range');
        this.neighborCountMinInput = document.getElementById('neighbor-count-min');
        this.neighborCountMaxInput = document.getElementById('neighbor-count-max');

        this.ruleNeighborValueSelect = document.getElementById('rule-neighbor-value');
        this.neighborValueRangeDiv = document.getElementById('neighbor-value-range');
        this.neighborValueMinInput = document.getElementById('neighbor-value-min');
        this.neighborValueMaxInput = document.getElementById('neighbor-value-max');

        this.ruleNewValueInput = document.getElementById('rule-new-value');
        this.addRuleBtn = document.getElementById('add-rule');
        this.rulesListContainer = document.getElementById('rules-list');

        // Presets
        this.presetSelect = document.getElementById('preset-select');
        this.loadPresetBtn = document.getElementById('load-preset');

        // Save/Load
        this.configNameInput = document.getElementById('config-name');
        this.saveConfigBtn = document.getElementById('save-config');
        this.savedConfigsContainer = document.getElementById('saved-configs');
        this.exportConfigBtn = document.getElementById('export-config');
        this.importConfigBtn = document.getElementById('import-config');

        // Statistics
        this.statisticsContainer = document.getElementById('statistics');

        // Grid
        this.gridContainer = document.getElementById('grid');

        // Zoom controls
        this.zoomInBtn = document.getElementById('zoom-in');
        this.zoomOutBtn = document.getElementById('zoom-out');
    }

    initEmojiMapping() {
        renderEmojiMapping(this.emojiMappingContainer, this.emojiMap);
    }

    initEventListeners() {
        // Grid settings
        this.applyGridSettingsBtn.addEventListener('click', () => this.applyGridSettings());

        // Simulation controls
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.stepBtn.addEventListener('click', () => this.step());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.simulationSpeedInput.addEventListener('change', () => this.updateSimulationSpeed());
        this.randomFillBtn.addEventListener('click', () => this.randomFill());

        // Emoji set selection
        this.emojiSetSelect.addEventListener('change', () => this.changeEmojiSet());

        // Rules
        this.ruleCellValueSelect.addEventListener('change', () => this.updateRuleInputVisibility());
        this.ruleNeighborCountSelect.addEventListener('change', () => this.updateRuleInputVisibility());
        this.ruleNeighborValueSelect.addEventListener('change', () => this.updateRuleInputVisibility());
        this.addRuleBtn.addEventListener('click', () => this.addRule());

        // Presets
        this.loadPresetBtn.addEventListener('click', () => this.loadPreset());

        // Save/Load
        this.saveConfigBtn.addEventListener('click', () => this.saveConfiguration());
        this.exportConfigBtn.addEventListener('click', () => this.exportConfiguration());
        this.importConfigBtn.addEventListener('click', () => this.importConfiguration());

        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());

        // Update rule input visibility initially
        this.updateRuleInputVisibility();
    }

    initSimulator() {
        const width = parseInt(this.gridWidthInput.value);
        const height = parseInt(this.gridHeightInput.value);
        this.cellSize = parseInt(this.cellSizeInput.value);

        this.simulator = new CellularAutomata(width, height);
        this.simulator.onStep = (stats) => this.updateStatistics(stats);

        this.renderGrid();
        this.initGridInteraction();
    }

    renderGrid() {
        this.gridContainer.innerHTML = '';

        // Set grid dimensions
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.simulator.width}, ${this.cellSize}px)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.simulator.height}, ${this.cellSize}px)`;

        // Create cells
        for (let y = 0; y < this.simulator.height; y++) {
            for (let x = 0; x < this.simulator.width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;

                const value = this.simulator.getCellValue(x, y);
                cell.textContent = getEmojiForValue(value, this.emojiMap);

                this.gridContainer.appendChild(cell);
            }
        }
    }

    initGridInteraction() {
        // Add click event to cells
        this.gridContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                const x = parseInt(e.target.dataset.x);
                const y = parseInt(e.target.dataset.y);

                // Toggle cell value (0 -> 1, anything else -> 0)
                const currentValue = this.simulator.getCellValue(x, y);
                const newValue = currentValue === 0 ? 1 : 0;

                this.simulator.setCellValue(x, y, newValue);
                e.target.textContent = getEmojiForValue(newValue, this.emojiMap);

                this.updateStatistics();
            }
        });
    }

    updateGrid() {
        const cells = this.gridContainer.querySelectorAll('.cell');

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            const value = this.simulator.getCellValue(x, y);

            cell.textContent = getEmojiForValue(value, this.emojiMap);
        }
    }

    applyGridSettings() {
        const width = parseInt(this.gridWidthInput.value);
        const height = parseInt(this.gridHeightInput.value);
        const cellSize = parseInt(this.cellSizeInput.value);

        if (width !== this.simulator.width || height !== this.simulator.height) {
            this.simulator.resize(width, height);
        }

        this.cellSize = cellSize;
        this.renderGrid();
        this.updateStatistics();
    }

    togglePlayPause() {
        if (this.simulator.running) {
            this.simulator.stop();
            this.playPauseBtn.innerHTML = '▶ Play';
            this.playPauseBtn.classList.remove('btn-danger');
            this.playPauseBtn.classList.add('btn-success');
        } else {
            this.simulator.start();
            this.playPauseBtn.innerHTML = '⏸ Pause';
            this.playPauseBtn.classList.remove('btn-success');
            this.playPauseBtn.classList.add('btn-danger');
        }
    }

    step() {
        this.simulator.step();
        this.updateGrid();
        this.updateStatistics();
    }

    clear() {
        this.simulator.clear();
        this.updateGrid();
        this.updateStatistics();
    }

    updateSimulationSpeed() {
        const speed = parseInt(this.simulationSpeedInput.value);
        this.simulator.setSpeed(speed);
    }

    randomFill() {
        const percentage = parseInt(this.randomFillInput.value);
        this.simulator.randomize(percentage);
        this.updateGrid();
        this.updateStatistics();
    }

    updateRuleInputVisibility() {
        // Cell value range visibility
        if (this.ruleCellValueSelect.value === 'range') {
            this.cellValueRangeDiv.style.display = 'block';
        } else {
            this.cellValueRangeDiv.style.display = 'none';
        }

        // Neighbor count range visibility
        if (this.ruleNeighborCountSelect.value === 'range') {
            this.neighborCountValueDiv.style.display = 'none';
            this.neighborCountRangeDiv.style.display = 'block';
        } else {
            this.neighborCountValueDiv.style.display = 'block';
            this.neighborCountRangeDiv.style.display = 'none';
        }

        // Neighbor value range visibility
        if (this.ruleNeighborValueSelect.value === 'range') {
            this.neighborValueRangeDiv.style.display = 'block';
        } else {
            this.neighborValueRangeDiv.style.display = 'none';
        }
    }

    addRule() {
        // Build rule object based on form inputs
        const rule = {
            cellValue: this.getCellValueCondition(),
            neighborCount: this.getNeighborCountCondition(),
            neighborValue: this.getNeighborValueCondition(),
            newValue: parseInt(this.ruleNewValueInput.value)
        };

        // Add rule to simulator
        this.simulator.addRule(rule);

        // Add rule to UI
        this.renderRules();
    }

    getCellValueCondition() {
        const type = this.ruleCellValueSelect.value;

        if (type === 'range') {
            return {
                type: 'range',
                min: parseInt(this.cellValueMinInput.value),
                max: parseInt(this.cellValueMaxInput.value)
            };
        }

        return { type };
    }

    getNeighborCountCondition() {
        const type = this.ruleNeighborCountSelect.value;

        if (type === 'range') {
            return {
                type: 'range',
                min: parseInt(this.neighborCountMinInput.value),
                max: parseInt(this.neighborCountMaxInput.value)
            };
        }

        return {
            type,
            value: parseInt(this.neighborCountInput.value)
        };
    }

    getNeighborValueCondition() {
        const type = this.ruleNeighborValueSelect.value;

        if (type === 'range') {
            return {
                type: 'range',
                min: parseInt(this.neighborValueMinInput.value),
                max: parseInt(this.neighborValueMaxInput.value)
            };
        }

        return { type };
    }

    renderRules() {
        this.rulesListContainer.innerHTML = '';

        this.simulator.rules.forEach((rule, index) => {
            const ruleItem = document.createElement('div');
            ruleItem.className = 'rule-item';

            const ruleText = document.createElement('div');
            ruleText.className = 'rule-text';
            ruleText.textContent = this.formatRuleText(rule);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-rule';
            removeBtn.textContent = 'X';
            removeBtn.addEventListener('click', () => this.removeRule(index));

            ruleItem.appendChild(ruleText);
            ruleItem.appendChild(removeBtn);
            this.rulesListContainer.appendChild(ruleItem);
        });
    }

    formatRuleText(rule) {
        let text = 'IF cell is ';

        // Cell value condition
        if (rule.cellValue.type === 'any') {
            text += 'any value';
        } else if (rule.cellValue.type === '0') {
            text += 'empty (0)';
        } else if (rule.cellValue.type === 'range') {
            text += `in range ${rule.cellValue.min}-${rule.cellValue.max}`;
        }

        text += '\nAND neighbors ';

        // Neighbor count condition
        if (rule.neighborCount.type === 'exactly') {
            text += `count is exactly ${rule.neighborCount.value}`;
        } else if (rule.neighborCount.type === 'less-than') {
            text += `count is < ${rule.neighborCount.value}`;
        } else if (rule.neighborCount.type === 'greater-than') {
            text += `count is > ${rule.neighborCount.value}`;
        } else if (rule.neighborCount.type === 'range') {
            text += `count is in range ${rule.neighborCount.min}-${rule.neighborCount.max}`;
        }

        // Neighbor value condition
        if (rule.neighborValue.type !== 'any') {
            text += '\nAND neighbor values are ';

            if (rule.neighborValue.type === 'non-zero') {
                text += 'non-zero';
            } else if (rule.neighborValue.type === 'range') {
                text += `in range ${rule.neighborValue.min}-${rule.neighborValue.max}`;
            }
        }

        text += `\nTHEN set cell to ${rule.newValue} (${getEmojiForValue(rule.newValue, this.emojiMap)})`;

        return text;
    }

    /**
     * Change the emoji set based on user selection
     */
    changeEmojiSet() {
        const setKey = this.emojiSetSelect.value;
        if (emojiSets[setKey]) {
            this.currentEmojiSetKey = setKey;
            this.emojiMap = emojiSets[setKey].map;

            // Update the emoji mapping display
            this.initEmojiMapping();

            // Update the grid display
            this.updateGrid();

            // Update rules display to show new emojis
            this.renderRules();

            // Update statistics with new emojis
            this.updateStatistics();
        }
    }

    removeRule(index) {
        this.simulator.rules.splice(index, 1);
        this.renderRules();
    }

    loadPreset() {
        const presetName = this.presetSelect.value;

        if (!presetName) return;

        // Get the preset loader function
        const presetLoader = presets[presetName];

        if (presetLoader) {
            // Apply the preset
            presetLoader(this.simulator);

            // Update UI
            this.renderRules();
        }
    }

    saveConfiguration() {
        const name = this.configNameInput.value.trim() || `Configuration ${Date.now()}`;

        // Get current configuration
        const config = {
            name,
            data: this.simulator.exportConfiguration()
        };

        // Save to localStorage
        let savedConfigs = this.getSavedConfigurations();
        savedConfigs[name] = config;
        localStorage.setItem('cellularAutomataConfigs', JSON.stringify(savedConfigs));

        // Update UI
        this.loadSavedConfigurations();
    }

    getSavedConfigurations() {
        const saved = localStorage.getItem('cellularAutomataConfigs');
        return saved ? JSON.parse(saved) : {};
    }

    loadSavedConfigurations() {
        this.savedConfigsContainer.innerHTML = '';

        const configs = this.getSavedConfigurations();

        for (const name in configs) {
            const configItem = document.createElement('div');
            configItem.className = 'config-item';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = name;

            const loadBtn = document.createElement('button');
            loadBtn.textContent = 'Load';
            loadBtn.addEventListener('click', () => this.loadConfiguration(name));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'btn-danger';
            deleteBtn.addEventListener('click', () => this.deleteConfiguration(name));

            configItem.appendChild(nameSpan);
            configItem.appendChild(loadBtn);
            configItem.appendChild(deleteBtn);

            this.savedConfigsContainer.appendChild(configItem);
        }
    }

    loadConfiguration(name) {
        const configs = this.getSavedConfigurations();
        const config = configs[name];

        if (config) {
            this.simulator.importConfiguration(config.data);
            this.renderGrid();
            this.renderRules();
            this.updateStatistics();
        }
    }

    deleteConfiguration(name) {
        const configs = this.getSavedConfigurations();
        delete configs[name];
        localStorage.setItem('cellularAutomataConfigs', JSON.stringify(configs));
        this.loadSavedConfigurations();
    }

    exportConfiguration() {
        const config = this.simulator.exportConfiguration();
        const json = JSON.stringify(config, null, 2);

        // Create a blob and download link
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `cellular-automata-config-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }

    importConfiguration() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const config = JSON.parse(event.target.result);
                    this.simulator.importConfiguration(config);
                    this.renderGrid();
                    this.renderRules();
                    this.updateStatistics();
                } catch (error) {
                    alert('Error importing configuration: ' + error.message);
                }
            };
            reader.readAsText(file);
        });

        input.click();
    }

    updateStatistics(stats) {
        if (!stats) {
            stats = this.simulator.getStatistics();
        }

        this.statisticsContainer.innerHTML = '';

        // Generation
        const genItem = document.createElement('div');
        genItem.className = 'stats-item';
        genItem.innerHTML = `<span>Generation:</span> <span>${stats.generation}</span>`;
        this.statisticsContainer.appendChild(genItem);

        // Population
        const popItem = document.createElement('div');
        popItem.className = 'stats-item';
        popItem.innerHTML = `<span>Population:</span> <span>${stats.population} cells (${Math.round(stats.population / (this.simulator.width * this.simulator.height) * 100)}%)</span>`;
        this.statisticsContainer.appendChild(popItem);

        // Value distribution
        const valueDistItem = document.createElement('div');
        valueDistItem.className = 'stats-item';
        valueDistItem.innerHTML = '<span>Value Distribution:</span>';
        this.statisticsContainer.appendChild(valueDistItem);

        // Group values by emoji mapping
        this.emojiMap.forEach(mapping => {
            let count = 0;
            for (let i = mapping.min; i <= mapping.max; i++) {
                count += stats.valueCounts[i] || 0;
            }

            if (count > 0) {
                const emojiItem = document.createElement('div');
                emojiItem.className = 'stats-item';
                emojiItem.style.paddingLeft = '20px';
                emojiItem.innerHTML = `<span>${mapping.emoji} (${mapping.min === mapping.max ? mapping.min : mapping.min + '-' + mapping.max}):</span> <span>${count} cells</span>`;
                this.statisticsContainer.appendChild(emojiItem);
            }
        });

        // If simulator is running, update the grid
        if (this.simulator.running) {
            this.updateGrid();
        }
    }

    zoomIn() {
        this.zoom *= 1.2;
        this.applyZoom();
    }

    zoomOut() {
        this.zoom /= 1.2;
        this.applyZoom();
    }

    applyZoom() {
        this.gridContainer.style.transform = `scale(${this.zoom})`;
    }
}
