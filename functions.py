#Going to 127.0.0.1:5000/getCandidatesByOffice will return json object with offices that are up
#for election with the candidates that are running for those offices along with to what party
#they belong
from flask import Flask, jsonify, json, current_app
from apiclient.discovery import build
from votesmart import votesmart
import csv, requests, pprint
import xml.etree.ElementTree as ET

API_KEY1 = open("google_api.txt", "r")
service = build('civicinfo', 'v2', developerKey=API_KEY1.readline())

VOTESMART_API_FILE = open("votesmart_api.txt", "r")
VOTESMART_API_KEY = VOTESMART_API_FILE.readline()

app = Flask(__name__)

address = "Brooklyn 2164 Stuart St NY 11229"
request = service.elections().voterInfoQuery(address=address, electionId=2000, returnAllAvailableData=True)
response = request.execute()
requestElections = service.elections().electionQuery()
responseElections = requestElections.execute()

#@app.route('/getElections')
#def getElections():
    #elections = []
    #for election in responseElections.get():
        #elections.append


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

#Currently one way to find candidate ids, more work is needed here
candidate_id = 0
firstName = "Andrew"
lastName = "Cuomo"
state = "NY"
def getCandidateId(firstName, lastName):
    with open('id_matrix.csv', mode='r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if firstName in row:
                if lastName in row:
                    if state in row:
                        #print(row)
                        candidate_id = row[0]  #can have multiples, need to think about it
                        line_count += 1
            line_count += 1
    return candidate_id

candidate_id = getCandidateId(firstName, lastName)

#Going to http://127.0.0.1:5000/getCandidatesInfo/id/<candidateId> will return json about the selected candidate
@app.route('/getCandidatesInfo/id/<candidate_id>', methods=['GET', 'POST'])
def getCandidateInfo(candidate_id):
    with app.app_context():
        r = requests.get("http://api.votesmart.org/CandidateBio.getBio?key={}&candidateId={}".format(VOTESMART_API_KEY, candidate_id))
        root = ET.fromstring(r.content)
        candidate_info = {}
        count = 0
        for child in root.iter('*'):
            if child.tag == 'preferredName':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'lastName':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'birthDate':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'birthPlace':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'parties':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'name':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'title':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'type':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'status':
                candidate_info.update({child.tag :child.text})
            elif child.tag == 'photo':
                candidate_info.update({child.tag :child.text})
        resp2 = jsonify(candidate_information=candidate_info)
        resp2.headers.add('Access-Control-Allow-Origin', '*')
        return resp2

if __name__ == '__main__':
    app.run(port = 5000, debug = True)
