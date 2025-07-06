const { parseInlineAsterisks } = require("./parseInlineAsterisks")

const inlineRules = [
    // Rules for strikethrough
    {
        name: 'strikethrough',
        pattern: /~~(.*?)~~/,
        render: (match) => {
            const content = match[1]
            return `<s>${content}</s>`
        }
    },

    // Rules for images
    {
        name: 'images',
        pattern: /!\[(.*?)\]\((.*?)\)/, // WOAH I JUST CHATGPTed THIS
        render: (match) => {
            const alt = match[1]
            const src = match[2]
            return `<img src='${src}' alt='${alt}'/>`
        }
    },

    // Rules for links
    {
        name: 'links',
        pattern: /\[(.*?)\]\((.*?)\)/, // This one is also too complex for me
        render: (match) => {
            const name = match[1]
            const href = match[2]
            return `<a href='${href}'>${name}</a>`
        }
    },

    // Rule for Horizontal Rule
    {
        name: 'line',
        pattern: /---/,
        render: (match) => {
            return '<br></br>'
        }
    }
]

/**
 * Converts markdown syntax for links/images/strickthrough/lines into HTML syntax
 * @param {string} line 
 * @returns {string}
 */
function parseInlineElements(line) {
    let HTML = ''
    HTML = parseInlineAsterisks(line)

    for (const rule of inlineRules) {
        const match = line.match(rule.pattern)
        if (match !== null) {
            HTML = rule.render(match)
            break
        }
    }

    return HTML
}

module.exports = { parseInlineElements }