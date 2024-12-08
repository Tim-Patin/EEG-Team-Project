import os

import mne
import numpy as np
import joblib
import matplotlib
TARGET_SAMPLING_RATE=250
window_size= 2500
overlap = 0.5 #50% overlap
current_dir = os.path.dirname(os.path.realpath(__file__))
lr_cv_path = os.path.join(current_dir, 'lr_cv.joblib')
scaler_path = os.path.join(current_dir, 'scaler.gz')
results_path = os.path.join(current_dir, 'results')

matplotlib.use('agg') # Ensure matplotlib is set to only write files, and cannot render any by itself

os.environ['MNE_USE_CUDA'] = 'true'
mne.utils.set_config('MNE_USE_CUDA', 'true')
mne.cuda.init_cuda(ignore_config=True)

'''
Similar to the logic inside the for-loop used for creating the dataset from all the .set files
'''
def process_single_file(file_path, window_size=2500):
    #Preprocessing steps
    raw = mne.io.read_raw_eeglab(file_path, preload=True)

    unprocessed_raw=raw.plot()
    unprocessed_raw.savefig(os.path.join(results_path, 'UnprocessedRaw.png'))

    unprocessed_raw_psd=raw.compute_psd().plot(average=True, picks="data", exclude="bads", amplitude=False)
    unprocessed_raw_psd.savefig(os.path.join(results_path, 'UnprocessedRawPSD.png'))

    raw.set_eeg_reference('average', projection=True)
    raw.resample(TARGET_SAMPLING_RATE, npad="auto")
    raw.filter(1., 30., fir_design='firwin', n_jobs='cuda')
    ica = mne.preprocessing.ICA(n_components=15, random_state=22, max_iter=1000, method='picard')
    ica.fit(raw)
    raw = ica.apply(raw)

    processed_raw=raw.plot()
    processed_raw.savefig(os.path.join(results_path, 'ProcessedRaw.png'))
    processed_raw_psd=raw.compute_psd().plot(average=True, picks="data", exclude="bads", amplitude=False)
    processed_raw_psd.savefig(os.path.join(results_path, 'ProcessedRawPSD.png'))

    data = raw.get_data().T

    #Make multiple windows
    windows = []
    stride = window_size // 2  #50% overlap
    for start in range(0, data.shape[0] - window_size + 1, stride):
        window = data[start:start + window_size, :]
        windows.append(window)

    return np.stack(windows)

#Predict a result for the input file
def predict_file(file_path, model, scaler, window_size=2500):
    windows = process_single_file(file_path, window_size)
    X = windows.reshape(windows.shape[0], -1)
    X_scaled = scaler.transform(X)

    #Predictions for all windows
    predictions = model.predict(X_scaled)
    probabilities = model.predict_proba(X_scaled)

    #Majority voting
    final_prediction = np.bincount(predictions).argmax()
    final_probability = np.mean(probabilities, axis=0)
    return final_prediction, final_probability

def predict(file_path):
    lr_model = joblib.load(lr_cv_path)
    scaler=joblib.load(scaler_path)
    prediction, probability = predict_file(file_path, lr_model, scaler, window_size=window_size)
    prediction_label="Parkinson's" if prediction == 1 else "Non-Parkinson's"
    return prediction_label, max(probability)*100