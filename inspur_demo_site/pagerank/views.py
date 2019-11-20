from django.shortcuts import render
from django.http import HttpResponse                                           
from django.conf import settings                                                                    
import json                                                                     
import os                                                                       
import requests                                                                 
import subprocess    

import time

base_dir = os.path.join(settings.BASE_DIR, 'pagerank')
static_dir = os.path.join('static', 'pagerank')

dummy_list1  = [
    ['a1', 10.0],
    ['b1', 9.0],
    ['c1', 8.0],
    ['d1', 7.0],
    ['e1', 6.0],
    ['f1', 5.0],
    ['g1', 4.0],
    ['h1', 3.0],
    ['a1', 2.0],
    ['a1', 1.0],
]
dummy_list2  = [
    ['a2', 110.0],
    ['b2', 19.0],
    ['c2', 18.0],
    ['d2', 17.0],
    ['e2', 16.0],
    ['f2', 15.0],
    ['g2', 14.0],
    ['h2', 13.0],
    ['a2', 12.0],
    ['a2', 11.0],
]
dummy_time_1 = 9.9 # processing time
dummy_time_2 = 18.8 # processing time
dummy_time_3 = 0.9 # processing time
dummy_time_4 = 1.8 # processing time
edges_1 = 135
edges_2 = 142

# Create your views here.
def pagerank(request):
    context = {}
    return render(request, 'pagerank/pagerank.html', context)

def ajax_cpu(request):
    # choose from dataset-1/2
    option = request.GET.get('dataset')

    return_json = {}

    #===========================================================================
    # plan B
    #===========================================================================
    if option == '1':
        return_json['id_list'] = [i[0] for i in dummy_list1]
        return_json['pr_list'] = [i[1] for i in dummy_list1]
        return_json['time'] = dummy_time_1
        return_json['edges'] = edges_1
        return_json['mteps'] = "%.2f" % (edges_1 / dummy_time_1)
    if option == '2':
        return_json['id_list'] = [i[0] for i in dummy_list2]
        return_json['pr_list'] = [i[1] for i in dummy_list2]
        return_json['time'] = dummy_time_2
        return_json['edges'] = edges_2
        return_json['mteps'] = "%.2f" % (edges_2 / dummy_time_2)
    
    time.sleep(2)

    return HttpResponse(json.dumps(return_json), content_type='application/json')

def ajax_fpga(request):

    option = request.GET.get('dataset')

    return_json = {}

    if option == '1':
        return_json['id_list'] = [i[0] for i in dummy_list1]
        return_json['pr_list'] = [i[1] for i in dummy_list1]
        return_json['time'] = dummy_time_3
        return_json['edges'] = edges_1
        return_json['mteps'] = "%.2f" % (edges_1 / dummy_time_3)
    if option == '2':
        return_json['id_list'] = [i[0] for i in dummy_list2]
        return_json['pr_list'] = [i[1] for i in dummy_list2]
        return_json['time'] = dummy_time_4
        return_json['edges'] = edges_2
        return_json['mteps'] = "%.2f" % (edges_2 / dummy_time_4)

    return HttpResponse(json.dumps(return_json), content_type='application/json')
    return HttpResponse(json.dumps(return_json), content_type='application/json')



