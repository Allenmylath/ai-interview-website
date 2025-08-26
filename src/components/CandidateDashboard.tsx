"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target, 
  Award, 
  User, 
  FileText, 
  BarChart3,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download
} from 'lucide-react';

interface CandidateDashboardProps {
  candidateId: string;
  isRecruiter?: boolean;
  className?: string;
}

interface InterviewSession {
  id: string;
  date: string;
  type: string;
  position: string;
  duration: number;
  score: number;
  status: 'completed' | 'pending' | 'cancelled';
  interviewer: string;
  feedback?: string;
  skills: { name: string; score: number }[];
}

interface PerformanceMetrics {
  averageScore: number;
  totalInterviews: number;
  improvementRate: number;
  skillsAssessed: number;
  topSkill: string;
  weakestSkill: string;
}

// Mock data
const mockInterviews: InterviewSession[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'Technical',
    position: 'Senior Frontend Developer',
    duration: 60,
    score: 85,
    status: 'completed',
    interviewer: 'John Smith',
    feedback: 'Strong technical skills, excellent problem-solving approach.',
    skills: [
      { name: 'JavaScript', score: 90 },
      { name: 'React', score: 85 },
      { name: 'Problem Solving', score: 80 }
    ]
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'Behavioral',
    position: 'Senior Frontend Developer',
    duration: 45,
    score: 78,
    status: 'completed',
    interviewer: 'Sarah Johnson',
    feedback: 'Good communication skills, needs improvement in leadership examples.',
    skills: [
      { name: 'Communication', score: 85 },
      { name: 'Teamwork', score: 75 },
      { name: 'Leadership', score: 70 }
    ]
  },
  {
    id: '3',
    date: '2024-01-05',
    type: 'System Design',
    position: 'Senior Frontend Developer',
    duration: 90,
    score: 72,
    status: 'completed',
    interviewer: 'Mike Wilson',
    feedback: 'Basic understanding of system design, room for improvement in scalability concepts.',
    skills: [
      { name: 'System Architecture', score: 70 },
      { name: 'Scalability', score: 65 },
      { name: 'Database Design', score: 80 }
    ]
  }
];

const mockMetrics: PerformanceMetrics = {
  averageScore: 78,
  totalInterviews: 3,
  improvementRate: 12,
  skillsAssessed: 9,
  topSkill: 'JavaScript',
  weakestSkill: 'Scalability'
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getScoreBadgeColor = (score: number) => {
  if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
};

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  candidateId,
  isRecruiter = false,
  className = ''
}) => {
  if (mockInterviews.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Interview History</h3>
            <p className="text-muted-foreground text-center">
              {isRecruiter 
                ? "This candidate hasn't completed any interviews yet."
                : "You haven't completed any interviews yet. Your interview history will appear here."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {isRecruiter ? 'Candidate Dashboard' : 'Interview Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            {isRecruiter 
              ? `Performance overview for candidate ${candidateId}`
              : 'Track your interview performance and progress'}
          </p>
        </div>
        {isRecruiter && (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Across {mockMetrics.totalInterviews} interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">
              {mockInterviews.filter(i => i.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockMetrics.improvementRate}%</div>
            <p className="text-xs text-muted-foreground">
              Since first interview
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Assessed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.skillsAssessed}</div>
            <p className="text-xs text-muted-foreground">
              Unique skills evaluated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Interviews */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    {isRecruiter && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">
                        {new Date(interview.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{interview.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {interview.duration}min
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getScoreBadgeColor(interview.score)}>
                          {interview.score}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(interview.status)}
                          <span className="capitalize">{interview.status}</span>
                        </div>
                      </TableCell>
                      {isRecruiter && (
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Score</span>
                  <span>{mockMetrics.averageScore}%</span>
                </div>
                <Progress value={mockMetrics.averageScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Top Skill</span>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    {mockMetrics.topSkill}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Needs Work</span>
                  <Badge variant="outline" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {mockMetrics.weakestSkill}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Latest Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {mockInterviews[0].type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {mockInterviews[0].interviewer}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {mockInterviews[0].feedback}
                </p>
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Skills Assessed:</h4>
                  <div className="space-y-2">
                    {mockInterviews[0].skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill.name}</span>
                        <Badge className={getScoreBadgeColor(skill.score)}>
                          {skill.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};