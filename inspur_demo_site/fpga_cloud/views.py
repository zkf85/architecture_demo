from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import json
import os
import requests
import subprocess

# Create your views here.
base_dir = 'static/fpga_cloud'
png_dir = os.path.join(base_dir, 'cifar/png')
bin_dir = os.path.join(base_dir, 'cifar/bin')
png_filename_list = [f for f in os.listdir(os.path.join(settings.BASE_DIR, 'fpga_cloud', png_dir)) if not f.startswith('.')]

# fpga program info
p_fpga = 'fpga_predict'

#print(small_pics_filename_list)
pics_num = len(png_filename_list)


def fpga_cloud(request):
    context = {}
    return render(request, 'fpga_cloud/fpga_cloud.html', context)


def ajax_update_img(request):

    step = int(request.GET.get('step'))
    filename = png_filename_list[step].replace('.png', '')
    
    # Call fpga program here:
    #output = subprocess.run([, filename])
    file_path = os.path.join(settings.BASE_DIR, 'fpga_cloud', bin_dir, filename+'.bin')
    output = subprocess.check_output([os.path.join(settings.BASE_DIR, 'fpga_cloud', p_fpga), file_path]).decode('utf-8')

    # parse the output and save to the return json
    return_json = {}
    return_json['png_src'] = os.path.join(png_dir, filename+'.png')

    tmp = output.split(',') 
    for i, item in enumerate(tmp):
        return_json['top_' + str(i+1)] = [item.split(':')[0].strip(), float(item.split(':')[1].strip())]

    return HttpResponse(json.dumps(return_json), content_type='application/json')

#if __name__ == "__main__":
#    filename = '0_cat'
#    output = subprocess.check_output([p_fpga, os.path.join(bin_dir, filename+'.bin')])
#    output = output.decode('utf-8').split(',')
#    l = {}
#    for i, item in enumerate(output):
#        l['top_' + str(i+1)] = [item.split(':')[0].strip(), float(item.split(':')[1].replace('%', '').strip())]
#
#    print(l)
        
        

    
