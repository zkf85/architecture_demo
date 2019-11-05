from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import json
import os
import requests
import subprocess

# Create your views here.
#===============================================================================
# initialization
#===============================================================================
root_dir = os.path.join(settings.BASE_DIR, 'fpga_cloud')
base_dir = 'static/fpga_cloud'
png_dir = os.path.join(base_dir, 'cifar/png')
bin_dir = os.path.join(base_dir, 'cifar/bin')
png_filename_list = [f for f in os.listdir(os.path.join(root_dir, png_dir)) if not f.startswith('.')]
# sort the filename list:
png_filename_list = sorted(png_filename_list, key=lambda x: int(x.split('_')[0]))

# get number of the pictures
pics_num = len(png_filename_list)
#-------------------------------------------------------------------------------
# plan A initialization
#-------------------------------------------------------------------------------
# fpga program info
p_fpga = os.path.join(root_dir, base_dir, 'fpga_predict')
#-------------------------------------------------------------------------------
# plan B initialization
#-------------------------------------------------------------------------------
plan_b_txt = os.path.join(root_dir, base_dir, 'plan_b.txt')
plan_b_dict = {}
with open(plan_b_txt, 'r') as f:
    lines = f.readlines()
lines = [line.strip().split() for line in lines]
for line in lines:
    plan_b_dict[line[0]] = line[1:]

#===============================================================================
# view methods
#===============================================================================
def fpga_cloud(request):
    context = {}
    return render(request, 'fpga_cloud/fpga_cloud.html', context)


def ajax_update_img(request):

    step = int(request.GET.get('step'))
    filename = png_filename_list[step].replace('.png', '')
    
    return_json = {}
    return_json['png_src'] = os.path.join(png_dir, filename+'.png')

    use_plan_b = True
    use_plan_a = not use_plan_b
    #===========================================================================
    # plan A
    #===========================================================================
    if use_plan_a:
        # Call fpga program here:
        file_path = os.path.join(root_dir, bin_dir, filename+'.bin')

        # python 3.6.8
        output = subprocess.check_output([p_fpga, file_path]).decode('utf-8')
        # python 3.7
        #output = subprocess.run([p_fpga, file_path], capture_output=True).stdout.decode('utf-8')

        # parse the output and save to the return json
        tmp = output.split(',') 
        for i, item in enumerate(tmp):
            return_json['top_' + str(i+1)] = [item.split(':')[0].strip(), float(item.split(':')[1].strip())]

    #===========================================================================
    # plan B
    #===========================================================================
    if use_plan_b:
        return_json['top_1'] = plan_b_dict[filename][:2]
        return_json['top_2'] = plan_b_dict[filename][2:4]
        return_json['top_3'] = plan_b_dict[filename][4:]

    return HttpResponse(json.dumps(return_json), content_type='application/json')

if __name__ == "__main__":
#    filename = '0_cat'
#    output = subprocess.check_output([p_fpga, os.path.join(bin_dir, filename+'.bin')])
#    output = output.decode('utf-8').split(',')
#    l = {}
#    for i, item in enumerate(output):
#        l['top_' + str(i+1)] = [item.split(':')[0].strip(), float(item.split(':')[1].replace('%', '').strip())]
#
#    print(l)
    png_list = [f for f in os.listdir('static/fpga_cloud/cifar/png') if not f.startswith('.')]
    png_list = sorted(png_list, key=lambda x: int(x.split('_')[0]))
    for l in png_list:
        print(l)
