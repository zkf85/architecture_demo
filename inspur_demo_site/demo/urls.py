"""
Filename: urls.py 
Created on Thu Sep 26 14:11:25 CST 2019

@author: Kefeng Zhu (zkf1985@gmail.com, zkf85@163.com)

- To add urls for the app
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.tensorflow, name='tensorflow'),
    path('test/', views.test, name='test'),
    path('ajax/add/', views.ajax_test_add, name='ajax_test_add'),
    path('ajax/refresh_chart/', views.ajax_refresh_chart, name='ajax_refresh_chart'),
    path('pagerank/', views.pagerank, name='pagerank'),
]
