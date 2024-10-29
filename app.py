import base64
import io
from dash import Dash, html, dcc, callback, Output, Input, State, ctx, dash_table,no_update
import dash_bootstrap_components as dbc
import pandas as pd

external_stylesheets = [dbc.themes.BOOTSTRAP, 'https://codepen.io/chriddyp/pen/bWLwgP.css']

app = Dash(__name__,external_stylesheets=external_stylesheets)

app.layout = [
    html.Div(children=[
            dcc.Upload(id='upload-data', children=html.A("Upload csv"),
                    style={
                        'width': '40%',
                        'height': '60px',
                        'lineHeight': '60px',
                        'borderWidth': '1px',
                        'borderStyle': 'dashed',
                        'borderRadius': '5px',
                        'textAlign': 'center',
                        'margin': '50px auto'  # Centers the element horizontally
                    }),
            dbc.Modal(
                [
                    dbc.ModalHeader("Invalid File Format or unable to load file"),
                    dbc.ModalBody("Please upload a .csv file."),
                    dbc.ModalFooter(dbc.Button("Close", id="close-modal", className="ms-auto")),
                ],
                id="invalid-file-fomat-modal",
                is_open=False,
            ),
            dash_table.DataTable(id="sample-data",
                                style_table={
                                    'overflowX': 'auto',
                                    'width':'80%',
                                    'textAlign': 'center',
                                    'margin': '50px auto'  # Centers the element horizontally
                                },
                                style_cell={
                                # all three widths are needed
                                'minWidth': '80px', 'width': '80px', 'maxWidth': '120px',
                                'overflow': 'hidden',
                                'textOverflow': 'ellipsis',
                                }),
           html.Div([
                dbc.Button(
                    "Calculate Result", id='find-condition-and-probability',
                    style={
                        'margin': 'auto'
                    })], 
                    style={
                        'display': 'flex', 
                        'justify-content': 'center'
                          }),
    ],id='input-data-div'),
    html.Div(id='result'),
    dcc.Store(id='input-data')
]

def __verify_csv(decoded_content_string):
    try:
        df = pd.read_csv(io.StringIO(decoded_content_string.decode('utf-8')))
        return df
    except:
        return None
    

@callback(
    [Output('input-data', 'data'),
     Output('invalid-file-fomat-modal', 'is_open')],
    [Input('upload-data', 'contents'),
     Input("close-modal", "n_clicks")],
    [State('upload-data', 'filename'),
     State('invalid-file-fomat-modal', 'is_open')]
)
def handle_file_upload(contents, close_modal, filename, is_open):
    trigger = ctx.triggered_id
    if (trigger == 'upload-data'):
        if contents is not None:
            # Check if the uploaded file is a CSV
            if filename.endswith('.csv'):
                # Proceed with parsing the file
                content_type, content_string = contents.split(',')
                decoded = base64.b64decode(content_string)
                try:
                    df=__verify_csv(decoded)
                    df_json = df.reset_index().to_json(orient='split')
                    return df_json, False
                except:
                    return no_update, not is_open
            else:
                # Show modal for invalid file type
                return no_update, not is_open
        return None, is_open
    elif trigger == 'close-modal':
        if close_modal:
            return no_update, not is_open
    # Default return when no conditions are met
    return no_update, is_open


@callback(
    Output("sample-data", "data"),
    Input('input-data', 'data')
)
def display_table(input_data):
    if input_data is None:
        return no_update
    # Specify orient='split' to match the format used for input_data
    df = pd.read_json(input_data, orient='split')
    df = df.head()  # Display only the first few rows
    return df.to_dict('records')

def __calculate_result(df):
    return "Condition:"+"Test "+"Probability: "+"Something%"

@callback(
        Output('result','children'),
        Input('find-condition-and-probability','n_clicks'),
        State('input-data', 'data')
    )
def display_result(button_press,df):
    if(button_press):
        #Call NN and get result
        res=__calculate_result(df)
        return html.P(res)
    else:
        return no_update

if __name__ == '__main__':
    app.run(debug=True)
