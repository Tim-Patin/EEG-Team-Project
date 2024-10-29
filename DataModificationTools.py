from scipy.signal import butter, sosfilt, sosfreqz
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
import pandas as pd
class ButterFilter:
    def __init__(self,lowcut=0.1,highcut=30,fs=500,order=9):
        self.lowcut = lowcut
        self.highcut = highcut # Excluding Gamma. Else 100
        self.fs = fs #Sampling rate (in Hz)
        self.order=order
    def __butter_bandpass(self):
        nyq = 0.5 * self.fs
        low = self.lowcut / nyq
        high = self.highcut / nyq
        sos = butter(self.order, [low, high], analog=False, btype='band', output='sos')
        return sos

    def butter_bandpass_filter(self,data):
        sos = self.__butter_bandpass()
        y = sosfilt(sos, data)
        return y
    
class Normalization:
    def __init__(self,feature_range=(-2.5,2.5)):
        self.feature_range=feature_range
        self.scaler = MinMaxScaler(feature_range=self.feature_range)
    def transform(self,data_df):
        return self.scaler.fit_transform(data_df)

class PCAWrapper:
    def __init__(self,features=16):
        self.n_components=features
        self.pca_obj=PCA(n_components=self.n_components)
    def transform(self,data_df):
        pca_data=self.pca_obj.fit_transform(data_df)
        return pd.DataFrame(data=pca_data)