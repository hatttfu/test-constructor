from flask import Blueprint, render_template, request, redirect, url_for
##so now we can write our routes not in the app.py

views = Blueprint("views", __name__)

@views.route("/", methods=('GET', 'POST'))
def index():
    return redirect(url_for("auth.login"))

@views.route("/home", methods=('GET', 'POST'))
def home():
    if request.method == 'POST':
        if request.form['submit'] == 'test':
            return redirect(url_for("views.create"))
        if request.form['submit'] == 'list':
            return redirect(url_for("views.all"))
    
    return render_template("main.html")

@views.route("/create", methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        return redirect(url_for("views.send"))
    return render_template("construct.html")

@views.route("/send")
def send():
    return redirect(url_for("views.test"))

@views.route("/test", methods=('GET', 'POST'))
def test():
    if request.method == 'POST':
        return redirect(url_for("views.results")) 
    return render_template("test.html")

@views.route("/results")
def results():
    return render_template("results.html")

@views.route("/all")
def all():
    return render_template("all.html")





            

