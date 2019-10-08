"""
Filename: generate_test_data.py 
Created on Tue Oct  8 12:15:48 CST 2019

@author: Kefeng Zhu (zhukefeng@inspur.com, zkf1985@gmail.com, zkf85@163.com)

Description:

"""
import json
import numpy as np
import random
import matplotlib.pyplot as plt
import random

label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
max_step = 501

def gen_part1():

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

def gen_loss():
    x = np.arange(0, 501)
    y1 = [0.7/np.log(i) + random.random()*0.05 for i in x]
    y2 = [0.5/np.log2(i) + random.random()*0.02 for i in x]
    #plt.plot(x, y1, x, y2, '.')
    #plt.show()
    y3 = 1/ (1 + np.exp(-x/50))
    y4 = [1/ (1 + np.exp(-i/70)) + random.random()*0.05 - 0.1 for i in x]
    #plt.plot(x, y3, '.', x, y4, '.')
    #plt.show()

    #save to json
    test_data = {}
    for i in range(max_step):
        test_data[i] = [y1[i], y2[i], y3[i], y4[i]]
    with open('test_data_loss_acc.json', 'w') as f:
        json.dump(test_data, f, indent=4)

if __name__ == '__main__':
    #gen_part1()
    gen_loss()
