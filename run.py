import attack, verify

def run_attack(paras, dataset):

    attack.FLAGS.model_name = paras["model_name"]
    attack.FLAGS.layer_name = paras["model_name"] + "/" + paras["layer_name"][:-2] + "/" + paras[
        "layer_name"] + "/" + "Relu"
    print(attack.FLAGS.layer_name)
    attack.FLAGS.input_dir = "./data/ori/"
    attack.FLAGS.input_dir = "./data/adv/"
    attack.FLAGS.max_epsilon = float(paras["max_epsilon"])
    attack.FLAGS.num_iter = int(paras["num_iter"])
    attack.FLAGS.alpha = float(paras["alpha"])
    attack.main()

def run_verify():
    pass