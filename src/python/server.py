# import Flask
import os
import tempfile

import ml
from flask import Flask, send_from_directory, json, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(os.path.realpath(__file__))
results_path = os.path.join(current_dir, 'results')

@app.route('/ping', methods=["GET"])
def ping():
    return json.dumps({"ping":"test"})


@app.route('/upload', methods=["POST"])
@cross_origin()
def handle_upload():
    file = next(iter(request.files.values()), None)
    if file is None:
        return jsonify({'error': 'No selected file'}), 418 # I am a teapot

    temp_dir = tempfile.mkdtemp()
    temp_file_path = os.path.join(temp_dir, file.filename)
    file.save(temp_file_path)

    try:
        prediction, accuracy = ml.predict(temp_file_path)
        return jsonify({"prediction": prediction, "accuracy": accuracy})
    except Exception as e:
        return jsonify({'error': str(e)+" cwd: "+os.getcwd()}), 418
    finally:
        os.remove(temp_file_path)
        os.rmdir(temp_dir)


# Send UnprocessedRaw.png
@app.route('/UnprocessedRaw', methods=["GET"])
@cross_origin()
def unprocessed_raw():
    # return contents of main.ts
    return send_from_directory(results_path, 'UnprocessedRaw.png', mimetype='image/png')

# Send UnprocessedRawPSD.png
@app.route('/UnprocessedRawPSD', methods=["GET"])
@cross_origin()
def unprocessed_raw_psd():
    # return contents of main.ts
    return send_from_directory(results_path,'UnprocessedRawPSD.png', mimetype='image/png')

# Send UnprocessedRaw.png
@app.route('/ProcessedRaw', methods=["GET"])
@cross_origin()
def processed_raw():
    # return contents of main.ts
    return send_from_directory(results_path, 'ProcessedRaw.png', mimetype='image/png')

# Send UnprocessedRaw.png
@app.route('/ProcessedRawPSD', methods=["GET"])
@cross_origin()
def processed_raw_psd():
    # return contents of main.ts
    return send_from_directory(results_path, 'ProcessedRawPSD.png', mimetype='image/png')

# Run the server
if __name__ == '__main__':

    # start the server
    app.run(port=8000, debug=True)