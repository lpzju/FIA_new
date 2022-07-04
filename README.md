
### Example Usage

##### Generate adversarial examples:

- FIA

```
python attack.py --model_name vgg_16 --layer_name vgg_16/conv3/conv3_3/Relu --input_dir ./data/ori/ --output_dir ./data/adv/ --max_epsilon 16 --num_iter 10 --alpha 1.6
```

##### Evaluate the attack success rate

```
python verify.py --ori_path ./data/ori/ --adv_path ./data/adv/ --output_file ./data/log.json --model_names inception_v3,inception_v4,inception_resnet_v2,resnet_v1_50,resnet_v1_152,vgg_16,vgg_19
```


