from flask import Blueprint, render_template, request, redirect, url_for, jsonify
##so now we can write our routes not in the app.py

from flask_login import login_required, current_user

from .models import Test, Results
from . import db

import json


views = Blueprint("views", __name__)

@views.route("/", methods=('GET', 'POST'))
@login_required
def index():
    return redirect(url_for("views.home"))

@views.route("/home", methods=('GET', 'POST'))
@login_required
def home():
    if request.method == 'POST':
        if request.form['submit'] == 'test':
            return redirect(url_for("views.create"))
        if request.form['submit'] == 'list':
            return redirect(url_for("views.all"))
    
    return render_template("main.html", user=current_user)

@views.route("/create", methods=('GET', 'POST'))
@login_required
def create():
    
    return render_template("construct.html", user=current_user)

@views.route("/send", methods = ['GET', 'POST'])
@login_required
def send():
    dataGet = request.get_json(force=True)
    # print(type(dataGet)) //dict
    if dataGet:
        test_id = saveData(dataGet, current_user)
        dataReply = {
            'test_id': test_id
        }

    return jsonify(dataReply)

    

@views.route("/test/id=<test_id>", methods=('GET', 'POST'))
def test(test_id):
    test = Test.query.filter_by(id=test_id).first()
    data = test.data
    return render_template("test.html", data=data)


@views.route("/results", methods = ['GET', 'POST'])
@login_required
def results():
    dataGet = request.get_json(force=True)
    print(dataGet)
    print(type(dataGet))
    if dataGet:
        saveResults(dataGet)
        dataReply = {
            'data': 'data'
        }

    return jsonify(dataReply)

@views.route("/all", methods = ['GET', 'POST'])
@login_required
def all():
    print('Current User: ', current_user)
    print('Current User results: ', current_user.results)
    tests = current_user.tests
    ids = set()
    for test in tests:
        ids.add(test.id)
    ids = list(ids)
    print('ids: ', ids)
    dict = {}
    for id in ids:
        list_results = []
        
        for result in current_user.results:
            if result.test_id == id:
                list_results.append(result)
            dict[id] = list_results
            print(list_results)
    
    print(dict)
                
    return render_template("all.html", user=current_user, json=json, dict=dict, ids=ids)

def saveData(data, user):
    print(data)
    # print(type(data))
    data = makeStr(data)
    new_test = Test(user_id=user.id, data=data)
    db.session.add(new_test)
    db.session.commit()

    print('Test added to db!')
    test_id = new_test.id
    
    return test_id

def makeStr(my_dict):
    my_str = json.dumps(my_dict)
    # print(type(my_str))
    return my_str

def saveResults(data): 
    print(data)
    print(type(data))
    test_id = data['testId']
    test = Test.query.filter_by(id=test_id).first()

    user_id = test.user_id
    print('user_id: ', user_id)


    results = Results(user_id=user_id, test_id=test_id, data=json.dumps(data))
    db.session.add(results)
    db.session.commit()

    print('results added to db!')
    print(results)


    return test_id
    











            

