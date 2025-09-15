#!/bin/bash

i=1  # Initialize i to 1

while [ $i -le 3 ]  # Loop from i=1 to 3
do
  if [ ! -z "${!i}" ]; then  # Check if argument $i is not empty
    echo "Argument $i: ${!i}"  # Print the argument
  fi
  i=$((i + 1))  # Increment i
done

