#!/usr/bin/env python
# -*- coding:utf-8 -*-

# author: ritterliu@gmail.com

import sys

print "name:", sys.argv[0]

if len(sys.argv) < 3:
    print 'Too less args'
    exit()

lines_seen = set() 
outfile = open(sys.argv[2], "w")
for line in open(sys.argv[1], "r"):
    if line not in lines_seen: 
        outfile.write(line)
        lines_seen.add(line)
outfile.close()
