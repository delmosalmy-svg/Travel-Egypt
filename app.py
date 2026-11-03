from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)


# Home Page
@app.route('/')
def home():
    return render_template('index.html')


# Create Database
def init_db():
    conn = sqlite3.connect('travel.db')

    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            destination TEXT,
            booking_type TEXT,
            arrival_date TEXT,
            departure_date TEXT,
            guests INTEGER
        )
    """)

    # Add Phone Column to Existing Database
    columns = [row[1] for row in conn.execute(
        "PRAGMA table_info(bookings)"
    ).fetchall()]

    if 'phone' not in columns:
        conn.execute("ALTER TABLE bookings ADD COLUMN phone TEXT")

    conn.commit()
    conn.close()


# Receive Booking Data
@app.route('/book', methods=['POST'])
def book():

    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    destination = request.form.get('destination')
    booking_type = request.form.get('booking_type')
    arrival_date = request.form.get('arrival_date')
    departure_date = request.form.get('departure_date')
    guests = request.form.get('guests')

    conn = sqlite3.connect('travel.db')

    conn.execute("""
        INSERT INTO bookings
        (name, email, phone, destination, booking_type, arrival_date, departure_date, guests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, email, phone, destination, booking_type,
          arrival_date, departure_date, guests))

    conn.commit()
    conn.close()

    return render_template('success.html', name=name)


# View All Bookings
@app.route('/bookings')
def view_bookings():

    conn = sqlite3.connect('travel.db')
    conn.row_factory = sqlite3.Row

    all_bookings = conn.execute(
        'SELECT * FROM bookings'
    ).fetchall()

    conn.close()

    return render_template('bookings.html', bookings=all_bookings)

# Delete Booking
@app.route('/delete_booking/<int:booking_id>')
def delete_booking(booking_id):

    conn = sqlite3.connect('travel.db')

    conn.execute(
        'DELETE FROM bookings WHERE id = ?',
        (booking_id,)
    )

    conn.commit()
    conn.close()

    return redirect('/bookings')
# Run Application
if __name__ == '__main__':
    init_db()
    app.run(debug=True)

