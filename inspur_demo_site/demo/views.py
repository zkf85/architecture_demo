from django.shortcuts import render
from django.http import HttpResponse
import json

test_data[100] = {
  'plane': [0.56, 2, 0.38, 5, 0.04],
  'car':[0.72, 6, 0.24, 9, 0.01],
}


label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
# Create your views here.
def tensorflow(request):
  context = {
    }
  if request.method == 'POST': 
    print('post received')
  text = request.POST.get('textfield', None)
  context['text'] = text
  context['label_list'] = label_list

  return render(request, 'demo/tensorflow.html', context)

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

def ajax_update_all(request):
  print('[kf info] ajax_update_all')
  step = int(request.GET.get('step'))
  print('[kf info] request step is: %d' % step)
  print('[kf info] step data is:', test_data.get(step))
  return_json = test_data.get(step)
  return HttpResponse(json.dumps(return_json), content_type='application/json')

def pagerank(request):
  return render(request, 'demo/pagerank.html')

def test(request):
  return render(request, 'demo/test.html')
