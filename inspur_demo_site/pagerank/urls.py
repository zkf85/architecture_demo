"""
Filename: urls.py 
Created on Thu Sep 26 14:11:25 CST 2019

@author: Kefeng Zhu (zkf1985@gmail.com, zkf85@163.com)

- To add urls for the app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.pagerank, name='pagerank'),
    path('ajax/cpu', views.ajax_cpu, name='ajax_cpu'),
    path('ajax/fpga', views.ajax_fpga, name='ajax_fpga'),
]
