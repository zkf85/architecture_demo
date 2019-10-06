from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.
def tensorflow(request):
  context = {
    }
  if request.method == 'POST': 
    print('post received')
  text = request.POST.get('textfield', None)
  context['text'] = text

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


def pagerank(request):
  return render(request, 'demo/pagerank.html')

def test(request):
  return render(request, 'demo/test.html')
