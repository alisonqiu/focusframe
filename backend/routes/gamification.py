from flask import Blueprint, request, jsonify
from extensions import db
from models import User

gamification_bp = Blueprint('gamification', __name__)

@gamification_bp.route('/points', methods=['POST'])
def add_points():
    data = request.get_json()
    user = User.query.first()
    user.points += data['points']
    db.session.commit()
    return jsonify({"message": "Points added!"})

@gamification_bp.route('/points', methods=['GET'])
def get_points():
    user = User.query.first()
    return jsonify({"points": user.points})
