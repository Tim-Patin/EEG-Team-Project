import pandas as pd
from DataModificationTools import ButterFilter
from DataModificationTools import Normalization
from DataModificationTools import PCAWrapper
class CreateDataframe_Training:
    def __init__(self,folder_path="grasp-and-lift-eeg-detection//train//train//",number_of_subjects=12,number_of_series=8):
        self.number_of_subjects=number_of_subjects
        self.number_of_series=number_of_series
        self.folder_path=folder_path
        self.subjects=[f"subj{i}" for i in range(1,self.number_of_subjects+1)]
        self.series=[f"series{i}" for i in range(1,self.number_of_series+1)]
        self.data_file_names=[]
        self.data_dataframe=pd.DataFrame()
        self.events_file_names=[]
        self.events_dataframe=pd.DataFrame()
        #self.__get_file_names_and_dataframes()

        #Train and test dataframe files
        self.train_data_dataframe=None
        self.train_events_dataframe=None
        self.test_data_dataframe=None
        self.test_events_dataframe=None

        #Data modification tools
        self.butter_filter=ButterFilter()
        self.normalizer=Normalization()
    def get_file_names_and_dataframes(self):
        for subj in self.subjects:
            for series in self.series:
                data_file_name=subj+"_"+series+"_data.csv"
                self.data_file_names.append(data_file_name)
                events_file_name=subj+"_"+series+"_events.csv"
                self.events_file_names.append(events_file_name)

                temp_data_df=pd.read_csv(self.folder_path+data_file_name)
                temp_events_df=pd.read_csv(self.folder_path+events_file_name)
                temp_data_df.drop('id',axis=1,inplace=True)
                temp_events_df.drop('id',axis=1,inplace=True)

                # Pass data through a butter filter
                columns=temp_data_df.columns
                filtered_data=self.butter_filter.butter_bandpass_filter(temp_data_df.values)
                filtered_data_df=pd.DataFrame(filtered_data,columns=columns)
                #Normalize Data
                filtered_data_df[columns]=self.normalizer.scaler.fit_transform(filtered_data_df[columns])
                
                self.data_dataframe=pd.concat([self.data_dataframe,filtered_data_df])
                self.events_dataframe=pd.concat([self.events_dataframe,temp_events_df])

    def split_train_test_set(self,training_set_percentage=0.8):
        split_index = int(len(self.data_dataframe) * training_set_percentage)
        self.train_data_dataframe = self.data_dataframe.iloc[:split_index]
        self.test_data_dataframe=self.data_dataframe.iloc[split_index:]

        self.train_events_dataframe=self.events_dataframe.iloc[:split_index]
        self.test_events_dataframe=self.events_dataframe.iloc[split_index:]


obj=CreateDataframe_Training()
# obj.get_file_names_and_dataframes()
# print(obj.data_dataframe.head())
# obj.data_dataframe.to_csv("CombinedData.csv")
# obj.events_dataframe.to_csv("CombinedEvents.csv")
obj.data_dataframe=pd.read_csv("CombinedData.csv")
#obj.events_dataframe=pd.read_csv("CombinedEvents.csv")
# from sklearn.model_selection import train_test_split
# full_data=pd.concat([obj.data_dataframe,obj.events_dataframe],axis=1)
# train_data, test_data = train_test_split(full_data, test_size=0.2, random_state=42)

#Apply PCA on CombinedData.csv
pca_wrapper=PCAWrapper()
data_pca_df=pca_wrapper.transform(obj.data_dataframe)
data_pca_df.to_csv("CombinedDataPCA.csv")
# obj.split_train_test_set()
# obj.train_data_dataframe.to_csv("TrainingData.csv")
# obj.train_events_dataframe.to_csv("TrainingEvents.csv")
# obj.test_data_dataframe.to_csv("TestData.csv")
# obj.test_events_dataframe.to_csv("TestEvents.csv")