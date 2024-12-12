# EEG-Team-Project
## Project Description
CMPSC445 Team Project to help diagnose patients with Parkinson's using Binary Classification.
The resting state EEG data used for training here was collected as a part of an auditory ERP task whose results can be found at https://www.biorxiv.org/content/10.1101/823674v4
Link to the dataset: osf.io/pehj9  

## Setup
### Assumptions 
1) You have Python and pip correctly installed on your machine.
2) You have an NVIDIA GPU with CUDA version 12.6 or newer
### Steps
1) Download the project zip from GitHub.
2) After unzipping the project folder, you can open it inside your preferred development environment. The instructions here assume you are using VS Code.
3) Create a new Python Virtual Environment (optional but recommended to avoid
4) Run pip install -r requirements.txt
5) Install the dataset from the above-mentioned link and store it in a folder called 'data' in the same directory as the source code
6) From the 'data' folder, move some samples to a new directory called 'fresh data' for testing the model on unseen data
## File Descriptions
### main_v1_5_2.ipynb
This Jupyter Notebook is responsible for training and saving the trained models used in this project. These techniques and models are:
1) A simple neural network 
2) Logistic Regression 
3) Logistic Regression with k-fold cross-validation (20 folds) 
4) Random Forest Classifier 
5) Support Vector Machine (RBF kernel)

The notebook also creates visuals (such as classification reports and confusion matrices) for the training results

### test_models.ipynb
This Jupyter Notebook is responsible for testing all the trained models that were created and saved when running main_v1_5_2.ipynb (except the PyTorch Neural Network).
The notebook also compiles the test results of the trained models on unseen data saved in a 'fresh data' folder. The test results are visualized as plots and heatmaps (confusion matrices)

### model_loading.ipynb
This Jupyter Notebook holds the function that is supposed to go into the backend of the web app. It explicitly teaches how to load and make predictions using a trained ML model.
The processing function shared in this notebook is different than the one found in the above two notebooks. The function generates four plots and saves them as images:
1) Unprocessed EEG channel measurements
2) Unprocessed EEG data PSD
3) Processed EEG channel measurements
4) Processed EEG data PSD

### lr.joblib
Saved trained simple logistic regression model

### lr_cv.joblib
Saved trained logistic regression with 20 folds cross-validation model

### rfc.joblib
Saved trained random forest classifier model

## Notes
1) The SVM model must be created again. It is too large to be uploaded here
2) data folder with two sample files: https://pennstateoffice365-my.sharepoint.com/:f:/r/personal/dar6078_psu_edu/Documents/data?csf=1&web=1&e=cPfzJt
3) fresh data folder with two sample files: https://pennstateoffice365-my.sharepoint.com/:f:/r/personal/dar6078_psu_edu/Documents/fresh%20data?csf=1&web=1&e=EH5JIy
