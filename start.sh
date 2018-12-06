#!/bin/bash
sudo apt-get install python3.6
sudo apt-get pip install flask
sudo python3 pip install --upgrade google-api-python-client
sudo python3 pip install apiclient
sudo python3 -m pip install BeautifulSoup4
sudo apt-get install python3.6-dev libmysqlclient-dev
sudo -H pip3 install mysqlclient
sudo python3 -m pip install flask_mail
sudo python3 -m pip install validate_email

export FLASK_APP=functions.py
flask run


