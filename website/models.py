from . import db 
from flask_login import UserMixin
from sqlalchemy.sql import func

class Results(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'))
    data = db.Column(db.String(150000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), default="Без названия")
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    data = db.Column(db.String(150000))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    tests = db.relationship('Test')
    results = db.relationship('Results')


