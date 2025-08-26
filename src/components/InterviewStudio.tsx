"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Settings,
  User,
  Briefcase
} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  timeLimit: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface InterviewState {
  isActive: boolean;
  isPaused: boolean;
  isRecording: boolean;
  currentQuestionIndex: number;
  timeRemaining: number;
  totalTime: number;
  videoEnabled: boolean;
  audioEnabled: boolean;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    category: "Behavioral",
    question: "Tell me about yourself and your background.",
    timeLimit: 120,
    difficulty: "Easy"
  },
  {
    id: 2,
    category: "Technical",
    question: "Explain the difference between let, const, and var in JavaScript.",
    timeLimit: 180,
    difficulty: "Medium"
  },
  {
    id: 3,
    category: "Problem Solving",
    question: "How would you approach debugging a performance issue in a web application?",
    timeLimit: 240,
    difficulty: "Hard"
  },
  {
    id: 4,
    category: "Behavioral",
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    timeLimit: 200,
    difficulty: "Medium"
  },
  {
    id: 5,
    category: "Technical",
    question: "What are React hooks and how do they improve functional components?",
    timeLimit: 180,
    difficulty: "Medium"
  }
];

export const InterviewStudio: React.FC = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    isActive: false,
    isPaused: false,
    isRecording: false,
    currentQuestionIndex: 0,
    timeRemaining: mockQuestions[0]?.timeLimit || 120,
    totalTime: 0,
    videoEnabled: true,
    audioEnabled: true
  });

  const timerRef = useRef<NodeJS.Timeout>();
  const totalTimerRef = useRef<NodeJS.Timeout>();

  const currentQuestion = mockQuestions[interviewState.currentQuestionIndex];
  const progress = ((interviewState.currentQuestionIndex + 1) / mockQuestions.length) * 100;

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const startInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      isRecording: true,
      timeRemaining: currentQuestion.timeLimit
    }));
  }, [currentQuestion.timeLimit]);

  const pauseInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  const stopInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      isRecording: false,
      timeRemaining: currentQuestion.timeLimit,
      totalTime: 0
    }));
    if (timerRef.current) clearInterval(timerRef.current);
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);
  }, [currentQuestion.timeLimit]);

  const nextQuestion = useCallback(() => {
    if (interviewState.currentQuestionIndex < mockQuestions.length - 1) {
      const nextIndex = interviewState.currentQuestionIndex + 1;
      setInterviewState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: mockQuestions[nextIndex].timeLimit,
        isPaused: false
      }));
    }
  }, [interviewState.currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (interviewState.currentQuestionIndex > 0) {
      const prevIndex = interviewState.currentQuestionIndex - 1;
      setInterviewState(prev => ({
        ...prev,
        currentQuestionIndex: prevIndex,
        timeRemaining: mockQuestions[prevIndex].timeLimit,
        isPaused: false
      }));
    }
  }, [interviewState.currentQuestionIndex]);

  const toggleVideo = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      videoEnabled: !prev.videoEnabled
    }));
  }, []);

  const toggleAudio = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      audioEnabled: !prev.audioEnabled
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      timeRemaining: currentQuestion.timeLimit
    }));
  }, [currentQuestion.timeLimit]);

  useEffect(() => {
    if (interviewState.isActive && !interviewState.isPaused) {
      timerRef.current = setInterval(() => {
        setInterviewState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);

      totalTimerRef.current = setInterval(() => {
        setInterviewState(prev => ({
          ...prev,
          totalTime: prev.totalTime + 1
        }));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [interviewState.isActive, interviewState.isPaused]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTimeRemainingColor = () => {
    if (interviewState.timeRemaining <= 30) return 'text-red-500';
    if (interviewState.timeRemaining <= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Interview Studio</CardTitle>
                  <p className="text-muted-foreground">Practice your interview skills</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                  {interviewState.videoEnabled ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <User className="h-24 w-24 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Camera Feed</p>
                        <p className="text-sm opacity-75">Your video will appear here</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <VideoOff className="h-24 w-24 mx-auto mb-4" />
                        <p className="text-lg font-medium">Camera Off</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Recording Indicator */}
                  {interviewState.isRecording && (
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm font-medium">REC</span>
                    </div>
                  )}

                  {/* Status Indicators */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <div className={`p-2 rounded-full ${interviewState.audioEnabled ? 'bg-green-500' : 'bg-red-500'}`}>
                      {interviewState.audioEnabled ? (
                        <Mic className="h-4 w-4 text-white" />
                      ) : (
                        <MicOff className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`p-2 rounded-full ${interviewState.videoEnabled ? 'bg-green-500' : 'bg-red-500'}`}>
                      {interviewState.videoEnabled ? (
                        <Video className="h-4 w-4 text-white" />
                      ) : (
                        <VideoOff className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                  {!interviewState.isActive ? (
                    <Button 
                      onClick={startInterview}
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Interview
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={pauseInterview}
                        variant="outline" 
                        size="lg"
                      >
                        {interviewState.isPaused ? (
                          <><Play className="h-5 w-5 mr-2" />Resume</>
                        ) : (
                          <><Pause className="h-5 w-5 mr-2" />Pause</>
                        )}
                      </Button>
                      <Button 
                        onClick={stopInterview}
                        variant="destructive" 
                        size="lg"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        Stop
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    onClick={toggleAudio}
                    variant={interviewState.audioEnabled ? "default" : "destructive"}
                    size="lg"
                  >
                    {interviewState.audioEnabled ? (
                      <Mic className="h-5 w-5" />
                    ) : (
                      <MicOff className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button 
                    onClick={toggleVideo}
                    variant={interviewState.videoEnabled ? "default" : "destructive"}
                    size="lg"
                  >
                    {interviewState.videoEnabled ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <VideoOff className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Panel */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Interview Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {interviewState.currentQuestionIndex + 1} of {mockQuestions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(interviewState.totalTime)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Time</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getTimeRemainingColor()}`}>
                      {formatTime(interviewState.timeRemaining)}
                    </div>
                    <div className="text-xs text-muted-foreground">Time Left</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Current Question</CardTitle>
                  <Button 
                    onClick={resetTimer}
                    variant="outline" 
                    size="sm"
                    disabled={!interviewState.isActive}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {currentQuestion.category}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(currentQuestion.timeLimit)} suggested
                  </div>
                </div>

                {/* Question Navigation */}
                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={previousQuestion}
                    variant="outline" 
                    size="sm"
                    disabled={interviewState.currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    onClick={nextQuestion}
                    variant="outline" 
                    size="sm"
                    disabled={interviewState.currentQuestionIndex === mockQuestions.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Question List */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">All Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockQuestions.map((question, index) => (
                    <div 
                      key={question.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        index === interviewState.currentQuestionIndex 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => {
                        setInterviewState(prev => ({
                          ...prev,
                          currentQuestionIndex: index,
                          timeRemaining: question.timeLimit
                        }));
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">
                              Q{index + 1}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {question.category}
                            </Badge>
                          </div>
                          <p className="text-sm truncate">{question.question}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};