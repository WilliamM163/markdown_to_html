const FILE = require('./readfile')
const { parse } = require('./parsing/parse')

function main() {
    const commandLineArguements = process.argv
    if (commandLineArguements.length != 4) {
        console.error('Error invalid arguements, correct usage:')
        console.error('node main.js input_file output_file')
        return
    }
    const input_file = commandLineArguements[2]
    const output_file = commandLineArguements[3]

    const file = new FILE(input_file)
    
    // Main Loop
    for (let line of file) {
        const HTML = parse(line)
        console.log(HTML)
    }
}

main()