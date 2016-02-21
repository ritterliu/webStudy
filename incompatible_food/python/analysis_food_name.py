#!/usr/bin/env python
# -*- coding:utf-8 -*-

# author: ritterliu@gmail.com

#!/usr/bin/python
# -*- coding: UTF-8 -*-

print "你好，世界";

import sys

print "name:", sys.argv[0]

food_list = []
# food_dict = {}
for i in range(1, len(sys.argv)):
    print "param:", i, sys.argv[i]


    f = open(sys.argv[1], "r")
    id = 1
    while True:  
        line = f.readline()  
        if line and len(line) > 0:
            line=line.strip()
            print "line:%s" %line

            foods = line.split('#')

            print "foods" ,foods[:-1]
            print "%s___\n" % (foods[0])
            food_dict = {}
            food_dict['id'] = id
            food_dict['names'] = []

            for food_name in foods:
                print 'food_name:', food_name
                if len(food_name) > 0:
                    food_dict['names'].append(food_name);

            food_list.append(food_dict)
            # if len(foods) == 4:
            #     print "%s vs %s :%s\n" % (foods[0], foods[1], foods[2])
            #     if foods[0] not in food_list:
            #         food_list.append(foods[0])

            #     if foods[1] not in food_list:
            #         food_list.append(foods[1])
            #     # print( "The length of %s is %d"  % (s,x) 
            # elif not len(foods) == 1:
            #     print "len(foods) %d----line:%s" %(len(foods), line) 




            print '\n'
        else:
            print "End"
            break
        id = id + 1

    #End
    print "food_list[%d]"% len(food_list)
    index = 0
    for item in food_list:
        # print "%s" % item
        print '%d id:%s' % (index, item['id'])
        print '+'.join(item['names'])
        index = index + 1


    print "%s" % food_list[0]['names']
    print '----------\n'
    print '\n'.join(food_list[1]['names'])















