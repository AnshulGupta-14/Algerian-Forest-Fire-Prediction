import os
import sys
from dataclasses import dataclass

import numpy as np

from catboost import CatBoostClassifier
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

from src.exception import CustomException
from src.logger import logging
from src.utils import save_object, select_best_model

@dataclass
class ModelTrainerConfig:
    trained_model_file_path = os.path.join('artifacts', 'model.pkl')

class ModelTrainer:
    def __init__(self):
        self.model_trainer_config = ModelTrainerConfig()

    def initiate_model_trainer(self, train_array, test_array):
        try:
            logging.info('Spliting training and test input data')
            X_train, y_train, X_test, y_test = (
                train_array[:, :-1],
                train_array[:, -1],
                test_array[:, :-1],
                test_array[:, -1]
            )

            logging.info('Model Training Initiated')

            models = [
                ('Linear Regression', LogisticRegression(), {}),
                ('KNN', KNeighborsClassifier(), {
                    'n_neighbors':[5,7,9,11,13,15],
                    'weights':['uniform', 'distance'],
                    'metric':['euclidean', 'manhattan', 'minkowski'],
                    'algorithm': ['auto', 'ball_tree', 'kd_tree', 'brute']
                }),
                ('Decision Tree', DecisionTreeClassifier(),  {
                    'criterion': ['gini', 'entropy', 'log_loss'],
                    'splitter': ['best', 'random'],
                    'max_depth': np.arange(1, 20),
                    'max_features': ['sqrt', 'log2'],
                    'min_samples_split': np.arange(2, 20)
                }),
                ('Random Forest', RandomForestClassifier(), {
                    'n_estimators' : [100, 300, 500],
                    'max_features' : ['sqrt', 'log2'],
                    'max_depth' : [4, 5, 6, 7, 8,10,15,20],
                    'criterion' : ['gini', 'entropy'],
                    'min_samples_split' : [2, 8, 15, 20]
                }),
                ('AdaBoost', AdaBoostClassifier(), {
                    'n_estimators' : [50, 100, 300, 500],
                    'learning_rate' : [0.1, 0.5, 1.0],
                }),
                ('SVC', SVC(), {
                    'C': [0.1, 1, 10, 100, 1000], 
                    'gamma': [1, 0.1, 0.01, 0.001, 0.0001], 
                    'kernel': ['linear', 'poly', 'rbf', 'sigmoid']
                }),
                ('CatBoost', CatBoostClassifier(verbose=0), {
                    'iterations': [50, 100, 300, 500],
                    'learning_rate': [0.1, 0.5, 1.0],
                    'depth': [4, 6, 8, 10],
                    'l2_leaf_reg': [1, 3, 5, 7, 9]
                }),
                ('XGBoost', XGBClassifier(), {
                    'n_estimators' : [50, 100, 300, 500],
                    'learning_rate' : [0.1, 0.5, 1.0],
                    'max_depth' : [4, 6, 8, 10],
                    'gamma' : [0, 0.1, 0.5, 1.0],
                    'min_child_weight' : [1, 3, 5, 7],
                }),
            ]

            best_model, best_model_score, best_model_params = select_best_model(X_train=X_train, y_train=y_train, X_test=X_test, y_test=y_test, models = models)

            logging.info(f"Best model found: {best_model} with accuracy: {best_model_score}")

            if best_model_score < 0.6:
                raise CustomException("No best model found")
            
            best_model.set_params(**best_model_params)
            best_model.fit(X_train, y_train)
            
            logging.info("Best model found for both train and test data")

            save_object(
                file_path=self.model_trainer_config.trained_model_file_path,
                obj=best_model
            )

            predicted = best_model.predict(X_test)
            accuracy = accuracy_score(y_test, predicted)
            return accuracy

        except Exception as e:
            raise CustomException(e, sys)