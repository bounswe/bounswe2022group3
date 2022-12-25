## Semantic Search Server
This is a pretrained NLP model, based on [SBERT](https://www.sbert.net/docs/pretrained_models.html#sentence-embedding-models/). Model used is `multi-qa-mpnet-base-cos-v1`.

This server basically serves the functionality of the pretrained model. 
It takes `search_text` and `search_list` fields in its `POST /relevance` endpoint.
As the result, it returns the relevance of the items given in `search_list` with `search_text`.

## How to run
`docker build -t sem:latest .`
`docker run --name sem -p 9060:9060 sem`
