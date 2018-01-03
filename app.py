from flask import Flask, jsonify, request, render_template
from schema import schema

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/graphql', methods=['POST'])
def graphql():
    query = request.form['query']
    res = schema.execute(query)
    return jsonify(res.data)

if __name__ == '__main__':
    app.run(debug=True)
