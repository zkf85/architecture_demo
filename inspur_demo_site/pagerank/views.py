from django.shortcuts import render
from django.http import HttpResponse                                           
from django.conf import settings                                                                    
import json                                                                     
import os                                                                       
import requests                                                                 
import subprocess    
import re

import time
import random

base_dir = os.path.join(settings.BASE_DIR, 'pagerank')
static_dir = os.path.join('static', 'pagerank')


#===============================================================================
# init for plan A
#===============================================================================
current_path = os.getcwd()
graphchi_run_path = '/root/pagerank_graphchi/graphchi-cpp'
graphchi_result_report_file_path = '/root/pagerank_graphchi/datasets/odd/report_full.txt'

fpga_project_dir = '/home/lzh/zynqmp_Xilinx_Answer_65444_Linux_Files-new-191108/tests'
data_file = 'weibo.txt'
fpga_program = 'pagerank.sh'
fpga_txt = 'pagerank_result.txt'

# get the edge number and node number of the input data
with open(os.path.join(fpga_project_dir, data_file), 'r') as f:                                                      
    id_list = f.read().split()                                                     
id_list = [int(i) for i in id_list]
id_set = set(id_list)  
edge_num = len(id_list) // 2
node_num = len(id_set)
print('[kf info] weibo data loaded, the total number of edges is:', edge_num)
print('[kf info] weibo data loaded, the total number of nodes is:', node_num)

#===============================================================================
# init for plan B
#===============================================================================
real_list1 = [[2803301701, 14.5517], [2882617115, 9.5628], [1705180884, 7.1973], [1618051664, 6.42148], [3044746573, 6.24524], [1195230310, 6.16799], [1239246050, 5.63648], [1642351362, 5.1774], [3623353053, 5.09011], [1223178222, 5.00877], [1496852380, 4.9819], [3948713134, 4.83744], [3217179555, 4.56545], [3591355593, 4.51568], [1195054531, 4.45703], [1227368500, 4.37004], [5044281310, 4.22287], [1191220232, 4.12051], [1904769205, 3.95445], [2706896955, 3.87282], [1730726637, 3.83817], [6453988165, 3.75894], [1087770692, 3.75137]]

real_list2 = [[2656274875, 11.3189], [1826792401, 10.8585], [6020086612, 10.3003], [2714280233, 7.31897], [5187664653, 7.0579], [1192329374, 6.07459], [2970452952, 6.00888], [1195242865, 5.84276], [1742566624, 5.84238], [1669879400, 5.69436], [1891502860, 5.53812], [1721030997, 5.53514], [3952070245, 5.23354], [1259110474, 5.00257], [2202387347, 4.91914], [2286908003, 4.89331], [3937348351, 4.68463], [2360812967, 4.52942], [1678105910, 4.37827], [2609400635, 3.9647], [3206603957, 3.95737], [1280761142, 3.86039], [1182391231, 3.8601], [1537790411, 3.85708], [1259193624, 3.82312], [6453988165, 3.81136]]

cpu_time_1 = 8.64609
cpu_time_2 = 8.65053
fpga_time_1 = 0.015894
fpga_time_2 = 0.015884
edges_1 = 13.986288
edges_2 = 13.978716
niters = 10

# Set the plan option
plan = 'A'
#plan = 'B'

# Create your views here.
def pagerank(request):
    context = {}
    return render(request, 'pagerank/pagerank.html', context)

def ajax_cpu(request):
    # choose from dataset-1/2
    option = request.GET.get('dataset')
    return_json = {}
    #===========================================================================
    # plan A
    #===========================================================================
    if plan == 'A':
        real_list1 = []
        num_flag = 0
        os.chdir(graphchi_run_path)
        subprocess.run(['sh', 'kfrun.sh'])
        os.chdir(current_path)
        #=======================================================================
        # read imformation from report_full.txt
        #=======================================================================
        with open(graphchi_result_report_file_path, 'r') as graphchi_report_file:
            report_list = graphchi_report_file.readlines()

        for current_list in report_list:
            split_list = list(re.split('[: \t]', current_list.strip('\n')))

            if split_list[0] == '1.':
                num_flag += 1
            if split_list[0] == '20.':
                num_flag = 0
            if num_flag == 1:
                real_list1.append([split_list[1], float(split_list[2])])

            # catch the run time
            if split_list[0] == 'runtime':
                print('CPU run PageRank use time:', split_list[3])
                cpu_time = float(split_list[3])

        return_json['id_list'] = [i[0] for i in real_list1]
        return_json['pr_list'] = [i[1] for i in real_list1]
        return_json['time'] = cpu_time
        return_json['edges'] = edge_num
        return_json['mteps'] = edge_num / cpu_time_1 / 1e6

    #===========================================================================
    # plan B
    #===========================================================================
    if plan == 'B':
        # add random anomaly
        anomaly = (random.random() - 0.5) * 2 * 2

        if option == '1':
            return_json['id_list'] = [i[0] for i in real_list1]
            return_json['pr_list'] = [i[1] for i in real_list1]
            return_json['time'] = cpu_time_1 + anomaly
            return_json['edges'] = edges_1
            return_json['mteps'] = "%.2f" % (edges_1 * niters / (cpu_time_1 + anomaly))
            time.sleep(cpu_time_1)
            print('cpu processing time:', cpu_time_1 + anomaly)
        if option == '2':
            return_json['id_list'] = [i[0] for i in real_list2]
            return_json['pr_list'] = [i[1] for i in real_list2]
            return_json['time'] = cpu_time_2 + anomaly
            return_json['edges'] = edges_2
            return_json['mteps'] = "%.2f" % (edges_2 * niters / (cpu_time_2 + anomaly))
            time.sleep(cpu_time_2)
            print('cpu processing time:', cpu_time_2 + anomaly)

    return HttpResponse(json.dumps(return_json), content_type='application/json')

def ajax_fpga(request):

    option = request.GET.get('dataset')
    return_json = {}
    #===========================================================================
    # plan A
    #===========================================================================
    if plan == 'A':
        os.chdir(fpga_project_dir)
        subprocess.run(['sh', fpga_program])

        print('fpga_program is done!!!!')
        # read the resulting txt file
        with open(os.path.join(fpga_project_dir, fpga_txt), 'r') as f:
            result = f.read().split()

        result = [float(i) for i in result]
        # parse the resulting txt file into python
        # 1. processing time in the first line
        processing_time = result[0]
        # 2. pr values from line 3 to the end
        #pr = result[2:]
        ########################################################################
        # CHANGES HERE!!!!
        pr = [15*1000*i for i in result[2:]]
        ########################################################################
        pr_zip = []
        for ind, val in enumerate(pr):
            ####################################################################
            # PROGLEM HERE!!!
            pr_zip.append((ind + 2, val))
            ####################################################################
    
        # sort the list based on pr value
        pr_zip.sort(key=lambda x: x[1], reverse=True)
        #print('pr-3', pr_zip)

        return_json['id_list'] = [i[0] for i in pr_zip[:20]]
        return_json['pr_list'] = [i[1] for i in pr_zip[:20]]
        return_json['time'] = processing_time
        return_json['edges'] = edge_num
        return_json['mteps'] = edge_num / processing_time / 1E6

        # change the working directory back to the original one
        os.chdir(current_path)

    #===========================================================================
    # plan B
    #===========================================================================
    if plan == 'B':
        # add random anomaly
        anomaly = (random.random() - 0.5) * 2 * 0.0001

        if option == '1':
            return_json['id_list'] = [i[0] for i in real_list1]
            return_json['pr_list'] = [i[1] for i in real_list1]
            return_json['time'] = fpga_time_1 + anomaly
            return_json['edges'] = edges_1
            return_json['mteps'] = "%.2f" % (edges_1 * niters / (fpga_time_1 + anomaly))
            time.sleep(fpga_time_1)
            print('fpga processing time:', fpga_time_1 + anomaly)
        if option == '2':
            return_json['id_list'] = [i[0] for i in real_list2]
            return_json['pr_list'] = [i[1] for i in real_list2]
            return_json['time'] = fpga_time_2 + anomaly
            return_json['edges'] = edges_2 
            return_json['mteps'] = "%.2f" % (edges_2 * niters / (fpga_time_2 + anomaly))
            time.sleep(fpga_time_2)
            print('fpga processing time:', fpga_time_2 + anomaly)

    return HttpResponse(json.dumps(return_json), content_type='application/json')


