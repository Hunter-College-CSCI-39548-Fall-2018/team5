#Going to 127.0.0.1:5000/getCandidatesByOffice will return json object with offices that are up
#for election with the candidates that are running for those offices along with to what party
#they belong
from flask import Flask, jsonify, json, current_app, request
from apiclient.discovery import build
from state_abbreviations import state_abbr, stateConversion
import csv, requests, pprint
import xml.etree.ElementTree as ET

GOOGLE_API_FILE = open("google_api.txt", "r")
service = build('civicinfo', 'v2', developerKey=GOOGLE_API_FILE.readline())

VOTESMART_API_FILE = open("votesmart_api.txt", "r")
VOTESMART_API_KEY = VOTESMART_API_FILE.readline()

app = Flask(__name__)

#function to get candidates and offices they are running for based on an address
def getCandidatesByOffice(address):
    request = service.elections().voterInfoQuery(address=address, electionId=2000, returnAllAvailableData=True)
    response = request.execute()

    candidate = []
    offices = []
    state_for_id = None  #-- id info if we add this
    fname_for_id = None
    lname_for_id = None

    for elem in response.get('normalizedInput').items():
        if elem[0] == 'state':
            state_for_id = elem[1]
    for office in response.get('contests', []):
        offices.append(office.get('office'))
    for reps in response.get('contests', []):
        for i, office in enumerate(offices):
            if office == reps.get('office') and office is not None:
                for individual in reps.get('candidates'):
                    if individual is not None:
                        name = individual.get('name').split()
                        fname_for_id = name[0]
                        lname_for_id = name[-1]
                        votesmart_id = getIdByLastName(fname_for_id, lname_for_id, state_for_id)
                        candidate.append({
                            'office': office,
                            'name': individual.get('name'),
                            'party': individual.get('party'),
                            'id': votesmart_id
                        })

    resp = jsonify(positions_and_candidates=candidate)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return resp

def getIdByLastName(first_name, last_name, state):
    request_id = requests.get("http://api.votesmart.org/Candidates.getByLastname?key={}&lastName={}".format(VOTESMART_API_KEY, last_name))
    root = ET.fromstring(request_id.content)
    cand_id = 0
    for elem in root.findall('.//candidate'):
        for item in elem.findall(".//firstName"):
            if first_name in item.text:
                cand_id = elem.find(".//candidateId").text
    return cand_id


@app.route('/getCandidatesByOffice', methods=['GET', 'POST'])
def areaSearch():
    if request.method == 'GET':
        address = request.args.get('address', None)
        if address:
            candidates_by_area = getCandidatesByOffice(address)
            return candidates_by_area


#Currently one way to find candidate ids, more work is needed here
def getCandidateId(firstName, lastName, state):
     with open('id_matrix.csv', encoding="utf8") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        candidate_id = 0
        for row in csv_reader:
            if firstName in row:
                if lastName in row:
                    if state in row:
                        candidate_id = row[0]  #can have multiples, need to think about it
                        line_count += 1
            line_count += 1
        return candidate_id


def getCandidateInfo(candidate_id):
    with app.app_context():
        r = requests.get("http://api.votesmart.org/CandidateBio.getBio?key={}&candidateId={}".format(VOTESMART_API_KEY, candidate_id))
        root = ET.fromstring(r.content)
        candidate_info = {}
        for child in root.iter('*'):
            if child.tag == 'preferredName':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'lastName':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'birthDate':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'birthPlace':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'parties':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'name':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'title':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                elif "Project Vote Smart" in child.text:
                    continue
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'type':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'status':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
            elif child.tag == 'photo':
                if child.text == None:
                    candidate_info.update({child.tag :'N/A'})
                else:
                    candidate_info.update({child.tag :child.text})
        resp2 = jsonify(candidate_information=candidate_info)
        resp2.headers.add('Access-Control-Allow-Origin', '*')
        return resp2

#Going to http://127.0.0.1:5000/getCandidatesInfo will return json about the selected candidate
@app.route('/getCandidatesInfo', methods=['GET', 'POST'])
def candidateSearch():
    address = "3039 Ocean Pkwy Brooklyn NY 11235"
    #getCandidatesByOffice(address)
    if request.method == 'GET':
        #candidate_name = request.args.get('name', None)
        candidate_name = 'Alexandria Ocasio-Cortez' #testing purposes
        name = candidate_name.split()
        first_name = name[0].title()
        last_name = name[1].title()
        #candidate_state = request.args.get('state', None)
        candidate_state = 'New York' #testing purposes
        candidate_state = stateConversion(candidate_state)
        id = getCandidateId(first_name, last_name, candidate_state)
        if id != 0:
            candidates_info = getCandidateInfo(id)
            return candidates_info

if __name__ == '__main__':
    app.run(port = 5000, debug = True)
