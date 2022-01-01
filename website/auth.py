from flask import Blueprint, render_template, request, redirect, url_for
##so now we can write our routes not in the app.py

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return redirect(url_for("views.home"))
    return render_template("index.html")
    
@auth.route("/logout")
def logout():
    return "Logout"






            

