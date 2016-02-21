#!/usr/bin/env python
# -*- coding:utf-8 -*-

# author: ritterliu@gmail.com

import sys

print "name:", sys.argv[0]
for i in range(1, len(sys.argv)):
    print "param:", i, sys.argv[i]


    f = open(sys.argv[1], "r")

    output = open('res.txt', 'a')

    while True:  
        line = f.readline()  
        if line and len(line) > 0:
            line=line.strip()
            print "line:%s" %line
            foods = line.split('%')
            if len(foods) == 3:
                print "%s vs %s :%s\n" % (foods[0], foods[1], foods[2])
                output.write(foods[0] + "%" + foods[1] + "%" + foods[2] + "\n")
                # print( "The length of %s is %d"  % (s,x) 
            elif not len(foods) == 1:
                print "len(foods) %d----line:%s" %(len(foods), line) 

            print '\n'
        else:
            print "End"
            break

    output.close()