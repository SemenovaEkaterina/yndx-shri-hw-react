#!/bin/bash

FILES=`git ls-tree --name-only -rt HEAD .`
IFS=$(echo -en "\n\b")
for f in $FILES; do
    str=$(git log -1 --pretty=format:"%cr|%h|%s|%cn" -- $f)
    printf "%s|%s\n" "$f" "$str"
done