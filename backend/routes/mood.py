from flask import Blueprint, request, jsonify
from extensions import db
from models import Mood
from datetime import datetime

mood_bp = Blueprint('mood', __name__)

@mood_bp.route('/mood', methods=['POST'])
def add_mood():
    data = request.get_json()
    new_mood = Mood(mood=data['mood'], timestamp=datetime.now())
    db.session.add(new_mood)
    db.session.commit()
    return jsonify({"message": "Mood logged!"})

@mood_bp.route('/mood', methods=['GET'])
def get_moods():
    moods = Mood.query.all()
    mood_list = [{"id": m.id, "mood": m.mood, "timestamp": m.timestamp} for m in moods]
    return jsonify(mood_list)
