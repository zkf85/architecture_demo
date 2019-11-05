plan_b_txt = 'static/fpga_cloud/plan_b.txt'
plan_b_dict = {}
with open(plan_b_txt, 'r') as f:
    lines = f.readlines()
lines = [line.strip().split() for line in lines]
for line in lines:
    plan_b_dict[line[0]] = line[1:]

print(plan_b_dict)
print(len(plan_b_dict.keys()))
