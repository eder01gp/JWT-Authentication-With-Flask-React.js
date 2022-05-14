"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signin():
    username = request.json.get("User", None)
    password = request.json.get("Password", None)
    # Query your database for username and password
    user = User.query.filter_by(user=username, password=password).first()
    if user is None:
        new_user = User(user=username,password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created correctly"}), 200
    else:
        return jsonify({"msg": "User already in use"}), 400


@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("User", None)
    password = request.json.get("Password", None)
    # Query your database for username and password
    user = User.query.filter_by(user=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Incorrect data, please try again"}), 400
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id, "msg": "Sucessfull Login" }), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"logged_in": True}), 200
    else:
        return jsonify({"logged_in": False}), 400