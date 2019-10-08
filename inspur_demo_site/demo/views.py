from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import json
import os

#print(settings.BASE_DIR)

fpga_data_file_path = 'data/test_fpga_500.json'
cpu_data_file_path = 'data/test_cpu_500.json'
#cpu_data_file_path = 'data/inference_data_cpu2.json'
loss_acc_file_path = 'data/test_data_loss_acc.json'

with open(os.path.join(settings.BASE_DIR, 'demo', cpu_data_file_path), 'r') as f:
  cpu_data = json.load(f)
with open(os.path.join(settings.BASE_DIR, 'demo', fpga_data_file_path), 'r') as f:
  fpga_data = json.load(f)
with open(os.path.join(settings.BASE_DIR, 'demo', loss_acc_file_path), 'r') as f:
  loss_acc_data = json.load(f)
label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

# Create your views here.
def tensorflow(request):
  context = {}
  if request.method == 'POST': 
    print('post received')
  text = request.POST.get('textfield', None)
  context['text'] = text
  context['label_list'] = label_list
  return render(request, 'demo/tensorflow.html', context)


def ajax_update_all(request):
  step = request.GET.get('step')
  #print('[kf info] request step is: %s' % step)
  #print('[kf info] step data is:', fpga_data.get(step))
  #cpu_return_json = cpu_data.get(step)
  #print(loss_acc_data.get(step))
  return_json = {}
  return_json['fpga'] = fpga_data.get(step)
  return_json['cpu'] = cpu_data.get(step)
  return_json['loss_acc'] = loss_acc_data.get(step)

  return HttpResponse(json.dumps(return_json), content_type='application/json')


def ajax_test_add(request):
  print('[kf info] Im here!!!')
  a = int(request.GET.get('a'))
  b = int(request.GET.get('b'))
  return_json = {'result': a+b}
  return HttpResponse(json.dumps(return_json), content_type='application/json')

def ajax_refresh_chart(request):
  print('[kf info] ajax_refresh_chart')
  return_json = {'list': list(range(10))[::-1]}
  return HttpResponse(json.dumps(return_json), content_type='application/json')


def pagerank(request):
  return render(request, 'demo/pagerank.html')

def test(request):
  return render(request, 'demo/test.html')
