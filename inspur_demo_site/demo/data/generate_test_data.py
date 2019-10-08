"""
Filename: generate_test_data.py 
Created on Tue Oct  8 12:15:48 CST 2019

@author: Kefeng Zhu (zhukefeng@inspur.com, zkf1985@gmail.com, zkf85@163.com)

Description:

"""
import json
import numpy as np
import random

label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

max_step = 501

test_data = {}
for i in range(max_step):
    sub_dict = {}
    for l in label_list:
        sub_dict[l] = [
            random.random(), 
            random.randint(0, 9), 
            random.random(), 
            random.randint(0, 9),
            random.random(), 
        ]
    test_data[i] = sub_dict 

#print(test_data)
with open('test_data_cpu.json', 'w') as f:
    json.dump(test_data, f, indent=4)

