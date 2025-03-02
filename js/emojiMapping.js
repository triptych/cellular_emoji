/**
 * Emoji mapping functionality
 * Maps numerical cell values to emoji representations
 */

// Nature emoji mapping (default)
export const natureEmojiMap = [
    {
        min: 0,
        max: 0,
        emoji: '⬜'
    },
    {
        min: 1,
        max: 20,
        emoji: '🌱'
    },
    {
        min: 21,
        max: 40,
        emoji: '🌿'
    },
    {
        min: 41,
        max: 60,
        emoji: '🌳'
    },
    {
        min: 61,
        max: 80,
        emoji: '🔥'
    },
    {
        min: 81,
        max: 100,
        emoji: '🪨'
    }
];

// Space emoji mapping
export const spaceEmojiMap = [
    {
        min: 0,
        max: 0,
        emoji: '⬛'
    },
    {
        min: 1,
        max: 20,
        emoji: '✨'
    },
    {
        min: 21,
        max: 40,
        emoji: '🌟'
    },
    {
        min: 41,
        max: 60,
        emoji: '🌠'
    },
    {
        min: 61,
        max: 80,
        emoji: '🌌'
    },
    {
        min: 81,
        max: 100,
        emoji: '🪐'
    }
];

// Food emoji mapping
export const foodEmojiMap = [
    {
        min: 0,
        max: 0,
        emoji: '⬜'
    },
    {
        min: 1,
        max: 20,
        emoji: '🍇'
    },
    {
        min: 21,
        max: 40,
        emoji: '🍓'
    },
    {
        min: 41,
        max: 60,
        emoji: '🍔'
    },
    {
        min: 61,
        max: 80,
        emoji: '🍕'
    },
    {
        min: 81,
        max: 100,
        emoji: '🍰'
    }
];

// Weather emoji mapping
export const weatherEmojiMap = [
    {
        min: 0,
        max: 0,
        emoji: '⬜'
    },
    {
        min: 1,
        max: 20,
        emoji: '☁️'
    },
    {
        min: 21,
        max: 40,
        emoji: '🌦️'
    },
    {
        min: 41,
        max: 60,
        emoji: '🌧️'
    },
    {
        min: 61,
        max: 80,
        emoji: '⛈️'
    },
    {
        min: 81,
        max: 100,
        emoji: '🌩️'
    }
];

// Detailed emoji mapping (100 different emojis)
export const detailedEmojiMap = (() => {
    const emojis = [
        '⬜', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂',
        '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️',
        '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗',
        '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒',
        '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
        '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠',
        '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮',
        '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢',
        '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤',
        '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹'
    ];

    return emojis.map((emoji, index) => ({
        min: index,
        max: index,
        emoji: emoji
    }));
})();

// Color spectrum emoji mapping
export const colorSpectrumEmojiMap = [
    { min: 0, max: 0, emoji: '⬜' },
    { min: 1, max: 10, emoji: '🟥' }, // Red
    { min: 11, max: 20, emoji: '🟧' }, // Orange
    { min: 21, max: 30, emoji: '🟨' }, // Yellow
    { min: 31, max: 40, emoji: '🟩' }, // Green
    { min: 41, max: 50, emoji: '🟦' }, // Blue
    { min: 51, max: 60, emoji: '🟪' }, // Purple
    { min: 61, max: 70, emoji: '🟫' }, // Brown
    { min: 71, max: 80, emoji: '⬛' }, // Black
    { min: 81, max: 90, emoji: '🟥' }, // Back to red
    { min: 91, max: 100, emoji: '🟧' } // Back to orange
];

// Smiley emotion spectrum
export const smileyEmotionMap = [
    { min: 0, max: 0, emoji: '⬜' },
    { min: 1, max: 10, emoji: '😄' }, // Very happy
    { min: 11, max: 20, emoji: '😊' }, // Happy
    { min: 21, max: 30, emoji: '🙂' }, // Slightly happy
    { min: 31, max: 40, emoji: '😐' }, // Neutral
    { min: 41, max: 50, emoji: '😕' }, // Slightly concerned
    { min: 51, max: 60, emoji: '😟' }, // Concerned
    { min: 61, max: 70, emoji: '😧' }, // Worried
    { min: 71, max: 80, emoji: '😢' }, // Sad
    { min: 81, max: 90, emoji: '😭' }, // Very sad
    { min: 91, max: 100, emoji: '😱' }  // Extremely distressed
];

// Map of all emoji sets
export const emojiSets = {
    'nature': {
        name: 'Nature',
        map: natureEmojiMap
    },
    'space': {
        name: 'Space',
        map: spaceEmojiMap
    },
    'food': {
        name: 'Food',
        map: foodEmojiMap
    },
    'weather': {
        name: 'Weather',
        map: weatherEmojiMap
    },
    'detailed': {
        name: 'Detailed (100 Emojis)',
        map: detailedEmojiMap
    },
    'color': {
        name: 'Color Spectrum',
        map: colorSpectrumEmojiMap
    },
    'smiley': {
        name: 'Emotion Spectrum',
        map: smileyEmotionMap
    }
};

// Default emoji mapping
export const defaultEmojiMap = natureEmojiMap;

/**
 * Get the emoji representation for a given cell value
 * @param {number} value - The cell value
 * @param {Array} emojiMap - The emoji mapping array
 * @returns {string} The emoji representation
 */
export function getEmojiForValue(value, emojiMap = defaultEmojiMap) {
    for (const mapping of emojiMap) {
        if (value >= mapping.min && value <= mapping.max) {
            return mapping.emoji;
        }
    }
    return '❓';
}

/**
 * Render the emoji mapping to a container element
 * @param {HTMLElement} container - The container element
 * @param {Array} emojiMap - The emoji mapping array
 */
export function renderEmojiMapping(container, emojiMap = defaultEmojiMap) {
    container.innerHTML = '';

    emojiMap.forEach((mapping) => {
        const item = document.createElement('div');
        item.className = 'emoji-map-item';

        const emoji = document.createElement('div');
        emoji.className = 'emoji-display';
        emoji.textContent = mapping.emoji;

        const range = document.createElement('div');
        if (mapping.min === mapping.max) {
            range.textContent = mapping.min;
        } else {
            range.textContent = `${mapping.min}-${mapping.max}`;
        }

        item.appendChild(emoji);
        item.appendChild(range);
        container.appendChild(item);
    });
}
