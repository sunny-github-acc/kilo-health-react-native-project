#!/usr/bin/env bash

devices=$(emulator -list-avds)

set -f                      # avoid globbing (expansion of *).

array=(${devices// / })
for i in "${!array[@]}"
do
    echo "$(($i+1))) ${array[i]}"
done

echo Type a device number you want to launch
read count 

device=$(emulator -list-avds | head -n $count | tail  -1)
$ANDROID_HOME/emulator/emulator @$device -no-snapshot-load &