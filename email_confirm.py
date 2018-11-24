from flask import Flask, request, url_for
from flask_mail import Mail, Message
from flaskext.mysql import MySQL
import time
from validate_email import validate_email
app = Flask(__name__)
app.config.from_pyfile('config.cfg')

mail = Mail(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return '<form action="/" method="POST"><input name="email"><input type="submit"></form>'

    email = request.form['email']
    msg = Message('Confirm Email', sender='test11aatest@gmail.com', recipients=[email])
    ts = time.time()
    link = url_for('confirm_email', ts=ts, email=email, _external=True)

    msg.body = 'Your link is {}'.format(link)
    if(validate_email(email)):
        mail.send(msg)
        return '<h1>Please cofirm your e-mail{}.</h1>'.format(email)
    else:
        return 'Invalid E-mail' 
    

@app.route('/confirm_email/<ts>/<email>')
def confirm_email(ts,email):
    return '<h1>E-mail has Confirmed: {}</h1>'.format(email)

if __name__ == '__main__':
    app.run(debug=True)
