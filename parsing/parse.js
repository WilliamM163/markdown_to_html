const { parseBlockElement } = require("./parseBlockElement")
const { parseInlineElements } = require("./parseInline")

/**
 * Converts a single line of Markdown into its HTML equivalent.
 * @param {string} markdownLine
 * @returns {string}
 */
function parse(markdownLine) {
    let HTML
    HTML = parseBlockElement(markdownLine)
    HTML = parseInlineElements(HTML)
    return HTML
}

module.exports = { parse }