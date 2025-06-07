import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  Building2, 
  Users, 
  BarChart4, 
  Search, 
  Globe, 
  Monitor, 
  Clock 
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import './App.css'

// Dashboard component
const Dashboard = () => {
  const [stats, setStats] = useState({
    top_countries: [],
    top_pages: [],
    device_distribution: [],
    browser_distribution: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics from the API
    const fetchStats = async () => {
      try {
        setLoading(true);
        // In a real app, this would be fetched from the API
        // const response = await fetch('http://localhost:5000/api/statistics');
        // const data = await response.json();
        
        // For demo purposes, we'll use mock data
        const mockData = {
          top_countries: [
            { country: 'United States', count: 42 },
            { country: 'Germany', count: 28 },
            { country: 'India', count: 15 },
            { country: 'United Kingdom', count: 12 },
            { country: 'Canada', count: 8 }
          ],
          top_pages: [
            { page: '/', count: 120 },
            { page: '/company/investors/', count: 75 },
            { page: '/contact-us/', count: 50 },
            { page: '/blog/use-cases-generative-ai-cx-ex/', count: 35 },
            { page: '/knowledge-management-in-it/', count: 20 }
          ],
          device_distribution: [
            { device: 'Desktop', count: 180 },
            { device: 'Mobile', count: 120 }
          ],
          browser_distribution: [
            { browser: 'Chrome', count: 150 },
            { browser: 'Firefox', count: 80 },
            { browser: 'Safari', count: 50 },
            { browser: 'Edge', count: 20 }
          ]
        };
        
        setStats(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading statistics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats.top_countries.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.country}</span>
                    <span className="font-semibold">{item.count} visits</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="mr-2 h-5 w-5" />
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats.top_pages.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="truncate max-w-[200px]">{item.page}</span>
                    <span className="font-semibold">{item.count} visits</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Device Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="mr-2 h-5 w-5" />
                Device Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats.device_distribution.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.device}</span>
                    <span className="font-semibold">{item.count} visits</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Browser Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Browser Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats.browser_distribution.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.browser}</span>
                    <span className="font-semibold">{item.count} visits</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Companies component
const Companies = () => {
  const [allCompanies] = useState([
    { id: 1, name: 'Acme Corporation', isp: 'Acme ISP', country: 'United States', city: 'New York', visit_count: 42 },
    { id: 2, name: 'TechCorp', isp: 'Tech ISP', country: 'United States', city: 'San Francisco', visit_count: 35 },
    { id: 3, name: 'Global Industries', isp: 'Global ISP', country: 'United Kingdom', city: 'London', visit_count: 28 },
    { id: 4, name: 'Innovative Solutions', isp: 'Innovative ISP', country: 'Germany', city: 'Berlin', visit_count: 22 },
    { id: 5, name: 'Digital Enterprises', isp: 'Digital ISP', country: 'Japan', city: 'Tokyo', visit_count: 18 },
    { id: 6, name: 'Bloomberg Financial Market', isp: 'Bloomberg, LP', country: 'United States', city: 'New York', visit_count: 15 },
    { id: 7, name: 'NetMagic Solutions Pvt Ltd', isp: 'Netmagic Solution Network', country: 'India', city: 'Mumbai', visit_count: 12 },
    { id: 8, name: 'AWS EC2 (us-east-2)', isp: 'Amazon.com, Inc.', country: 'United States', city: 'Dublin', visit_count: 10 },
    { id: 9, name: 'TMD Friction Shared Services', isp: 'Versatel Deutschland', country: 'Germany', city: 'Berlin', visit_count: 8 },
    { id: 10, name: 'Novgames', isp: 'Web2Objects LLC', country: 'Canada', city: 'Toronto', visit_count: 5 },
    { id: 11, name: 'Microsoft Corporation', isp: 'Microsoft Corp', country: 'United States', city: 'Seattle', visit_count: 25 },
    { id: 12, name: 'Google LLC', isp: 'Google Inc.', country: 'United States', city: 'Mountain View', visit_count: 30 },
    { id: 13, name: 'Apple Inc.', isp: 'Apple Inc.', country: 'United States', city: 'Cupertino', visit_count: 20 },
    { id: 14, name: 'Samsung Electronics', isp: 'Samsung SDS', country: 'South Korea', city: 'Seoul', visit_count: 18 },
    { id: 15, name: 'Sony Corporation', isp: 'Sony Network', country: 'Japan', city: 'Tokyo', visit_count: 14 }
  ]);
  
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Filter companies based on search and country
  useEffect(() => {
    let filtered = allCompanies;
    
    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.isp.toLowerCase().includes(search.toLowerCase()) ||
        company.city.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply country filter
    if (country.trim()) {
      filtered = filtered.filter(company => 
        company.country.toLowerCase().includes(country.toLowerCase())
      );
    }
    
    // Sort by visit count (descending)
    filtered.sort((a, b) => b.visit_count - a.visit_count);
    
    // Calculate pagination
    const totalItems = filtered.length;
    const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCompanies = filtered.slice(startIndex, endIndex);
    
    setFilteredCompanies(paginatedCompanies);
    setTotalPages(totalPagesCount);
  }, [allCompanies, search, country, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleCountryInputChange = (e) => {
    setCountry(e.target.value);
    setPage(1); // Reset to first page when country filter changes
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>
      
      {/* Search and filter */}
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="w-full md:w-48">
          <Input
            type="text"
            placeholder="Filter by country"
            value={country}
            onChange={handleCountryInputChange}
          />
        </div>
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
      
      {/* Results summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredCompanies.length} of {allCompanies.filter(company => {
            const matchesSearch = !search.trim() || 
              company.name.toLowerCase().includes(search.toLowerCase()) ||
              company.isp.toLowerCase().includes(search.toLowerCase()) ||
              company.city.toLowerCase().includes(search.toLowerCase());
            const matchesCountry = !country.trim() || 
              company.country.toLowerCase().includes(country.toLowerCase());
            return matchesSearch && matchesCountry;
          }).length} companies
          {search && ` matching "${search}"`}
          {country && ` in countries matching "${country}"`}
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading companies...</p>
        </div>
      ) : (
        <>
          {/* Companies table */}
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">ISP</th>
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-right">Visits</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{company.name}</td>
                      <td className="py-3 px-4">{company.isp}</td>
                      <td className="py-3 px-4">{company.country}</td>
                      <td className="py-3 px-4">{company.city}</td>
                      <td className="py-3 px-4 text-right">{company.visit_count}</td>
                      <td className="py-3 px-4 text-center">
                        <Link to={`/companies/${company.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No companies found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setPage(page + 1)} 
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Company Details component
const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would get the company ID from the URL params
    // const { id } = useParams();
    const id = 1; // For demo purposes
    
    // Fetch company details from the API
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        const mockCompany = {
          id: 1,
          name: 'Acme Corporation',
          isp: 'Acme ISP',
          country: 'United States',
          city: 'New York',
          visit_count: 42
        };
        
        const mockVisits = [
          { id: 1, ip: '192.168.1.1', timestamp: '2025-06-01T10:30:00', page_path: '/', referrer: 'Google', device: 'Desktop', browser: 'Chrome' },
          { id: 2, ip: '192.168.1.1', timestamp: '2025-06-01T10:35:00', page_path: '/company/investors/', referrer: 'Direct', device: 'Desktop', browser: 'Chrome' },
          { id: 3, ip: '192.168.1.1', timestamp: '2025-06-01T10:40:00', page_path: '/contact-us/', referrer: 'Direct', device: 'Desktop', browser: 'Chrome' },
          { id: 4, ip: '192.168.1.2', timestamp: '2025-06-02T14:20:00', page_path: '/', referrer: 'LinkedIn', device: 'Mobile', browser: 'Safari' },
          { id: 5, ip: '192.168.1.2', timestamp: '2025-06-02T14:25:00', page_path: '/blog/use-cases-generative-ai-cx-ex/', referrer: 'Direct', device: 'Mobile', browser: 'Safari' }
        ];
        
        setCompany(mockCompany);
        setVisits(mockVisits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading company details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/companies">
          <Button variant="outline">
            Back to Companies
          </Button>
        </Link>
      </div>
      
      {company && (
        <>
          <h1 className="text-3xl font-bold mb-6">{company.name}</h1>
          
          {/* Company details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ISP</p>
                  <p className="font-medium">{company.isp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{company.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{company.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                  <p className="font-medium">{company.visit_count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Visit history */}
          <h2 className="text-2xl font-bold mb-4">Visit History</h2>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">IP</th>
                  <th className="py-3 px-4 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">Page</th>
                  <th className="py-3 px-4 text-left">Referrer</th>
                  <th className="py-3 px-4 text-left">Device</th>
                  <th className="py-3 px-4 text-left">Browser</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="border-b">
                    <td className="py-3 px-4">{visit.ip}</td>
                    <td className="py-3 px-4">{new Date(visit.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-4 max-w-[200px] truncate">{visit.page_path}</td>
                    <td className="py-3 px-4">{visit.referrer}</td>
                    <td className="py-3 px-4">{visit.device}</td>
                    <td className="py-3 px-4">{visit.browser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <div className="p-4">
            <h1 className="text-xl font-bold">eGain Visitor Insights</h1>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center px-4 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <BarChart4 className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/companies" className="flex items-center px-4 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Building2 className="mr-2 h-5 w-5" />
                  Companies
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

