from run import run_attack
paras = {"model_name": "vgg_16", "layer_name": "conv5_3", "max_epsilon": "6", "num_iter": "7", "alpha": "8"}
run_attack(paras=paras, dataset=1)
# python attack.py