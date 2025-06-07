from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    isp = db.Column(db.String(255))
    country = db.Column(db.String(100))
    city = db.Column(db.String(100))
    visit_count = db.Column(db.Integer, default=0)
    visits = db.relationship('Visit', backref='company', lazy=True)

    def __repr__(self):
        return f'<Company {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'isp': self.isp,
            'country': self.country,
            'city': self.city,
            'visit_count': self.visit_count
        }

class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ip = db.Column(db.String(45), nullable=False)
    timestamp = db.Column(db.String(50))
    page_path = db.Column(db.String(255))
    referrer = db.Column(db.String(255))
    device = db.Column(db.String(50))
    browser = db.Column(db.String(50))
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

    def __repr__(self):
        return f'<Visit {self.ip} at {self.timestamp}>'

    def to_dict(self):
        return {
            'id': self.id,
            'ip': self.ip,
            'timestamp': self.timestamp,
            'page_path': self.page_path,
            'referrer': self.referrer,
            'device': self.device,
            'browser': self.browser,
            'company_id': self.company_id
        }

