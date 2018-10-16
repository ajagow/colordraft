import sqlite3
from flask import g, app


conn = sqlite3.connect('database.db')
print ("Opened db successfully");

conn.execute('CREATE TABLE information (photopath TEXT, word TEXT, hexColor TEXT)')
print ("table created")

conn.close()