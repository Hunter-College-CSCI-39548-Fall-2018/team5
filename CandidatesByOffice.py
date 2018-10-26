#Going to 127.0.0.1:5000/getCandidatesByOffice will return json object with offices that are up
#for election with the candidates that are running for those offices along with to what party
#they belong
from flask import Flask, jsonify, json
from apiclient.discovery import build

API_KEY = open("api.txt", "r")
service = build('civicinfo', 'v2', developerKey=API_KEY.readline())
app = Flask(__name__)

address = "Brooklyn 3039 Ocean Pkwy NY 11235"
request = service.elections().voterInfoQuery(address=address, returnAllAvailableData=True)
response = request.execute()

@app.route('/getCandidatesByOffice')
def getCandidatesByOffice():
    candidate = []
    offices = []
    for office in response.get('contests',[]):
        offices.append(office.get('office'))
    for reps in response.get('contests',[]):
        for office in offices:
            if office == reps.get('office'):
                for individual in reps.get('candidates'):
                    individual_info = []
                    individual_info.append(individual.get('name'))
                    individual_info.append(individual.get('party'))
                    candidate.append({office : individual_info })
    jsonStr = json.dumps(candidate)
    return jsonify (positions_and_candidates = jsonStr)

if __name__ == '__main__':
    app.run(port = 5000, debug = True)
