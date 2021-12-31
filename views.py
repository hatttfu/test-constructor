from flask import Blueprint, render_template, request, redirect, url_for
##so now we can write our routes not in the app.py

views = Blueprint(__name__, "views")

@views.route("/", methods=('GET', 'POST'))
def index():
    if request.method == 'POST':
        return redirect(url_for("views.create"))
    return render_template("index.html")
    
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
def finish():
    return render_template("results.html")





            

