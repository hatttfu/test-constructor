from flask import Blueprint, render_template, request, redirect, url_for, flash
##so now we can write our routes not in the app.py

from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.form['submit'] == 'test':
            name = request.form.get('name')
            password = request.form.get('password')

            print(name, password)

            user = User.query.filter_by(name=name).first()

            print(user)

            if user:
                if check_password_hash(user.password, password):
                    flash('Logged in !', category='success')
                    login_user(user, remember=True)

                    return redirect(url_for("views.home"))
                else:
                    flash('Неправильный пароль', category='error')
            else:
                flash('Такого имени в базе данных нет, вероятно, вы не регистрировались', category='error')
        if request.form['submit'] == 'register':
            return redirect(url_for("auth.signup"))  
    return render_template("login.html")
    
@auth.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form.get('name')
        password = request.form.get('password')

        # print(name, password)
        user = User.query.filter_by(name=name).first()
        if user:
            flash('Такой никнейм уже есть. Придумай другой', category='error')
        elif len(name) < 3 and name != 'Ян':
            flash('Имя должно быть хотя бы 3 буквы в длину', category='error')
        elif len(password) < 7:
            flash('Пароль должен быть состоять минимум из 7 символов', category='error')
        else:
            new_user = User(name=name, password=generate_password_hash(password, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            flash('Аккаунт создан!', category='success')
            login_user(new_user, remember=True)

            return redirect(url_for("views.home")) 
             
    return render_template("signup.html")
    
@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))






            

