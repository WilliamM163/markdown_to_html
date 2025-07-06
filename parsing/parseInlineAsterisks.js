/**
 * A map of Markdown asterisk patterns to their corresponding HTML tags.
 * Defining this outside the function prevents it from being recreated on every call.
 */
const ASTERISK_MAP = {
  1: { name: "italics", tags: ["<em>", "</em>"] },
  2: { name: "bold", tags: ["<strong>", "</strong>"] },
  3: { name: "bold and italics", tags: ["<em><strong>", "</strong></em>"] },
};

/**
 * Converts markdown bold/italic syntax into HTML tags using a stack.
 * @param {string} line
 * @returns {string} - The line with HTML tags.
 */
function parseInlineAsterisks(line) {
  const tagStack = [];
  const resultParts = [];
  let lastIndex = 0;

  for (let i = 0; i < line.length; i++) {
    if (line[i] === "*") {
      // 1. Add the plain text since the last marker.
      resultParts.push(line.substring(lastIndex, i))

      // 2. Count how many asterisks are in a row.
      const asteriskCount = countConsecutiveChars(line.substring(i), "*")
      const style = ASTERISK_MAP[asteriskCount]

      // 3. Decide whether to open or close a tag.
      if (style && tagStack[tagStack.length - 1] === style.name) {
        // It's a closing tag.
        tagStack.pop()
        resultParts.push(style.tags[1])
      } else if (style) {
        // It's an opening tag.
        tagStack.push(style.name)
        resultParts.push(style.tags[0])
      } else {
        // Not a valid style (e.g., 4 asterisks), treat as plain text.
        resultParts.push(line.substring(i, i + asteriskCount))
      }

      // 4. Advance the loop counter and update the last index.
      // (We subtract 1 because the for-loop itself adds 1).
      i += asteriskCount - 1
      lastIndex = i + 1
    }
  }

  // Add any remaining text after the last asterisk.
  if (lastIndex < line.length) {
    resultParts.push(line.substring(lastIndex))
  }

  // If no asterisks were found, resultParts will be empty.
  // In that case, the original line is the correct result.
  return resultParts.length > 0 ? resultParts.join("") : line
}

/**
 * Counts consecutive occurrences of a character from the start of a string.
 * @param {string} str
 * @param {string} target
 * @returns {number}
 */
function countConsecutiveChars(str, target) {
  let count = 0
  while (count < str.length && str[count] === target) {
    count++
  }
  return count
}

module.exports = { parseInlineAsterisks }