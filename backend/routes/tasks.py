from flask import Blueprint, request, jsonify
from extensions import db
from models import Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(title=data['title'], priority=data['priority'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added!"}), 201

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(
        db.case(
            (Task.priority == 'high', 1),
            (Task.priority == 'medium', 2),
            (Task.priority == 'low', 3)
        )
    ).all()
    task_list = [{"id": t.id, "title": t.title, "priority": t.priority, "completed": t.completed} for t in tasks]
    return jsonify(task_list)

@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted!"})
    else:
        return jsonify({"error": "Task not found"}), 404
