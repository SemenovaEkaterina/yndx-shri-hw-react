#!/bin/bash

FILES=`git ls-tree --l -rt HEAD . | sort -k2,2r -k5`
IFS=$(echo -en "\n\b")
for f in $FILES; do
    type=$(echo $f | awk '{print $2}')
    name=$(echo $f | awk '{for(i=5;i<=NF;i++) print $i; print ""}')
    str=$(git log -1 --pretty=format:"%cr|%h|%s|%cn" -- $name)
    printf "%s|%s|%s\n" "$name" "$str" "$type"
done