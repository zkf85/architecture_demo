from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import json
import os
import requests

# Create your views here.
small_pics_dir = 'resized_pics'
original_pics_dir = 'source_pics'

abs_small_pics_dir = os.path.join(settings.BASE_DIR, 'fpga_cloud/static', small_pics_dir)
abs_original_pics_dir = os.path.join(settings.BASE_DIR, 'fpga_cloud/static', original_pics_dir)

small_pics_filename_list = [f for f in os.listdir(abs_small_pics_dir) if not f.startswith('.')]
original_pics_filename_list = [f for f in os.listdir(abs_original_pics_dir) if not f.startswith('.')]

# api info
api_url = 'http://10.165.29.241:5000'

#print(small_pics_filename_list)
pics_num = len(small_pics_filename_list)
check = len(original_pics_filename_list)

#print(pics_num, check)

def fpga_cloud(request):
    context = {}
    return render(request, 'fpga_cloud/fpga_cloud.html', context)


def ajax_update_small(request):

    step = int(request.GET.get('step'))
    filename = small_pics_filename_list[step]
    return_json = {}
    return_json['src'] = os.path.join('static', small_pics_dir, filename)

    res = requests.post(api_url, data={'image': filename})
    #print(res.content)
    tmp = json.loads(res.content.decode('utf-8'))
    return_json['cls'] = tmp['best_prediction'][0][0]

    return HttpResponse(json.dumps(return_json), content_type='application/json')

