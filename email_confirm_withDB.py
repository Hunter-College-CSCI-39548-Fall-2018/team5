from flask import Flask, request, url_for, logging, session, render_template, redirect
from flask_mail import Mail, Message
from flaskext.mysql import MySQL
from validate_email import validate_email
from functools import wraps
import time
app = Flask(__name__)
app.config.from_pyfile('config.cfg')
mail = Mail(app)
mysql = MySQL(app)
app.secret_key = "super secret key"

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    if request.method =='POST':
        email = request.form['email']
        if(validate_email(email)):
            con = mysql.get_db()
            c = con.cursor()
            c.execute('''Create TABLE IF NOT EXISTS acc(ID int Primary key auto_increment, email varchar(32), confirm Boolean)''')
            c.execute('SELECT count(*) from acc where email = %s group by email',(email))
            auth = c.rowcount
            if(auth == 0):
               c.execute('insert into acc(email, confirm) values(%s, false)', (email))
               con.commit()
               c.close()
               msg = Message('Confirm Email', sender='test11aatest@gmail.com', recipients=[email])
               ts = time.time()
               link = url_for('confirm_email', ts=ts, email=email, _external=True)
               msg.body = 'Your link is {}'.format(link)
               mail.send(msg)
               return '<h1>Please cofirm your e-mail{}.</h1>'.format(auth)
            else:
                return '<h1>e-mail exist: {}</h1>'.format(auth)
        else:
            return 'Invalid E-mail' 

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    if request.method == 'POST':
        email = request.form['email']
        con = mysql.get_db()
        c = con.cursor()
        c.execute('SELECT count(*) from acc where email = %s and confirm = 1 group by email',(email))
        auth = c.rowcount
        if(auth == 1):
            session['logged_in'] = True
            session['username'] = email
            return redirect(url_for('homepage'))
        c.execute('SELECT count(*) from acc where email = %s and confirm = 0 group by email',(email))
        auth = c.rowcount
        if(auth == 1):
            return '<h1>Please confirm you email'

        c.execute('SELECT count(*) from acc where email = %s group by email',(email))
        auth = c.rowcount
        if(auth == 0):
            return '<h1>Email dont exist'

def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            print('Unauthorized, Please login')
            return redirect(url_for('login'))
    return wrap

@app.route('/homepage')
@is_logged_in
def homepage():
    return render_template('home.html')

@app.route('/logout')
def logout():
    session.clear()               
    return redirect(url_for('login'))



@app.route('/confirm_email/<ts>/<email>')
def confirm_email(ts,email):
    con = mysql.get_db()
    c = con.cursor()
    c.execute('UPDATE acc SET confirm = true WHERE email = %s',(email))
    con.commit()
    c.close()
    return '<h1>E-mail has Confirmed: {}</h1>'.format(email)

if __name__ == '__main__':
    app.run(debug=True)
