import requests
import os
import json

small_pics_dir = 'resized_pics'
original_pics_dir = 'source_pics'

abs_small_pics_dir = os.path.join('static', small_pics_dir)
abs_original_pics_dir = os.path.join('static', original_pics_dir)

small_pics_filename_list = [f for f in os.listdir(abs_small_pics_dir) if not f.startswith('.')]
original_pics_filename_list = [f for f in os.listdir(abs_original_pics_dir) if not f.startswith('.')]

api_url = 'http://10.165.29.241:5000'

for step in range(0, len(small_pics_filename_list)):
    filename = small_pics_filename_list[step]
    print(filename)
    res = requests.post(api_url, data={'image': filename})
    res_0 = res.content.decode('utf-8')
    tmp = json.loads(res_0)
    print(tmp['best_prediction'][0][0])
