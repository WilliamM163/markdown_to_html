const blockRules = [
    // Rule for all headings (h1-h6)
    {
        name: 'heading',
        pattern: /^(#{1,6})\s(.*)/,
        render: (match) => {
            const level = match[1].length
            const content = match[2]
            return `<h${level}>${content}</h${level}>`
        }
    },
    // Rule for block quotes
    {
        name: 'blockquote',
        pattern: /^>\s(.*)/,
        render: (match) => {
            const content = match[1]
            return `<blockquote>${content}</blockquote>`
        }
    },
    // Rule for paragraphs (the fallback)
    {
        name: 'heading',
        pattern: /.*/,
        render: (match) => {
            const content = match[0]
            return `<p>${content}</p>`
        }
    }
]

/**
 * Converts headers, blockquotes, paragraphs into HTML equivalent
 * @param {string} markdownLine
 * @returns {string} - HTML line
 */
function parseBlockElement(markdownLine) {
    let HTML = ''
    for (const block of blockRules) {
        // Identifies whether the line matches the corresponding block pattern
        const match = markdownLine.match(block.pattern)
        if (match !== null) {
            // Replaces the markdown syntax with html syntax
            HTML = block.render(match)
            break
        }
    }
    return HTML
}

module.exports = { parseBlockElement }