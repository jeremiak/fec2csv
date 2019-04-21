# FEC filings to CSV

A small CLI tool to take a `.fec` filing and turn it into a collection of CSVs, one for each form type.

[![CircleCI](https://circleci.com/gh/jeremiak/fec2csv.svg?style=svg)](https://circleci.com/gh/jeremiak/fec2csv)

## Installation & usage

```
$ npm install -g fec2csv`
$ fec2csv path/to/file.fec [path/to/output/dir]
```

`fec2csv` expects at least one argument but can take two. The first one, which is required, is the path to the `.fec` source file. The second, which is optional, is the path to the directory where `fec2csv` should put the generated files. This will default to the current directory (`.`).

## Motivation

This tool creates nice CSV files out of those files to do analysis quickly. The FEC publishes `.fec` files really quickly, but they're sort of hard to use. First, the `.fec` file isn't actually a rectangular table. It is a single file with all of the different types of FEC submissions combined into table.

## Credits

The work horse of this tool is [`fec-parser`](https://www.npmjs.com/package/fec-parse) by [@chriszs](https://github.com/chriszs), which in turn uses code from the [Fech Ruby gem](https://github.com/NYTimes/Fech) by Derek Willis and others, and the [csv-parser module](https://github.com/mafintosh/csv-parser) by Mathias Buus, Max Ogden and others.
