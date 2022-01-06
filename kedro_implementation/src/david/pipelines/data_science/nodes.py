import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from kedro.extras.datasets.text import TextDataSet

# TODO: add doc strings throughout
def feature_selection(
    train: pd.DataFrame,
):
    train = train.to_json()

    return train