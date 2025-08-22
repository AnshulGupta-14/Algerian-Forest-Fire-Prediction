import os
import sys

from flask import Flask, request, jsonify, render_template

from src.logger import logging
from src.pipeline.predict_pipeline import CustomData, PredictPipeline
from src.exception import CustomException

from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
app.logger.setLevel(logging.INFO)


@app.route('/', methods=['GET','POST'])
def predict_datapoint():
    if request.method == 'GET':
        return jsonify('Welcome to Algerian Forest Fires Prediction')
    else :
        try:
            form_data = request.get_json()
            
            data = CustomData(
                Temperature = float(form_data['Temperature']),
                RH = float(form_data['RH']),
                Ws = float(form_data['Ws']),
                Rain = float(form_data['Rain']),
                FFMC = float(form_data['FFMC']),
                DMC = float(form_data['DMC']),
                DC = float(form_data['DC']),
                BUI = float(form_data['BUI']),
                ISI = float(form_data['ISI']),
                FWI = float(form_data['FWI']),
                region = float(form_data['region']),
            )

            pred_df = data.get_data_as_data_frame()
            predict_pipeline = PredictPipeline()
            result = predict_pipeline.predict(pred_df)
            return jsonify(prediction = result[0])
        except Exception as e:
            raise CustomException(e, sys)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
