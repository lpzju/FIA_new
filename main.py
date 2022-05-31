# -*- coding: utf-8 -*-
import json
import os
from flask import Flask, request, url_for, send_from_directory, render_template
from werkzeug.utils import secure_filename
from datetime import timedelta
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif','txt','pdf'])

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
def upload_file():
    if request.method == "GET":
        return render_template("FIA_v2.html")
    else:
        paras = {
            "model_name": request.form.get("modal"),
            "layer_name": request.form.get("layer"),
            "max_epsilon": request.form.get("max_mv"),
            "num_iter": request.form.get("mv_times"),
            "alpha": request.form.get("stp_times"),
        }
        print(paras)
        return json.dumps({"states": "success"})
        # file = request.files['file']
        # if file and allowed_file(file.filename):
        #     filename = secure_filename(file.filename)
        #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # file_url = url_for('uploaded_file', filename=filename)
        # return html + '<br><img src=' + file_url + '>'



if __name__ == '__main__':
    # app.run(host='0.0.0.0', port='14140', debug=True)
    app.run(debug=True)