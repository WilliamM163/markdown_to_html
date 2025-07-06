const Read = require('./readfile')
const { convert } = require('./convert')

function main() {
    const commandLineArguements = process.argv
    if (commandLineArguements.length != 4) {
        console.error('Error invalid arguements, correct usage:')
        console.error('node main.js input_file output_file')
        return
    }
    const input_file = commandLineArguements[2]
    const output_file = commandLineArguements[3]

    const file = new Read(input_file)
    
    // Main Loop
    for (let line of file) {
        line = convert(line)
        console.log(line)
    }
}

main()