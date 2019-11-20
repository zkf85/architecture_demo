
import subprocess
import os
import re
import json

report_odd_path = 'Page_Rank_CPU/datasets/odd/report_full_odd.txt'
report_even_path = 'Page_Rank_CPU/datasets/even/report_full_even.txt'
graphchi_path = 'Page_Rank_CPU/graphchi-cpp'
current_path = '../../'
decode_json_even_path = 'Page_Rank_CPU/datasets/even/follow_only_even_top_data_decoding_dict.json'
decode_json_odd_path = 'Page_Rank_CPU/datasets/odd/follow_only_odd_top_data_decoding_dict.json'
nickname_decode_path = 'Page_Rank_CPU/id_nickname.json'
black_list_even_path = 'Page_Rank_CPU/datasets/black_list_even.txt'
black_list_odd_path = 'Page_Rank_CPU/datasets/black_list_odd.txt'
black_list_path = 'Page_Rank_CPU/datasets/black_list.txt'
result_json_even_path = 'Page_Rank_CPU/datasets/result_even.json'
result_json_odd_path = 'Page_Rank_CPU/datasets/result_odd.json'

#global top_50_list
#global decode_list
#top_50_list = []
#decode_list = []

EVEN = 0
ODD = 1

#####################################
# run graphchi-cpp
#####################################
def run_graphchi(dataset_flag):
  os.chdir(graphchi_path)
  if dataset_flag == EVEN:
    output = subprocess.check_output('./kfrun_even.sh').decode('utf-8')
  else:
    output = subprocess.check_output('./kfrun_odd.sh').decode('utf-8')
  # print(output)
  os.chdir(current_path)


#####################################
# grab top 50 name and runtime
# return: top_50_list, run time
#####################################
def grab_top50_runtime(dataset_flag):
  num_flag = 0 
  run_time = 0.0
  top_50_list = []

  if dataset_flag == EVEN:
    current_path = report_even_path
  else:
    current_path = report_odd_path

  with open(current_path, 'r') as report_file:
    current_lists = report_file.readlines()

    for current_list in current_lists:
      split_list = list(re.split('[: \t]', current_list.strip('\n')))
      # print(split_list)
    
      if split_list[0]=='1.':
        num_flag += 1
      if split_list[0] =='50.':
        num_flag = 0

      if num_flag == 1:
        top_50_list.append([split_list[1], float(split_list[2])])
      
      # catch the run time 
      if split_list[0] == 'runtime':
        print('CPU run PageRank use time:', split_list[3])
        run_time = float(split_list[3])
    # print(top_50_list)
    # print(' ')
    return top_50_list, run_time


#####################################
# decode top 50 names to real id
#####################################
def Decode_2_id(dataset_flag, top_50_list_in):
  decode_list = []

  if dataset_flag == EVEN:
    current_path = decode_json_even_path
  else:
    current_path = decode_json_odd_path

  with open(current_path, 'r') as decode_file:
    decode_dict = json.load(decode_file)
    # print(type(decode_dict))
    for index in top_50_list_in:
      decode_id = decode_dict[index[0]]
      decode_list.append([decode_id, index[1]])
  
  return decode_list
  # print(decode_list)
  # print(' ')


#####################################
# filter the decode top 50 names
#####################################
def filter_decode(dataset_flag, decode_list_in):
  blacklist = []
  with open(black_list_path, 'r') as black_list_file:
    black_list = black_list_file.readlines()
    for index in black_list:
      temp = index.strip('\n').split(' ')
      blacklist.append(int(temp[0]))
    filtered_decode = [i for i in decode_list_in if i[0] not in blacklist]
 
  if dataset_flag == EVEN:
    current_path = result_json_even_path
  else:
    current_path = result_json_odd_path

  with open(current_path, 'w') as res_file:
    json.dump(filtered_decode, res_file)

  return filtered_decode

#####################################
# decode real id to nickname
# output: one list
#####################################
def Decode_2_nickname(dataset_flag, decode_list_in):
  decode_top_list = []

  for temp in decode_list_in:
    decode_top_list.append([str(temp[0]), temp[1]])

  if dataset_flag == EVEN:
    current_path = black_list_even_path
  else:
    current_path = black_list_odd_path
  '''
  with open(nickname_decode_path, 'r') as decode_file, open(current_path, 'w') as black_list_file:
    nickname_dict = json.load(decode_file)
    # print(type(nickname_dict))
    for index in decode_top_list:
      for index1 in nickname_dict:
        if index[0] == index1['id']:
          black_list_file.write(index1['id'])
          black_list_file.write(' ')
          black_list_file.write(index1['nickname'])
          black_list_file.write('\n')
          
          index[0] = index1['nickname']  
  '''
  with open(nickname_decode_path, 'r') as decode_file:
    nickname_dict = json.load(decode_file)
    # print(type(nickname_dict))
    for index in decode_top_list:
      for index1 in nickname_dict:
        if index[0] == index1['id']:
          index[0] = index1['nickname']   
  # print(decode_top_list)
  return decode_top_list
    
def dataset_choice(dataset_flag):
  # run_graphchi(dataset_flag)
  top_list, runtime = grab_top50_runtime(dataset_flag)
  top_list_decoded = Decode_2_id(dataset_flag, top_list)
  filtered_decode = filter_decode(dataset_flag, top_list_decoded)
  nickname_top = Decode_2_nickname(dataset_flag, filtered_decode)
  print(nickname_top)



dataset_choice(1)









