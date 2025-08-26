"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Trophy, TrendingUp, Play, Calendar as CalendarIcon, Code, MessageSquare, Network, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { CandidateDashboard } from '@/components/CandidateDashboard';

interface CompletedInterview {
  id: string;
  type: string;
  date: string;
  score: number;
  feedback: string;
  duration: string;
  interviewer: string;
}

interface UpcomingInterview {
  id: string;
  type: string;
  date: string;
  time: string;
  interviewer: string;
  status: 'scheduled' | 'confirmed' | 'pending';
}

interface PracticeCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionsCount: number;
  averageTime: string;
}

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export default function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInterviewType, setSelectedInterviewType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Mock data for completed interviews
  const completedInterviews: CompletedInterview[] = [
    {
      id: '1',
      type: 'Technical',
      date: '2024-01-15',
      score: 85,
      feedback: 'Strong problem-solving skills, good code structure',
      duration: '45 min',
      interviewer: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'Behavioral',
      date: '2024-01-10',
      score: 92,
      feedback: 'Excellent communication and leadership examples',
      duration: '30 min',
      interviewer: 'Mike Chen'
    },
    {
      id: '3',
      type: 'System Design',
      date: '2024-01-05',
      score: 78,
      feedback: 'Good scalability considerations, needs work on database design',
      duration: '60 min',
      interviewer: 'Alex Rodriguez'
    }
  ];

  // Mock data for upcoming interviews
  const upcomingInterviews: UpcomingInterview[] = [
    {
      id: '1',
      type: 'Technical',
      date: '2024-01-25',
      time: '2:00 PM',
      interviewer: 'David Kim',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'Behavioral',
      date: '2024-01-28',
      time: '10:00 AM',
      interviewer: 'Lisa Wang',
      status: 'scheduled'
    },
    {
      id: '3',
      type: 'Final Round',
      date: '2024-02-02',
      time: '3:30 PM',
      interviewer: 'Tom Wilson',
      status: 'pending'
    }
  ];

  // Mock data for practice categories
  const practiceCategories: PracticeCategory[] = [
    {
      id: '1',
      name: 'Technical Coding',
      description: 'Algorithm and data structure problems',
      icon: Code,
      difficulty: 'intermediate',
      questionsCount: 250,
      averageTime: '45 min'
    },
    {
      id: '2',
      name: 'Behavioral',
      description: 'Situational and competency-based questions',
      icon: MessageSquare,
      difficulty: 'beginner',
      questionsCount: 120,
      averageTime: '30 min'
    },
    {
      id: '3',
      name: 'System Design',
      description: 'Architecture and scalability challenges',
      icon: Network,
      difficulty: 'advanced',
      questionsCount: 80,
      averageTime: '60 min'
    }
  ];

  // Mock data for available time slots
  const availableTimeSlots: TimeSlot[] = [
    { id: '1', date: '2024-01-30', time: '9:00 AM', available: true },
    { id: '2', date: '2024-01-30', time: '11:00 AM', available: true },
    { id: '3', date: '2024-01-30', time: '2:00 PM', available: false },
    { id: '4', date: '2024-01-31', time: '10:00 AM', available: true },
    { id: '5', date: '2024-01-31', time: '1:00 PM', available: true },
    { id: '6', date: '2024-01-31', time: '4:00 PM', available: true }
  ];

  // Calculate stats
  const totalInterviews = completedInterviews.length;
  const averageScore = Math.round(completedInterviews.reduce((sum, interview) => sum + interview.score, 0) / totalInterviews);
  const upcomingCount = upcomingInterviews.length;
  const practiceSessionsCount = 24; // Mock count

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Advanced</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Track your interview progress and continue practicing
              </p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
              <Button variant="outline">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInterviews}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">
                Next: Jan 25, 2:00 PM
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{practiceSessionsCount}</div>
              <p className="text-xs text-muted-foreground">
                +8 this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Interviews</CardTitle>
                  <CardDescription>Your latest completed sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedInterviews.slice(0, 3).map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{interview.type}</div>
                          <div className="text-sm text-gray-600">{interview.date}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{interview.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Interviews</CardTitle>
                  <CardDescription>Your scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingInterviews.slice(0, 3).map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{interview.type}</div>
                          <div className="text-sm text-gray-600">{interview.date} at {interview.time}</div>
                        </div>
                        {getStatusBadge(interview.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Interviews</CardTitle>
                <CardDescription>Review your past interview performance</CardDescription>
              </CardHeader>
              <CardContent>
                <CandidateDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Manage your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Interviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInterviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.type}</TableCell>
                        <TableCell>{interview.date}</TableCell>
                        <TableCell>{interview.time}</TableCell>
                        <TableCell>{interview.interviewer}</TableCell>
                        <TableCell>{getStatusBadge(interview.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm" variant="destructive">Cancel</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Interviews</CardTitle>
                  <CardDescription>Improve your skills with mock interviews</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {practiceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                          {getDifficultyBadge(category.difficulty)}
                        </div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Questions:</span>
                            <span>{category.questionsCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg. Time:</span>
                            <span>{category.averageTime}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Start Practice
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Interview</CardTitle>
                <CardDescription>Book your next interview session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interview Type</label>
                    <Select value={selectedInterviewType} onValueChange={setSelectedInterviewType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Interview</SelectItem>
                        <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                        <SelectItem value="system-design">System Design</SelectItem>
                        <SelectItem value="final-round">Final Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-01-30">January 30, 2024</SelectItem>
                        <SelectItem value="2024-01-31">January 31, 2024</SelectItem>
                        <SelectItem value="2024-02-01">February 1, 2024</SelectItem>
                        <SelectItem value="2024-02-02">February 2, 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Available Time Slots</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableTimeSlots
                        .filter(slot => slot.date === selectedDate)
                        .map((slot) => (
                          <Button
                            key={slot.id}
                            variant={slot.available ? "outline" : "secondary"}
                            disabled={!slot.available}
                            className="p-3"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {slot.time}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button size="lg" className="w-full md:w-auto">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Book Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}