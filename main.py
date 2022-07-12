# -*- coding: utf-8 -*-
import json
import os
from flask import Flask, request, url_for, send_from_directory, render_template
from werkzeug.utils import secure_filename
from datetime import timedelta
import verify, attack
import datetime, pytz
import threading, hashlib, time, json

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif','txt','pdf'])

format_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M"))
salt = str(format_time)
# 任务列表
Backboxdict = {}
Backboxlist = []
whileflag = 0
Eofdata = False

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.getcwd()
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds = 1)

@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    filename = None
    if endpoint == 'static':
        filename = values.get('filename', None)
    if filename:
        file_path = os.path.join(app.root_path, endpoint, filename)
        values['v'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)


@app.route('/', methods=['GET', 'POST'])
def adv_gen():
    global Eofdata
    if request.method == "GET":
        return render_template("FIA_v2.html")
    else:
        curr_time = str(datetime.datetime.now(pytz.timezone('Asia/Shanghai')).strftime("%Y%m%d_%H%M"))
        m = hashlib.md5()
        m.update(("FIA_" + str(time.time()) + "_" + str(salt)).encode('utf-8'))
        print(m)
        tid_temp = "%s_%s" % (curr_time, m.hexdigest())
        tid = tid_temp[:21]
        print("#####################################tid:%s#####################################" % tid)

        paras = {
            "model_name": request.form.get("modal"),
            "layer_name": request.form.get("layer"),
            "max_epsilon": request.form.get("max_mv"),
            "num_iter": request.form.get("mv_times"),
            "alpha": request.form.get("stp_times"),
            "tid": tid
        }
        print('#' * 10 + "adv param" + '#' * 10)
        print(paras)
        if Eofdata == False:
            print('----ready to t1 -----')
            t1 = threading.Thread(target=run_attack, args=(paras,))
            print('---- thread----------')
            t1.setDaemon(True)
            t1.start()
            Eofdata=True
        return json.dumps({"states": "success", "tid": paras["tid"] })


def run_attack(paras):
    global Eofdata
    Eofdata = False
    _ = None
    attack.FLAGS.model_name = paras["model_name"]
    attack.FLAGS.layer_name = paras["model_name"] + "/" + paras["layer_name"][:-2] + "/" + paras["layer_name"] + "/" + "Relu"
    attack.FLAGS.input_dir = "./static/res/tmp/ori/"
    attack.FLAGS.output_dir = "./static/res/tmp/adv/"
    attack.FLAGS.max_epsilon = float(paras["max_epsilon"])
    attack.FLAGS.num_iter = int(paras["num_iter"])
    attack.FLAGS.alpha = float(paras["alpha"])
    try:
        print("attack.FLAGS.model_name为"+attack.FLAGS.model_name)
        print("attack.FLAGS.layer_name为"+attack.FLAGS.layer_name)
        print("attack.FLAGS.input_dir为" + attack.FLAGS.input_dir)
        print("attack.FLAGS.output_dir为" + attack.FLAGS.output_dir)
        attack.main(_)
        Eofdata = True
        print('attack.main执行结束')

    except:
        print("执行失败")

@app.route('/get_advresult', methods=['POST'])
def get_advresult():
    tid = request.form.get("tid")
    path = "./static/res/tmp/adv"
    if os.path.isdir(path):
        print('adv不为空,tid为'+tid)
        return json.dumps({"Eof": True})
    else:
        return json.dumps({"Eof": False})

# 任务消耗池
def Taskrun():
    global Backboxlist
    global Backboxdict
    global whileflag
    
    while(len(Backboxlist)>0):
        print("******************************while begin******************************") 
        Nowtid=""
        print("7:",Nowtid,Backboxlist)
        # 大于0则有任务，等于0无任务，sleep20秒
        while len(Backboxlist) > 0 :
            # 当前无任务进行或者Nowtid已完成
            if Nowtid=="" or Nowtid not in Backboxdict.keys():
                print("1:",Nowtid,Backboxlist)
                Nowtid = Backboxlist[0]
                t2 = threading.Thread(target=backboxrun,args=(Backboxdict,Nowtid,))
                t2.setDaemon(True)
                t2.start()
                # Backboxdict[Nowtid]["flag"]=1
                time.sleep(10)
            # 当前tid运行中
            elif Backboxdict[Nowtid]["flag"]==1:
                print("2:",Nowtid,Backboxlist)
                time.sleep(60)
            # 当前任务完成
            elif Backboxdict[Nowtid]["flag"]==2:
                print("3:",Nowtid,Backboxlist)
                Backboxlist.pop(0)
                Backboxdict.pop(Nowtid)
                # 缓存列表中的任务都完成了
                # print(Backboxlist)
                if len(Backboxlist) == 0:
                    time.sleep(20)
                    continue
                Nowtid = Backboxlist[0]
                time.sleep(10)
                t2 = threading.Thread(target=backboxrun,args=(Backboxdict,Nowtid,))
                t2.setDaemon(True)
                t2.start()
                print("4:",Nowtid,Backboxlist)
                time.sleep(10)
            elif Backboxdict[Nowtid]["flag"] == 0:
                print("5:",Nowtid,Backboxlist)
                t2 = threading.Thread(target=backboxrun,args=(Backboxdict,Nowtid,))
                t2.setDaemon(True)
                t2.start()
                time.sleep(10)
        time.sleep(30)
    whileflag = 0
    print("wileflag:",whileflag)


# 黑盒任务执行
def backboxrun(Backboxdict, tid):
    Backboxdict[tid]["flag"]=1
    print("###################################processing#################################")
    print("6:",tid,Backboxdict)
    model_names = Backboxdict[tid]["param"]["model_names"]
    ori_path = Backboxdict[tid]["param"]["ori_path"]
    adv_path = Backboxdict[tid]["param"]["adv_path"]
    output_file = Backboxdict[tid]["param"]["output_file"]
    print(model_names)
    verify.test2(ori_path, adv_path, output_file, model_names)
    Backboxdict[tid]["Eof"] = True
    Backboxdict[tid]["flag"]=2
    print("------------------"+tid+"backbox end------------------")

# 黑盒任务调用
@app.route('/post_backbox', methods=['POST'])
def post_backbox():
    global whileflag
    # tid 生成
    curr_time = str(datetime.datetime.now(pytz.timezone('Asia/Shanghai')).strftime("%Y%m%d_%H%M"))
    m = hashlib.md5()
    m.update(("FIA_"+str(time.time())+"_"+str(salt)).encode('utf-8'))
    print(m)
    tid_temp = "%s_%s"%(curr_time,m.hexdigest())
    tid=tid_temp[:21]
    print("#####################################tid:%s#####################################" % tid)
    # 参数生成
    model_namesstr = request.form.get("model_names")
    model_names = model_namesstr.split("\"")[1:-1]
    for x in model_names:
        if x == ",":
            model_names.remove(",")
    print(model_names)
    param = {"model_names": model_names,
    "ori_path":"./data/ori/",
    "adv_path":"./data/adv/",
    "output_file":"./data/%s.json" % tid,
    "tid":tid
    }
    print("###########################param#############################\n")
    print(param)
    # 添加至任务列表
    Backboxdict[tid]={}
    Backboxdict[tid]["param"]=param
    Backboxdict[tid]["flag"]=0
    Backboxdict[tid]["Eof"]=False
    Backboxlist.append(tid)
    # 如果任务执行进程未启动，则开启
    # backboxrun(Backboxdict,tid)
    if whileflag == 0:
        t3 = threading.Thread(target=Taskrun,args=())
        t3.setDaemon(True)
        t3.start()
        whileflag = 1
    # 返回tid
    return json.dumps({"status":"success","tid":tid})


# 获取黑盒测试数据
@app.route('/get_backboxdata', methods=['POST'])
def get_backbox():
    tid = request.form.get("tid")
    path = "./data/"+tid+".json"
    if os.path.exists(path):
        with open(path, "r") as fp:
            data = json.load(fp)
        if len(data) > 0:
            return json.dumps({"BackboxResult":data,"Eof":True})
        else:
            return json.dumps({"Eof":False})
    else:
        return json.dumps({"Eof":False})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8880', debug=True)
    # app.run(debug=True)
