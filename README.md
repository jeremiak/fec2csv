# FEC fillings to CSV

A tool to take a `.fec` filing and turn it into a CSV for each form type.

## Installation & usage

`$ npm install -g fec2csv`
`$ fec2csv path/to/file.fec path/to/output`

`fec2csv` expects at least one argument but can take two. The first one, which is required, is the path to the `.fec` source file. The second, which is optional, is the path to the directory where `fec2csv` should put the generated files. This will default to the current directory or `.`.

## Motivation

The FEC publishes `.fec` files really quickly, but they're sort of hard to use. This tool creates nice CSV files out of those files to do analysis quickly.

The `.fec` file isn't actually a rectangular table, its all of the different types of FEC submissions combined into one document. `fec2csv` creates a CSV for each form type with nice columns.

## Credits

The work horse of this tool is [`fec-parser`](https://www.npmjs.com/package/fec-parse) by [@chriszs](https://github.com/chriszs)