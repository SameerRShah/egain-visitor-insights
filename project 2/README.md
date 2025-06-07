# eGain Visitor Insights

A prototype web application for eGain sales representatives that provides insights about website visitors using weblog data. This solution empowers sales reps with valuable information about potential leads and customers visiting the eGain website.

## Live Demo

The application is available at the following URLs:

- Frontend: [https://czcwwvdb.manus.space](https://czcwwvdb.manus.space)
- Backend API: [https://4zmhqivclje7.manus.space](https://4zmhqivclje7.manus.space)

These links will be available for 15 days from the submission date.

## Features

- **Company Insights**: View detailed information about companies visiting the website, including their location, ISP, and visit frequency.
- **Visit History**: Track the pages visited by each company, including timestamps, referrers, devices, and browsers.
- **Search and Filter**: Search for specific companies or filter by country to quickly find relevant information.
- **Dashboard**: Get an overview of key metrics such as top countries, most visited pages, and device/browser distribution.

## Technology Stack

- **Frontend**: React, TailwindCSS, Shadcn UI components
- **Backend**: Flask, SQLite
- **Data Enrichment**: IP-API for IP to company/location mapping

## Architecture

The application follows a client-server architecture:

1. **Data Processing Pipeline**:
   - Raw weblog data is processed and cleaned
   - IP addresses are enriched with company and location information using IP-API
   - Processed data is stored in a SQLite database

2. **Backend API**:
   - RESTful API built with Flask
   - Provides endpoints for companies, visits, and statistics
   - Supports filtering, pagination, and sorting

3. **Frontend Application**:
   - React-based single-page application
   - Responsive design for desktop and mobile
   - Interactive dashboard with key metrics
   - Company search and filtering capabilities

## Local Development

### Backend Setup

```bash
cd visitor_insights_api
source venv/bin/activate
pip install -r requirements.txt
python src/main.py
```

### Frontend Setup

```bash
cd visitor-insights-frontend
pnpm install
pnpm run dev
```

## Future Enhancements

- Real-time data processing pipeline
- Integration with CRM systems
- Advanced analytics and machine learning for lead scoring
- Email notifications for high-value company visits
- User authentication and role-based access control

## License

MIT

## Author

Created by Sameer Rehman Shah for eGain Sales Engineer Home Assignment.

