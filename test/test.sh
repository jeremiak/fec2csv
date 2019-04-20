#!/bin/bash

# make sure can use the cli
npm link && cd test

# run the tool without FEC file
WITHOUT_INPUT_EXIT_CODE=$(fec2csv ; echo $?)

# and make sure we get an error
if [ $WITHOUT_INPUT_EXIT_CODE -ne 1 ]
then
  exit 1
fi

# run the tool
fec2csv sample.fec

# get the number of resulting CSV files
NUMBER_OF_GENERATED_FILES=$(ls -l *.csv | wc -l)

# cleanup any resulting files
rm *.csv

# with the sample.fec file we expect
# 10 CSV files to be generated
if [ $NUMBER_OF_GENERATED_FILES -ne 10 ]
then
  exit 1
fi

# passed all tests! 🎉
exit 0