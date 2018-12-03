from flask import Flask, request, url_for, jsonify, Response
from bs4 import BeautifulSoup
import requests
import re
import json
app = Flask(__name__)

@app.route('/<name>', methods=['GET', 'POST'])
def index(name):
    url = "https://www.google.com/search?q=" + name + "&source=lnms&tbm=nws"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    topic = []

    for item in soup.select(".r a"):
        start = "/url?q="
        end = "&sa=U&ved="
        href = item.get('href')
        url = href[href.find(start)+len(start):href.rfind(end)]
        topic.append({'topic': item.text, 'url': url})
        
    #two return formate
    return Response(json.dumps(topic))
    #return jsonify(results = topic)

if __name__ == '__main__':
    app.run(debug=True)
