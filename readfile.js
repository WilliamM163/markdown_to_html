const fs = require('node:fs')

class Read {
    /**
     * Constructor
     * @param {string} inputFile 
     */
    constructor(inputFile) {
        this.data = fs.readFileSync(inputFile, { encoding: 'utf8', flag: 'r' }).split('\n')
        this.currentIndex = 0
    }

    readLine() {
        if (this.currentIndex >= this.data.length) {
            throw new Error("End Of File")
        }
        const returnString = this.data[this.currentIndex]
        this.currentIndex++
        return returnString
    }

    // Iterator
    [Symbol.iterator]() {
        const self = this
        return {
            next() {
                try {
                    const value = self.readLine()
                    const done = false
                    return { value, done }
                } catch (e) {
                    return { done: true }
                }
            },
        }
    }
}

module.exports = Read