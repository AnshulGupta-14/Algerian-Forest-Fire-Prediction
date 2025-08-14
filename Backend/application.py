import pickle
from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

application = Flask(__name__)
app = application

CORS(app)  

ridge_model = pickle.load(open("models/ridgereg.pkl", "rb"))
standard_scaler = pickle.load(open("models/scaler.pkl", "rb"))


@app.route('/', methods=['GET','POST'])
def predict_datapoint():
    try:
        data = request.get_json()
        Temprature = float(data['Temperature'])
        RH = float(data['RH'])
        Ws = float(data['Ws'])
        Rain = float(data['Rain'])
        FFMC = float(data['FFMC'])
        DMC = float(data['DMC'])
        ISI = float(data['ISI'])
        Classes = float(data['Classes'])
        region = float(data['region'])

        # Scale and predict
        new_data = standard_scaler.transform(
            [[Temprature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, region]]
        )
        result = ridge_model.predict(new_data)

        return jsonify(prediction=result[0])
    except Exception as e:
        return jsonify(error=str(e)), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0')
