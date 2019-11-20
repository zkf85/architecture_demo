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

real_list1 = [[2803301701, 14.5517], [2882617115, 9.5628], [1705180884, 7.1973], [1618051664, 6.42148], [3044746573, 6.24524], [1195230310, 6.16799], [1239246050, 5.63648], [1642351362, 5.1774], [3623353053, 5.09011], [1223178222, 5.00877], [1496852380, 4.9819], [3948713134, 4.83744], [3217179555, 4.56545], [3591355593, 4.51568], [1195054531, 4.45703], [1227368500, 4.37004], [5044281310, 4.22287], [1191220232, 4.12051], [1904769205, 3.95445], [2706896955, 3.87282], [1730726637, 3.83817], [6453988165, 3.75894], [1087770692, 3.75137]]

real_list2 = [[2656274875, 11.3189], [1826792401, 10.8585], [6020086612, 10.3003], [2714280233, 7.31897], [5187664653, 7.0579], [1192329374, 6.07459], [2970452952, 6.00888], [1195242865, 5.84276], [1742566624, 5.84238], [1669879400, 5.69436], [1891502860, 5.53812], [1721030997, 5.53514], [3952070245, 5.23354], [1259110474, 5.00257], [2202387347, 4.91914], [2286908003, 4.89331], [3937348351, 4.68463], [2360812967, 4.52942], [1678105910, 4.37827], [2609400635, 3.9647], [3206603957, 3.95737], [1280761142, 3.86039], [1182391231, 3.8601], [1537790411, 3.85708], [1259193624, 3.82312], [6453988165, 3.81136]]

cpu_time_1 = 8.64609
cpu_time_2 = 8.65053
fpga_time_1 = 0.015894
fpga_time_2 = 0.015884
edges_1 = 13.986288
edges_2 = 13.978716
niters = 10

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
        return_json['id_list'] = [i[0] for i in real_list1]
        return_json['pr_list'] = [i[1] for i in real_list1]
        return_json['time'] = cpu_time_1
        return_json['edges'] = edges_1
        return_json['mteps'] = "%.2f" % (edges_1 * niters / cpu_time_1)
        time.sleep(cpu_time_1)
    if option == '2':
        return_json['id_list'] = [i[0] for i in real_list2]
        return_json['pr_list'] = [i[1] for i in real_list2]
        return_json['time'] = cpu_time_2
        return_json['edges'] = edges_2
        return_json['mteps'] = "%.2f" % (edges_2 * niters / cpu_time_2)
        time.sleep(cpu_time_2)
    

    return HttpResponse(json.dumps(return_json), content_type='application/json')

def ajax_fpga(request):

    option = request.GET.get('dataset')

    return_json = {}

    if option == '1':
        return_json['id_list'] = [i[0] for i in real_list1]
        return_json['pr_list'] = [i[1] for i in real_list1]
        return_json['time'] = fpga_time_1
        return_json['edges'] = edges_1
        return_json['mteps'] = "%.2f" % (edges_1 * niters / fpga_time_1)
        time.sleep(fpga_time_1)
    if option == '2':
        return_json['id_list'] = [i[0] for i in real_list2]
        return_json['pr_list'] = [i[1] for i in real_list2]
        return_json['time'] = fpga_time_2
        return_json['edges'] = edges_2 
        return_json['mteps'] = "%.2f" % (edges_2 * niters / fpga_time_2)
        time.sleep(fpga_time_2)

    return HttpResponse(json.dumps(return_json), content_type='application/json')


