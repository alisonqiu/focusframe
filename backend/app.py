# import os
# from flask import Flask, send_from_directory
# from extensions import db
# from routes.tasks import tasks_bp
# from routes.gamification import gamification_bp
# from routes.mood import mood_bp

# def create_app():
#     app = Flask(__name__, static_folder='../frontend', static_url_path='/')
#     basedir = os.path.abspath(os.path.dirname(__file__))
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#     db.init_app(app)

#     app.register_blueprint(tasks_bp, url_prefix='/api')
#     app.register_blueprint(gamification_bp, url_prefix='/api')
#     app.register_blueprint(mood_bp, url_prefix='/api')

#     @app.route('/')
#     def serve():
#         return send_from_directory(app.static_folder, 'index.html')

#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True)

import os
from flask import Flask, send_from_directory
from extensions import db
from routes.tasks import tasks_bp
from routes.gamification import gamification_bp
from routes.mood import mood_bp

def create_app():
    app = Flask(__name__, static_folder='../frontend', static_url_path='/')
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(tasks_bp, url_prefix='/api')
    app.register_blueprint(gamification_bp, url_prefix='/api')
    app.register_blueprint(mood_bp, url_prefix='/api')

    @app.route('/')
    def home():
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/tasks')
    def tasks_page():
        return send_from_directory(app.static_folder, 'tasks.html')

    @app.route('/gamification')
    def gamification_page():
        return send_from_directory(app.static_folder, 'gamification.html')

    @app.route('/mood')
    def mood_page():
        return send_from_directory(app.static_folder, 'mood.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
