from django.shortcuts import render
from django.http import HttpResponse                                            
from django.conf import settings                                                                    
import json                                                                     
import os                                                                       
import requests                                                                 
import subprocess    

base_dir = os.path.join(settings.BASE_DIR, 'pagerank')
static_dir = os.path.join('static', 'pagerank')

# Create your views here.
def pagerank(request):
    context = {}
    return render(request, 'pagerank/pagerank.html', context)

def ajax_cpu(request):
    return

def ajax_fpga_single(request):
    return
def ajax_fpga_loop(request):
    return



