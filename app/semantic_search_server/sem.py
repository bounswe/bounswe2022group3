from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('multi-qa-mpnet-base-cos-v1')

from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/relevance', methods = ['POST'])
def relevance():
    try:
        json = request.get_json()
        search_text = json['search_text']
        search_list = json['search_list']

        query_embedding = model.encode(search_text)
        search_list_embedding = model.encode(search_list)
        res_search_list = util.dot_score(query_embedding, search_list_embedding)

        return jsonify(
            relevances = res_search_list[0].tolist()
        )
    except Exception as e:
        return jsonify(
            message: e
        ), 400

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=9060)
