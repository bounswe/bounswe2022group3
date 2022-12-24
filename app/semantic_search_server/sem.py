from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('multi-qa-mpnet-base-cos-v1')
#    inp_question = input()

#    query_embedding = model.encode(inp_question)
passage_embedding = model.encode(['We can learn machine learning here. This way, we will be equipped with knowledge.','we can learn knitting together. This way, you can have fun :)' ,'he likes climbing to the top of the mountain through the rocks', 'teaSDaw adas dasd asd as d', 'asdasd asd asd asd asd ', 'asdasdasdasdasd'
                                  'London is known for its finacial district', 'do you want to learn how to play music? With guitar, lets learn! Together, we will learn how to play guitar'])

#    print(util.dot_score(query_embedding, passage_embedding))

from http.server import BaseHTTPRequestHandler, HTTPServer
import time
from urllib.parse import urlparse, parse_qs

hostName = "localhost"
serverPort = 9060

class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        inp_question = "hobby"
        query_embedding = model.encode(inp_question)
        print(util.dot_score(query_embedding, passage_embedding))
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))

    def do_POST(self):
        print(123, self.headers)
        inp_question = "hobby"
        query_embedding = model.encode(inp_question)
        res_array = util.dot_score(query_embedding, passage_embedding)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write("{}\n".format(res_array).encode('utf-8'))
        length = int(self.headers.get('content-length'))
        field_data = self.rfile.read(length)
        print(type(res_array))
        print(parse_qs(str(field_data, "UTF-8")))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), Server)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")


