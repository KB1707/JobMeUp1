from flask import Flask, request,jsonify,render_template, redirect,session, url_for
import razorpay
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import numpy as np
import pickle
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
app.secret_key = 'jobmeup'

client = razorpay.Client(auth=("rzp_test_Hw4sQn2Wrbsw8u", "FzZKveveEpe47blpGKe9Ssgq"))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    number = db.Column(db.String(100), unique=True)
    dob=db.Column(db.Date(),unique=False)
    payment = db.Column(db.Boolean, default=False)

    def __init__(self, name,email,password,number,dob,payment):
        self.name = name
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        self.number = number
        self.dob = dob
        self.payment = payment
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
with app.app_context():
     db.create_all()

@app.route('/signin')
def index():
    return render_template('signup.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Handle request
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        number = request.form['number']
        dob_str = request.form['dob']
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
        payment = request.form.get('payment', False)

        new_user = User(name=name, email=email, password=password, number=number, dob=dob,payment=payment)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/login')

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            session['email'] = user.email
            return redirect('/2')
        else:
            return render_template('login.html', error='Invalid user')

    return render_template('login.html')

@app.route("/")
def landing_page():
    return render_template('landing-page1.html')

@app.route("/2")
def landing_page2():
    return render_template('landing-page2.html')

@app.route("/3")
def landing_page3():
    return render_template('landing-page3.html')


@app.route("/resume")
def resume_builder():
    return render_template('resume.html')


@app.route("/videocall")
def web_rtc():
    return render_template('webrtc.html')

@app.route("/quiz")
def quiz():
    return render_template('quiz2.html')


@app.route('/logout')
def logout():
    session.pop('login_email',None)
    return redirect('/login')


model = pickle.load(open('model.pkl', 'rb'))


@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    int_features = [float(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0], 9)

    if output==0:
        return render_template('health_care.html')
    elif output==1:
         return render_template('Science.html')
    elif output==2:
         return render_template('Engineering.html')
    elif output==3:
         return render_template('Design.html')
    elif output==4:
         return render_template('Education.html')
    elif output==5:
         return render_template('Business.html')
    elif output==6:
         return render_template('law.html')
    elif output==7:
         return render_template('Media.html')
    else:
        return render_template('webrtc.html')



@app.route('/payment_form')
def payment_form():
    return render_template('form.html')

@app.route('/pay', methods=["GET", "POST"])
def pay():
    emaill=request.form.get("emaill")
    session['emaill'] = emaill
    if request.form.get("amount") != "":
        amount=request.form.get("amt")
        data = { "amount": amount, "currency": "INR", "receipt": "order_rcptid_11" }
        payment = client.order.create(data=data)
        pdata=[amount, payment["id"]]

        return render_template("payment.html", pdata=pdata)
    return redirect("/2")

@app.route('/success', methods=["POST"])
def success():
    emaill = session.get('emaill') 
    pid=request.form.get("razorpay_payment_id")
    ordid=request.form.get("razorpay_order_id")
    sign=request.form.get("razorpay_signature")
    print(f"The payment id : {pid}, order id : {ordid} and signature : {sign}")
    params={
    'razorpay_order_id': ordid,
    'razorpay_payment_id': pid,
    'razorpay_signature': sign
    }
    final=client.utility.verify_payment_signature(params)
    if final == True:
        finalans = User.query.filter_by(email=emaill).first()
        if finalans:
            finalans.payment = True  # Set payment column to True
            db.session.commit()  # Commit the changes to the database
        return redirect("/3", code=301)
    return "Something Went Wrong Please Try Again"




app.run(debug=True)

