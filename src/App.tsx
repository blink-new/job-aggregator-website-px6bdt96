import { useState, useEffect, useCallback, useMemo } from 'react'
import { Search, MapPin, DollarSign, Clock, Bookmark, ExternalLink, Filter, Building2, Star } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Skeleton } from './components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Separator } from './components/ui/separator'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  type: string
  description: string
  source: string
  postedDate: string
  applyUrl: string
  saved?: boolean
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('all')
  const [salaryRange, setSalaryRange] = useState('any')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())

  // Mock job data for demonstration
  const mockJobs = useMemo<Job[]>(() => [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies.',
      source: 'LinkedIn',
      postedDate: '2 days ago',
      applyUrl: 'https://linkedin.com/jobs/123'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$90k - $130k',
      type: 'Full-time',
      description: 'Join our fast-growing startup as a Full Stack Engineer. Work with Node.js, React, and cloud technologies to build scalable applications.',
      source: 'Indeed',
      postedDate: '1 day ago',
      applyUrl: 'https://indeed.com/jobs/456'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      salary: '$80k - $110k',
      type: 'Contract',
      description: 'Looking for a React Developer to work on client projects. Experience with modern React patterns and state management required.',
      source: 'Glassdoor',
      postedDate: '3 days ago',
      applyUrl: 'https://glassdoor.com/jobs/789'
    },
    {
      id: '4',
      title: 'Software Engineer',
      company: 'BigTech Co.',
      location: 'Seattle, WA',
      salary: '$140k - $180k',
      type: 'Full-time',
      description: 'Join our engineering team to build large-scale distributed systems. Experience with Java, Python, or Go required.',
      source: 'AngelList',
      postedDate: '1 week ago',
      applyUrl: 'https://angellist.com/jobs/101'
    },
    {
      id: '5',
      title: 'Frontend Developer',
      company: 'E-commerce Plus',
      location: 'Austin, TX',
      salary: '$70k - $95k',
      type: 'Full-time',
      description: 'Build and maintain our e-commerce platform frontend. Experience with Vue.js and modern CSS frameworks preferred.',
      source: 'ZipRecruiter',
      postedDate: '4 days ago',
      applyUrl: 'https://ziprecruiter.com/jobs/202'
    },
    {
      id: '6',
      title: 'Senior Backend Developer',
      company: 'FinTech Solutions',
      location: 'Chicago, IL',
      salary: '$110k - $150k',
      type: 'Full-time',
      description: 'Design and implement backend services for our financial platform. Strong experience with microservices and databases required.',
      source: 'Monster',
      postedDate: '5 days ago',
      applyUrl: 'https://monster.com/jobs/303'
    }
  ], [])

  const handleSearch = useCallback(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filteredJobs = mockJobs

      if (searchQuery) {
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if (location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      }

      if (jobType && jobType !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.type === jobType)
      }

      setJobs(filteredJobs)
      setLoading(false)
    }, 1000)
  }, [searchQuery, location, jobType, mockJobs])

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs)
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId)
    } else {
      newSavedJobs.add(jobId)
    }
    setSavedJobs(newSavedJobs)
  }

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'LinkedIn': 'bg-blue-100 text-blue-800',
      'Indeed': 'bg-green-100 text-green-800',
      'Glassdoor': 'bg-purple-100 text-purple-800',
      'AngelList': 'bg-orange-100 text-orange-800',
      'ZipRecruiter': 'bg-red-100 text-red-800',
      'Monster': 'bg-indigo-100 text-indigo-800'
    }
    return colors[source] || 'bg-gray-100 text-gray-800'
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">JobHub</h1>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Saved Jobs ({savedJobs.size})</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Job
            </h2>
            <p className="text-xl text-gray-600">
              Search thousands of jobs from top companies and job boards
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleSearch} className="w-full" disabled={loading}>
                {loading ? 'Searching...' : 'Search Jobs'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select value={salaryRange} onValueChange={setSalaryRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Salary</SelectItem>
                  <SelectItem value="0-50k">$0 - $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                  <SelectItem value="150k+">$150k+</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            {loading ? 'Searching...' : `${jobs.length} Jobs Found`}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Updated 5 minutes ago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : jobs.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            // Job cards
            jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <h4 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                            {job.title}
                          </h4>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{job.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Building2 className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              {job.salary && (
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium text-accent">{job.salary}</span>
                                </div>
                              )}
                              <Badge variant="secondary">{job.type}</Badge>
                              <Badge className={getSourceColor(job.source)}>{job.source}</Badge>
                            </div>

                            <Separator />

                            <div>
                              <h5 className="font-semibold mb-2">Job Description</h5>
                              <p className="text-gray-700 leading-relaxed">{job.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                              <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleSaveJob(job.id)}
                                  className={savedJobs.has(job.id) ? 'text-accent border-accent' : ''}
                                >
                                  <Bookmark className={`w-4 h-4 mr-2 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                                  {savedJobs.has(job.id) ? 'Saved' : 'Save'}
                                </Button>
                                <Button size="sm" asChild>
                                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Apply Now
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 font-medium">{job.company}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveJob(job.id)}
                      className={savedJobs.has(job.id) ? 'text-accent' : 'text-gray-400'}
                    >
                      <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>
                  
                  {job.salary && (
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-accent">{job.salary}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Badge className={getSourceColor(job.source)}>{job.source}</Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Posted {job.postedDate}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Apply
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default App