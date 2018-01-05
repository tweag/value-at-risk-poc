import os

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from create_securities import SECURITIES
from schema import schema

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/graphql', methods=['POST'])
def graphql():
    query = request.form['query']
    res = schema.execute(query)
    return jsonify(res.data)


@app.route('/json')
def json():
    return jsonify(SECURITIES)


if __name__ == '__main__':
    app.run(debug=True)
