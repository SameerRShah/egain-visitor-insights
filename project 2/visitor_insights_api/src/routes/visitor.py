from flask import Blueprint, jsonify, request
from src.models.visitor import Company, Visit, db
from sqlalchemy import func, desc
import sqlite3
import os

visitor_bp = Blueprint('visitor', __name__)

# Helper function to connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect('/home/ubuntu/project/data/visitor_logs.db')
    conn.row_factory = sqlite3.Row
    return conn

# Import data from SQLite to MySQL (for initial setup)
@visitor_bp.route('/import-data', methods=['POST'])
def import_data():
    try:
        # Connect to SQLite database
        sqlite_conn = get_db_connection()
        sqlite_cursor = sqlite_conn.cursor()
        
        # Get companies from SQLite
        sqlite_cursor.execute('SELECT * FROM companies')
        companies = sqlite_cursor.fetchall()
        
        # Import companies to MySQL
        for company in companies:
            existing_company = Company.query.filter_by(name=company['name']).first()
            if not existing_company:
                new_company = Company(
                    name=company['name'],
                    isp=company['isp'],
                    country=company['country'],
                    city=company['city'],
                    visit_count=company['visit_count']
                )
                db.session.add(new_company)
        
        db.session.commit()
        
        # Get visits from SQLite
        sqlite_cursor.execute('SELECT * FROM visits')
        visits = sqlite_cursor.fetchall()
        
        # Import visits to MySQL
        for visit in visits:
            # Find the corresponding company
            company = Company.query.filter_by(name=Company.query.get(visit['company_id']).name).first()
            
            if company:
                new_visit = Visit(
                    ip=visit['ip'],
                    timestamp=visit['timestamp'],
                    page_path=visit['page_path'],
                    referrer=visit['referrer'],
                    device=visit['device'],
                    browser=visit['browser'],
                    company_id=company.id
                )
                db.session.add(new_visit)
        
        db.session.commit()
        sqlite_conn.close()
        
        return jsonify({'message': 'Data imported successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get all companies
@visitor_bp.route('/companies', methods=['GET'])
def get_companies():
    # Get query parameters
    search = request.args.get('search', '')
    country = request.args.get('country', '')
    sort_by = request.args.get('sort_by', 'visit_count')
    sort_order = request.args.get('sort_order', 'desc')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    
    # Build query
    query = Company.query
    
    # Apply filters
    if search:
        query = query.filter(Company.name.like(f'%{search}%'))
    if country:
        query = query.filter(Company.country == country)
    
    # Apply sorting
    if sort_order == 'desc':
        query = query.order_by(desc(getattr(Company, sort_by)))
    else:
        query = query.order_by(getattr(Company, sort_by))
    
    # Apply pagination
    total = query.count()
    companies = query.paginate(page=page, per_page=per_page)
    
    # Prepare response
    result = {
        'companies': [company.to_dict() for company in companies.items],
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': companies.pages
    }
    
    return jsonify(result)

# Get a specific company
@visitor_bp.route('/companies/<int:company_id>', methods=['GET'])
def get_company(company_id):
    company = Company.query.get_or_404(company_id)
    return jsonify(company.to_dict())

# Get visits for a specific company
@visitor_bp.route('/companies/<int:company_id>/visits', methods=['GET'])
def get_company_visits(company_id):
    company = Company.query.get_or_404(company_id)
    visits = Visit.query.filter_by(company_id=company_id).all()
    return jsonify([visit.to_dict() for visit in visits])

# Get all visits
@visitor_bp.route('/visits', methods=['GET'])
def get_visits():
    # Get query parameters
    company_id = request.args.get('company_id')
    page_path = request.args.get('page_path', '')
    device = request.args.get('device', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    
    # Build query
    query = Visit.query
    
    # Apply filters
    if company_id:
        query = query.filter_by(company_id=company_id)
    if page_path:
        query = query.filter(Visit.page_path.like(f'%{page_path}%'))
    if device:
        query = query.filter_by(device=device)
    
    # Apply sorting
    query = query.order_by(desc(Visit.timestamp))
    
    # Apply pagination
    total = query.count()
    visits = query.paginate(page=page, per_page=per_page)
    
    # Prepare response
    result = {
        'visits': [visit.to_dict() for visit in visits.items],
        'total': total,
        'page': page,
        'per_page': per_page,
        'total_pages': visits.pages
    }
    
    return jsonify(result)

# Get statistics
@visitor_bp.route('/statistics', methods=['GET'])
def get_statistics():
    # Get top countries
    top_countries = db.session.query(
        Company.country, 
        func.count(Company.id).label('count')
    ).group_by(Company.country).order_by(desc('count')).limit(5).all()
    
    # Get top pages
    top_pages = db.session.query(
        Visit.page_path, 
        func.count(Visit.id).label('count')
    ).group_by(Visit.page_path).order_by(desc('count')).limit(5).all()
    
    # Get device distribution
    device_distribution = db.session.query(
        Visit.device, 
        func.count(Visit.id).label('count')
    ).group_by(Visit.device).all()
    
    # Get browser distribution
    browser_distribution = db.session.query(
        Visit.browser, 
        func.count(Visit.id).label('count')
    ).group_by(Visit.browser).all()
    
    # Prepare response
    result = {
        'top_countries': [{'country': country, 'count': count} for country, count in top_countries],
        'top_pages': [{'page': page, 'count': count} for page, count in top_pages],
        'device_distribution': [{'device': device, 'count': count} for device, count in device_distribution],
        'browser_distribution': [{'browser': browser, 'count': count} for browser, count in browser_distribution]
    }
    
    return jsonify(result)

