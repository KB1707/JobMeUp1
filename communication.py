from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Database setup
def init_db():
    conn = sqlite3.connect('questions.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            dislikes INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    conn = sqlite3.connect('questions.db')
    c = conn.cursor()
    c.execute('SELECT * FROM questions')
    questions = c.fetchall()
    conn.close()
    return render_template('communication.html', questions=questions)

@app.route('/submit', methods=['POST'])
def submit():
    question = request.form['question']
    conn = sqlite3.connect('questions.db')
    c = conn.cursor()
    c.execute('INSERT INTO questions (question) VALUES (?)', (question,))
    conn.commit()
    conn.close()
    return redirect(url_for('home'))

@app.route('/like/<int:question_id>')
def like(question_id):
    conn = sqlite3.connect('questions.db')
    c = conn.cursor()
    c.execute('UPDATE questions SET likes = likes + 1 WHERE id = ?', (question_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('home'))

@app.route('/dislike/<int:question_id>')
def dislike(question_id):
    conn = sqlite3.connect('questions.db')
    c = conn.cursor()
    c.execute('UPDATE questions SET dislikes = dislikes + 1 WHERE id = ?', (question_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('home'))

if __name__ == '__main__':
    init_db()  # Initialize the database
    app.run(debug=True)
