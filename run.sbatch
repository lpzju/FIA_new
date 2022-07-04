#!/bin/bash
#SBATCH --output=./log/log.txt
#SBATCH --job-name="1"
#SBATCH --gres=gpu:1
#SBATCH --account=zbwang

export HDF5_USE_FILE_LOCKING=FALSE
#source activate
#conda activate tensorflow-1.13-gpu

module load google/tensorflow/python3.6-gpu


python -u attack.py --model_name vgg_16 --layer_name vgg_16/conv3/conv3_3/Relu --input_dir ./data/ori/ --output_dir ./data/adv/ --max_epsilon 16 --num_iter 10 --alpha 1.6
python verify.py --ori_path ./data/ori/ --adv_path ./data/adv/ --model_names inception_v3,inception_v4,inception_resnet_v2
