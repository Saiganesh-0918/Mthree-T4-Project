from app import app, db
from socket_handler import socketio
from prometheus_flask_exporter import PrometheusMetrics
import logging
from logging.handlers import RotatingFileHandler
import os

# Set up Prometheus metrics
metrics = PrometheusMetrics(app)

# Set up logging for Loki
if not os.path.exists('logs'):
    os.makedirs('logs')

log_handler = RotatingFileHandler('logs/app.log', maxBytes=1000000, backupCount=3)
log_handler.setLevel(logging.INFO)
log_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s'))
app.logger.addHandler(log_handler)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.logger.info("Starting Flask SocketIO App")
    socketio.run(app, host="0.0.0.0", port=5000)

    