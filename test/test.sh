#!/bin/bash

# make sure can use the cli
cd test

echo "❔ CLI should demand an input file..."
# run the tool without FEC file
WITHOUT_INPUT_EXIT_CODE=$(../index.js &>/dev/null; echo $?)

# and make sure we get an error
if [ $WITHOUT_INPUT_EXIT_CODE -ne 1 ]
then
  echo "❗️ It doesn't."
  exit 1
fi
echo "✅ It does."

echo ""
echo "❔ CLI should generate CSV files from FEC filing..."
# run the tool
../index.js sample.fec &>/dev/null

# get the number of resulting CSV files
NUMBER_OF_GENERATED_FILES=$(ls -l *.csv | wc -l)

# cleanup any resulting files
rm *.csv

# with the sample.fec file we expect
# 10 CSV files to be generated
if [ $NUMBER_OF_GENERATED_FILES -ne 10 ]
then
  echo "❗️It doesn't."
  exit 1
fi

echo "✅ It does."

echo ""
echo "🎉 Passed all the tests!"
exit 0