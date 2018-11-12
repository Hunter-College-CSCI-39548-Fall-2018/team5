'''
Going to 127.0.0.1:5000/getCandidatesByOffice will return json object with
offices that are up for election with the candidates that are running for
those offices along with to what party they belong
'''
from flask import Flask, jsonify, json
from apiclient.discovery import build

API_KEY = open("api.txt", "r")
service = build('civicinfo', 'v2', developerKey=API_KEY.readline())
app = Flask(__name__)

address = "Brooklyn 3039 Ocean Pkwy NY 11235"
request = service.elections().voterInfoQuery(
    address=address,
    electionId=2000,
    returnAllAvailableData=True)
response = request.execute()


@app.route('/getCandidatesByOffice', methods=['GET', 'POST'])
def getCandidatesByOffice():
    '''
    encapsulate this request to GoogleCivic for each request made to
    this endpoint

    address = "Brooklyn 3039 Ocean Pkwy NY 11235"
    request = service.elections().voterInfoQuery(
        address=address,
        electionId=2000,
        returnAllAvailableData=True)
    response = request.execute()
    '''

    candidate = []
    offices = []
    for office in response.get('contests', []):
        offices.append(office.get('office'))
    for reps in response.get('contests', []):
        for i, office in enumerate(offices):
            if office == reps.get('office') and office is not None:
                for individual in reps.get('candidates'):
                    if individual is not None:
                        individual_info = []
                        individual_info.append(office)
                        individual_info.append(individual.get('name'))
                        individual_info.append(individual.get('party'))
                        candidate.append({i: individual_info})
    # jsonStr = json.dumps(candidate)

    # I need these because I'm working on different ports with ReactJs
    # jsonify candidates directly to make the frontend response neater
    resp = jsonify(positions_and_candidates=candidate)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


if __name__ == '__main__':
    app.run(port=5000, debug=True)
