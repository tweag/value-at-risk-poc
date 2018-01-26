import os

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_graphql import GraphQLView

from create_securities import SECURITIES
from schema import schema


app = Flask(__name__, static_url_path="", static_folder="assets/dist/")
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
)

@app.route('/json')
def json():
    return jsonify(SECURITIES)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
