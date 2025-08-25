"use client"

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  RefreshCw, 
  FileText, 
  Play, 
  RotateCcw, 
  Eye, 
  Download, 
  Flag,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Filter,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface Interview {
  id: string
  jobTitle: string
  company: string
  date: string
  status: 'completed' | 'in-progress' | 'scheduled'
  score?: number
  duration?: number
  transcript?: string
  aiSummary?: string
  tags?: string[]
  recruiterNotes?: string
}

interface Candidate {
  id: string
  name: string
  email: string
  avatar?: string
  averageScore?: number
  lastInterviewDate?: string
  totalInterviews: number
}

interface CandidateDashboardProps {
  candidateId?: string
  isRecruiter?: boolean
  className?: string
}

const mockCandidate: Candidate = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar: '/avatars/alex.jpg',
  averageScore: 8.2,
  lastInterviewDate: '2024-01-15',
  totalInterviews: 12
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    date: '2024-01-15',
    status: 'completed',
    score: 8.5,
    duration: 45,
    transcript: 'Full interview transcript would be here...',
    aiSummary: 'Strong technical skills, excellent communication',
    tags: ['JavaScript', 'React', 'Problem-solving'],
    recruiterNotes: 'Great candidate, recommend for next round'
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    company: 'StartupXYZ',
    date: '2024-01-12',
    status: 'completed',
    score: 7.8,
    duration: 60,
    transcript: 'Product management interview transcript...',
    aiSummary: 'Good strategic thinking, needs work on metrics',
    tags: ['Strategy', 'Leadership', 'Analytics'],
    recruiterNotes: 'Solid candidate but lacking in data analysis'
  },
  {
    id: '3',
    jobTitle: 'UX Designer',
    company: 'DesignStudio',
    date: '2024-01-20',
    status: 'scheduled',
    tags: ['Design', 'User Research']
  }
]

export default function CandidateDashboard({ 
  candidateId, 
  isRecruiter = false, 
  className = "" 
}: CandidateDashboardProps) {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [scoreFilter, setScoreFilter] = useState<string>('all')
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [candidateId])

  useEffect(() => {
    const cached = localStorage.getItem('candidate-interviews')
    if (cached) {
      try {
        const data = JSON.parse(cached)
        setInterviews(data.interviews || [])
        setCandidate(data.candidate || null)
      } catch (error) {
        console.error('Failed to parse cached data:', error)
      }
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCandidate(mockCandidate)
      setInterviews(mockInterviews)
      
      // Cache the data
      localStorage.setItem('candidate-interviews', JSON.stringify({
        candidate: mockCandidate,
        interviews: mockInterviews,
        timestamp: Date.now()
      }))
      
      toast.success('Data loaded successfully')
    } catch (error) {
      toast.error('Failed to load data')
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    localStorage.removeItem('candidate-interviews')
    loadData()
  }

  const handleReplay = (interviewId: string) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('open-interview-readonly', {
        detail: { interviewId }
      })
      document.dispatchEvent(event)
    }
  }

  const handleExport = async (interview: Interview) => {
    try {
      toast.success('Transcript exported successfully')
    } catch (error) {
      toast.error('Failed to export transcript')
    }
  }

  const handleFlag = async (interview: Interview) => {
    try {
      toast.success('Interview flagged for review')
    } catch (error) {
      toast.error('Failed to flag interview')
    }
  }

  const getStatusBadgeVariant = (status: Interview['status']) => {
    switch (status) {
      case 'completed': return 'default'
      case 'in-progress': return 'secondary'
      case 'scheduled': return 'outline'
      default: return 'default'
    }
  }

  const getScoreBadgeColor = (score?: number) => {
    if (!score) return 'bg-muted text-muted-foreground'
    if (score >= 8) return 'bg-success text-white'
    if (score >= 6) return 'bg-yellow-500 text-white'
    return 'bg-destructive text-white'
  }

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = !searchQuery || 
      interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter
    
    const matchesScore = scoreFilter === 'all' || 
      (scoreFilter === 'high' && interview.score && interview.score >= 8) ||
      (scoreFilter === 'medium' && interview.score && interview.score >= 6 && interview.score < 8) ||
      (scoreFilter === 'low' && interview.score && interview.score < 6)
    
    return matchesSearch && matchesStatus && matchesScore
  })

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="bg-card">
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <Card className="bg-card">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Candidate Summary */}
      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate?.avatar} alt={candidate?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  {candidate?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{candidate?.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {candidate?.email}
                </p>
                {isRecruiter && (
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {candidate?.averageScore?.toFixed(1) || 'N/A'}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Interviews</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {candidate?.totalInterviews || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardDescription>Last Interview</CardDescription>
            <CardTitle className="text-lg">
              {candidate?.lastInterviewDate ? new Date(candidate.lastInterviewDate).toLocaleDateString() : 'None'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <CardTitle>Interview History</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (8+)</SelectItem>
                  <SelectItem value="medium">Medium (6-8)</SelectItem>
                  <SelectItem value="low">Low (&lt;6)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInterviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No interviews found matching your criteria
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{interview.jobTitle}</div>
                          <div className="text-sm text-muted-foreground">{interview.company}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(interview.status)}>
                          {interview.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {interview.score ? (
                          <Badge className={`${getScoreBadgeColor(interview.score)} font-mono`}>
                            {interview.score}/10
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {interview.duration ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4" />
                            {interview.duration}m
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Dialog open={showDetailModal && selectedInterview?.id === interview.id} onOpenChange={(open) => {
                            setShowDetailModal(open)
                            if (open) setSelectedInterview(interview)
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                          
                          {interview.status === 'completed' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleReplay(interview.id)}
                                title="Replay Interview"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleExport(interview)}
                                title="Export Transcript"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-popover">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedInterview?.jobTitle} - {selectedInterview?.company}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectedInterview && handleFlag(selectedInterview)}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Flag
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectedInterview && handleExport(selectedInterview)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>
              Interview details and transcript
            </DialogDescription>
          </DialogHeader>
          
          {selectedInterview && (
            <div className="space-y-6">
              {/* Interview Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p>{new Date(selectedInterview.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant={getStatusBadgeVariant(selectedInterview.status)} className="mt-1">
                    {selectedInterview.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Score</label>
                  <p>{selectedInterview.score ? `${selectedInterview.score}/10` : 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duration</label>
                  <p>{selectedInterview.duration ? `${selectedInterview.duration} minutes` : 'N/A'}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedInterview.tags && selectedInterview.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterview.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Summary */}
              {selectedInterview.aiSummary && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">AI Summary</label>
                  <Card className="bg-accent/50">
                    <CardContent className="pt-4">
                      <p>{selectedInterview.aiSummary}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Recruiter Notes */}
              {selectedInterview.recruiterNotes && isRecruiter && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Recruiter Notes</label>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <p>{selectedInterview.recruiterNotes}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Transcript */}
              {selectedInterview.transcript && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-2">Transcript</label>
                  <Card className="bg-card">
                    <CardContent className="pt-4">
                      <div className="max-h-64 overflow-y-auto">
                        <p className="whitespace-pre-wrap font-mono text-sm">{selectedInterview.transcript}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}