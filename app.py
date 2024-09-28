from flask import Flask, request,jsonify,render_template, redirect,session, url_for
import razorpay
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import numpy as np
import pickle
from datetime import datetime
from mailjet_rest import Client
import requests
import sqlite3



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

#   careers

@app.route("/careers")
def careers():
    return render_template('main-sunburst.html')

@app.route('/nurse')
def nurse():
    return render_template('nurse.html')

@app.route('/physician')
def physician():
    return render_template('physician.html')

@app.route('/pharmacist')
def pharmacist():
    return render_template('pharmacist.html')

@app.route('/pediatric-nurse')
def pediatric_nurse():
    return render_template('pediatric-nurse.html')

@app.route('/dental-hygienist')
def dental_hygienist():
    return render_template('dental-hygienist.html')

@app.route('/radiologic-technologist')
def radiologic_technologist():
    return render_template('radiologic-technologist.html')

@app.route('/chiropractor')
def chiropractor():
    return render_template('chiropractor.html')

@app.route('/pediatrician')
def pediatrician():
    return render_template('pediatrician.html')

@app.route('/speech-therapist')
def speech_therapist():
    return render_template('speech-therapist.html')

@app.route('/occupational-therapist')
def occupational_therapist():
    return render_template('occupational-therapist.html')

@app.route('/rehabilitation-counselor')
def rehabilitation_counselor():
    return render_template('rehabilitation-counselor.html')

@app.route('/physical-therapist')
def physical_therapist():
    return render_template('physical-therapist.html')


@app.route('/research-scientist')
def research_scientist():
    return render_template('research-scientist.html')

@app.route('/biologist')
def biologist():
    return render_template('biologist.html')

@app.route('/environmental-scientist')
def environmental_scientist():
    return render_template('environmental-scientist.html')

@app.route('/astronomer')
def astronomer():
    return render_template('astronomer.html')

@app.route('/zoologist')
def zoologist():
    return render_template('zoologist.html')

@app.route('/wildlife-biologist')
def wildlife_biologist():
    return render_template('wildlife-biologist.html')

@app.route('/marine-biologist')
def marine_biologist():
    return render_template('marine-biologist.html')

@app.route('/forensic-scientist')
def forensic_scientist():
    return render_template('forensic-scientist.html')

@app.route('/biotechnologist')
def biotechnologist():
    return render_template('biotechnologist.html')

@app.route('/biomedical-researcher')
def biomedical_researcher():
    return render_template('biomedical-researcher.html')

@app.route('/forensic-psychologist')
def forensic_psychologist():
    return render_template('forensic-psychologist.html')

@app.route('/genetic-counselor')
def genetic_counselor():
    return render_template('genetic-counselor.html')

@app.route('/geologist')
def geologist():
    return render_template('geologist.html')



@app.route('/software-developer')
def software_developer():
    return render_template('software-developer.html')

@app.route('/it-support-specialist')
def it_support_specialist():
    return render_template('it-support-specialist.html')

@app.route('/biomedical-engineer')
def biomedical_engineer():
    return render_template('biomedical-engineer.html')

@app.route('/data-analyst')
def data_analyst():
    return render_template('data-analyst.html')

@app.route('/software-quality-assurance-tester')
def software_quality_assurance_tester():
    return render_template('software-quality-assurance-tester.html')

@app.route('/industrial-engineer')
def industrial_engineer():
    return render_template('industrial-engineer.html')

@app.route('/mechanical-engineer')
def mechanical_engineer():
    return render_template('mechanical-engineer.html')

@app.route('/aerospace-engineer')
def aerospace_engineer():
    return render_template('aerospace-engineer.html')

@app.route('/database-administrator')
def database_administrator():
    return render_template('database-administrator.html')

@app.route('/electrical-engineer')
def electrical_engineer():
    return render_template('electrical-engineer.html')

@app.route('/civil-engineer')
def civil_engineer():
    return render_template('civil-engineer.html')

@app.route('/robotics-engineer')
def robotics_engineer():
    return render_template('robotics-engineer.html')

@app.route('/electronics-design-engineer')
def electronics_design_engineer():
    return render_template('electronics-design-engineer.html')

@app.route('/web-developer')
def web_developer():
    return render_template('web-developer.html')

@app.route('/game-developer')
def game_developer():
    return render_template('game-developer.html')



@app.route('/graphic-designer')
def graphic_designer():
    return render_template('graphic-designer.html')

@app.route('/architect')
def architect():
    return render_template('architect.html')

@app.route('/artist')
def artist():
    return render_template('artist.html')

@app.route('/fashion-designer')
def fashion_designer():
    return render_template('fashion-designer.html')

@app.route('/interior-designer')
def interior_designer():
    return render_template('interior-designer.html')

@app.route('/event-photographer')
def event_photographer():
    return render_template('event-photographer.html')

@app.route('/mechanical-designer')
def mechanical_designer():
    return render_template('mechanical-designer.html')

@app.route('/fashion-stylist')
def fashion_stylist():
    return render_template('fashion-stylist.html')


@app.route("/teacher")
def teacher():
    return render_template('teacher.html')

@app.route('/elementary-school-teacher')
def elementary_school_teacher():
    return render_template('elementary-school-teacher.html')

@app.route('/speech-pathologist')
def speech_pathologist():
    return render_template('speech-pathologist.html')

@app.route('/education')
def education():
    return render_template('education.html')




@app.route('/accountant')
def accountant():
    return render_template('accountant.html')

@app.route('/salesperson')
def salesperson():
    return render_template('salesperson.html')

@app.route('/marketing-manager')
def marketing_manager():
    return render_template('marketing-manager.html')

@app.route('/human-resources-manager')
def human_resources_manager():
    return render_template('human-resources-manager.html')

@app.route('/financial-analyst')
def financial_analyst():
    return render_template('financial-analyst.html')

@app.route('/financial-planner')
def financial_planner():
    return render_template('financial-planner.html')

@app.route('/hr-recruiter')
def hr_recruiter():
    return render_template('hr-recruiter.html')

@app.route('/market-research-analyst')
def market_research_analyst():
    return render_template('market-research-analyst.html')

@app.route('/financial-auditor')
def financial_auditor():
    return render_template('financial-auditor.html')

@app.route('/financial-advisor')
def financial_advisor():
    return render_template('financial-advisor.html')

@app.route('/investment-banker')
def investment_banker():
    return render_template('investment-banker.html')

@app.route('/tax-accountant')
def tax_accountant():
    return render_template('tax-accountant.html')

@app.route('/quality-control-inspector')
def quality_control_inspector():
    return render_template('quality-control-inspector.html')

@app.route('/product-manager')
def product_manager():
    return render_template('product-manager.html')

@app.route('/market-researcher')
def market_researcher():
    return render_template('market-researcher.html')

@app.route('/insurance-underwriter')
def insurance_underwriter():
    return render_template('insurance-underwriter.html')

@app.route('/tax-collector')
def tax_collector():
    return render_template('tax-collector.html')

@app.route('/administrative-officer')
def administrative_officer():
    return render_template('administrative-officer.html')



@app.route('/lawyer')
def lawyer():
    return render_template('lawyer.html')

@app.route('/police-detective')
def police_detective():
    return render_template('police-detective.html')

@app.route('/marriage-counselor')
def marriage_counselor():
    return render_template('marriage-counselor.html')

@app.route('/human-rights-lawyer')
def human_rights_lawyer():
    return render_template('human-rights-lawyer.html')

@app.route('/police-officer')
def police_officer():
    return render_template('police-officer.html')

@app.route('/diplomat')
def diplomat():
    return render_template('diplomat.html')

@app.route('/foreign-service-officer')
def foreign_service_officer():
    return render_template('foreign-service-officer.html')

@app.route('/customs-and-border-protection-officer')
def customs_and_border_protection_officer():
    return render_template('customs-and-border-protection-officer.html')




@app.route('/chef')
def chef():
    return render_template('chef.html')

@app.route('/event-planner')
def event_planner():
    return render_template('event-planner.html')

@app.route('/real-estate-agent.html')
def real_estate_agent():
    return render_template('real-estate-agent.html')

@app.route('/musician')
def musician():
    return render_template('musician.html')

@app.route('/air-traffic-controller')
def air_traffic_controller():
    return render_template('air-traffic-controller.html')

@app.route('/urban-planner')
def urban_planner():
    return render_template('urban-planner.html')

@app.route('/airline-pilot')
def airline_pilot():
    return render_template('airline-pilot.html')

@app.route('/advertising-executive')
def advertising_executive():
    return render_template('advertising-executive.html')

@app.route('/it-project-manager')
def it_project_manager():
    return render_template('it-project-manager.html')

@app.route('/video-game-tester')
def video_game_tester():
    return render_template('video-game-tester.html')

@app.route('/sports-coach')
def sports_coach():
    return render_template('sports-coach.html')

@app.route('/film-director')
def film_director():
    return render_template('film-director.html')

@app.route('/database-analyst')
def database_analyst():
    return render_template('database-analyst.html')

@app.route('/public-health-analyst')
def public_health_analyst():
    return render_template('public-health-analyst.html')

@app.route('/forestry-technician')
def forestry_technician():
    return render_template('forestry-technician.html')

@app.route('/wildlife-conservationist')
def wildlife_conservationist():
    return render_template('wildlife-conservationist.html')


@app.route('/design-and-creative-arts')
def design():
    return render_template('design-and-creative-arts.html')


@app.route('/journalist.html')
def journalist():
    return render_template('journalist.html')

@app.route('/social-media-manager.html')
def social_media_manager():
    return render_template('social-media-manager.html')

@app.route('/marketing-copywriter.html')
def marketing_copywriter():
    return render_template('marketing-copywriter.html')

@app.route('/public-relations-specialist.html')
def public_relations_specialist():
    return render_template('public-relations-specialist.html')

@app.route('/technical-writer.html')
def technical_writer():
    return render_template('technical-writer.html')



@app.route('/job_posting')
def jon_posting():
    return render_template('index.html')



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

@app.route('/healthcare-and-medical')
def health_care_medical():
    return render_template('healthcare-and-medical.html')

@app.route('/science-and-research.html')
def secienceeee():
    return render_template('science-and-research.html')

@app.route('/engineering-and-technology')
def engineeringggggg():
    return render_template('engineering-and-technology.html')


@app.route('/business-and-finance')
def business():
    return render_template('business-and-finance.html')

@app.route('/law-and-public-service')
def laww():
    return render_template('law-and-public-service.html')


@app.route('/media-and-communication')
def meediaa():
    return render_template('media-and-communication.html')

@app.route('/forum')
def forum():
    return render_template('communication.html')



model = pickle.load(open('model.pkl', 'rb'))


@app.route('/submit', methods=['POST'])
def submit():
    hcaptcha_response = request.form['h-captcha-response']
    
    secret_key = "ES_5141b751dc3d4680a278485ff4a813b3"  # Replace with your actual secret key
    verify_url = "https://hcaptcha.com/siteverify"

    payload = {
        'secret': secret_key,
        'response': hcaptcha_response
    }

    # Send the POST request to verify the captcha
    response = requests.post(verify_url, data=payload)
    verification_result = response.json()

    if verification_result['success']:
        # Store form values in session
        session['form_data'] = request.form.to_dict() 
        del session['form_data']['g-recaptcha-response']
        del session['form_data']['h-captcha-response'] # Save all form data in the session
        print(session['form_data'])
        return redirect(url_for('predict'))
    else:
        return "hCaptcha validation failed!", 400

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    # Retrieve form data from session
    form_data = session.get('form_data', {})
    if not form_data:
        return "No form data found!", 400

    try:
        int_features = [float(x) for x in form_data.values()]
        final_features = [np.array(int_features)]
        prediction = model.predict(final_features)

        output = round(prediction[0], 9)

        # Redirect based on prediction output
        if output == 0:
            return redirect('/healthcare-and-medical.html')
        elif output == 1:
            return redirect('/science-and-research.html')
        elif output == 2:
            return redirect('/engineering-and-technology.html')
        elif output == 3:
            return redirect('/design-and-creative-arts.html')
        elif output == 4:
            return redirect('/education.html')
        elif output == 5:
            return redirect('/business-and-finance.html')
        elif output == 6:
            return redirect('/law-and-public-service.html')
        elif output == 7:
            return redirect('/media-and-communication.html')
        else:
            return redirect('/webrtc.html')
    except ValueError:
        return "Error processing input data!", 400
    
# @app.route('/communication')
# def payment_form():
#     return render_template('communication.html')


@app.route('/payment_form')
def payment_form():
    return render_template('form.html')

mailjet = Client(auth=('51e9cd9c523e12637bef00832c5f00ab', 'b2cd0d4bc0f7e8f3debe72f25ac50a9d'), version='v3.1')

@app.route('/pay', methods=["GET", "POST"])
def pay():
    emaill = request.form.get("emaill")
    session['emaill'] = emaill
    if request.form.get("amount") != "":
        amount = request.form.get("amt")
        data = { "amount": amount, "currency": "INR", "receipt": "order_rcptid_11" }
        payment = client.order.create(data=data)
        pdata = [amount, payment["id"]]

        return render_template("payment.html", pdata=pdata)
    return redirect("/2")

@app.route('/success', methods=["POST"])
def success():
    emaill = session.get('emaill') 
    pid = request.form.get("razorpay_payment_id")
    ordid = request.form.get("razorpay_order_id")
    sign = request.form.get("razorpay_signature")
    print(f"The payment id : {pid}, order id : {ordid} and signature : {sign}")
    
    params = {
        'razorpay_order_id': ordid,
        'razorpay_payment_id': pid,
        'razorpay_signature': sign
    }
    
    final = client.utility.verify_payment_signature(params)
    
    if final == True:
        finalans = User.query.filter_by(email=emaill).first()
        if finalans:
            finalans.payment = True  # Set payment column to True
            db.session.commit()  # Commit the changes to the database

            # Prepare and send the email
            send_payment_email(emaill, pid, ordid)

        return redirect("/3", code=301)
    
    return "Something Went Wrong Please Try Again"

def send_payment_email(email, payment_id, order_id):
    subject = "Payment Successful"
    text = f"""
    Your payment has been successfully processed!
    
    Payment ID: {payment_id}
    Order ID: {order_id}
    
    Thank you for your payment!
    """
    
    # Create email payload
    payload = {
        'Messages': [
            {
                'From': {
                    'Email': 'sidharthgrover29@gmail.com',  # Replace with your sender email
                    'Name': 'Sidharth Grover'  # Replace with your name
                },
                'To': [
                    {
                        'Email': email,
                        'Name': 'Recipient Name'  # Optional
                    }
                ],
                'Subject': subject,
                'TextPart': text
            }
        ]
    }
    
    # Send email
    result = mailjet.send.create(data=payload)
    if result.status_code != 200:
        print(f"Failed to send email: {result.json()}")


    #------------------------------------- forum db ------------------------------------

def init_db():
    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
   
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            dislikes INTEGER DEFAULT 0
        )
    ''')
  
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS replies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER NOT NULL,
            reply TEXT NOT NULL,
            FOREIGN KEY (question_id) REFERENCES questions(id)
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/submit_question', methods=['POST'])
def submit_question():
    question = request.form['question'].strip()
    
    if len(question) < 5:
        return "Invalid question. It must contain at least 5 characters.", 400
    
    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO questions (question) VALUES (?)', (question,))
    conn.commit()
    conn.close()
    return redirect(url_for('forum'))


@app.route('/submit_reply/<int:question_id>', methods=['POST'])
def submit_reply(question_id):
    reply = request.form['reply']
    if len(reply) < 3:
        return "Invalid reply. It must contain at least 3 characters.", 400

    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO replies (question_id, reply) VALUES (?, ?)', (question_id, reply))
    conn.commit()
    conn.close()
    return 'Reply submitted successfully!'

@app.route('/vote/<int:question_id>/<action>', methods=['POST'])
def vote(question_id, action):
    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
    if action == 'like':
        cursor.execute('UPDATE questions SET likes = likes + 1 WHERE id = ?', (question_id,))
    elif action == 'dislike':
        cursor.execute('UPDATE questions SET dislikes = dislikes + 1 WHERE id = ?', (question_id,))
    conn.commit()
    conn.close()
    return 'Vote submitted!'


@app.route('/get_questions_with_replies', methods=['GET'])
def get_questions_with_replies():
    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions')
    questions = cursor.fetchall()
    
    result = []
    for question in questions:
        cursor.execute('SELECT * FROM replies WHERE question_id = ?', (question[0],))
        replies = cursor.fetchall()
        result.append({'question': question, 'replies': replies})
    
    conn.close()
    return jsonify(result)


@app.route('/delete_question/<int:id>', methods=['POST'])
def delete_question(id):
    conn = sqlite3.connect('questions.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM replies WHERE question_id = ?', (id,))
    cursor.execute('DELETE FROM questions WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return 'Question deleted successfully!'





app.run(debug=True)

