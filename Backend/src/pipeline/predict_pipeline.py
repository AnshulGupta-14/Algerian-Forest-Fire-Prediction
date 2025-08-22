import sys
import os

import pandas as pd

from src.exception import CustomException
from src.logger import logging
from src.utils import load_object

from huggingface_hub import hf_hub_download

from dotenv import load_dotenv
load_dotenv()

HF_REPO_ID = os.getenv("HF_MODEL_REPO")
HF_MODEL_FILENAME = os.getenv("HF_MODEL_FILENAME")
HF_PREPROCESSOR_FILENAME = os.getenv("HF_PREPROCESSOR_FILENAME")
HF_REVISION = os.getenv("HF_MODEL_REVISION")
HF_TOKEN = os.getenv("HF_TOKEN")

class PredictPipeline:
    def predict(self,features):
        try:
            preprocessor_path = hf_hub_download(
                repo_id=HF_REPO_ID,
                filename=HF_PREPROCESSOR_FILENAME,
                revision=HF_REVISION,
                token=HF_TOKEN,
            )
            model_path = hf_hub_download(
                repo_id=HF_REPO_ID,
                filename=HF_MODEL_FILENAME,
                revision=HF_REVISION,
                token=HF_TOKEN,
            )

            preprocessor = load_object(file_path=preprocessor_path)
            model = load_object(file_path=model_path)

            data_scaled = preprocessor.transform(features)
            pred = model.predict(data_scaled)
            return pred
        except Exception as e:
            raise CustomException(e,sys)

class CustomData:
    def __init__(  self,Temperature: float,RH: int,Ws: float,Rain: float,FFMC: float,DMC: float, DC: float,ISI: float, BUI: float, FWI: float, region: int):
        self.Temperature = Temperature
        self.RH = RH
        self.Ws = Ws
        self.Rain = Rain
        self.FFMC = FFMC
        self.DMC = DMC
        self.DC = DC
        self.ISI = ISI
        self.BUI = BUI
        self.FWI = FWI
        self.region = region

    def get_data_as_data_frame(self):
        try:
            custom_data_input_dict = self.get_data_as_dict()
            return pd.DataFrame([custom_data_input_dict])
        except Exception as e:
            raise CustomException(e,sys) 
        
    def get_data_as_dict(self):
        try:
            return self.__dict__
        except Exception as e:
            raise CustomException(e,sys)