"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Settings, 
  SkipForward, 
  Clock, 
  User, 
  Bot,
  CheckCircle,
  Circle,
  Volume2,
  Loader2,
  ArrowRight,
  Home
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  expectedDuration: number;
}

interface InterviewState {
  phase: 'setup' | 'interview' | 'complete';
  currentQuestionIndex: number;
  isRecording: boolean;
  isPaused: boolean;
  micEnabled: boolean;
  cameraEnabled: boolean;
  duration: number;
  responses: string[];
  aiProcessing: boolean;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your background in software development.",
    category: "Introduction",
    expectedDuration: 120
  },
  {
    id: 2,
    text: "Describe a challenging project you worked on and how you overcame the obstacles.",
    category: "Experience",
    expectedDuration: 180
  },
  {
    id: 3,
    text: "How do you stay updated with the latest technology trends and frameworks?",
    category: "Learning",
    expectedDuration: 90
  },
  {
    id: 4,
    text: "Walk me through your approach to debugging a complex issue in production.",
    category: "Technical",
    expectedDuration: 150
  },
  {
    id: 5,
    text: "Where do you see yourself in your career five years from now?",
    category: "Goals",
    expectedDuration: 120
  }
];

const mockAIResponses = [
  "That's a great background! I can see you have solid experience in full-stack development.",
  "Excellent problem-solving approach. Your systematic methodology is impressive.",
  "I appreciate your commitment to continuous learning. That's crucial in our field.",
  "Your debugging process shows strong analytical thinking. Very thorough approach.",
  "Your career goals align well with growth opportunities in our organization."
];

export const MockInterviewPage = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    phase: 'setup',
    currentQuestionIndex: 0,
    isRecording: false,
    isPaused: false,
    micEnabled: true,
    cameraEnabled: true,
    duration: 0,
    responses: [],
    aiProcessing: false
  });

  const [currentTranscript, setCurrentTranscript] = useState('');
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timer effect
  useEffect(() => {
    if (interviewState.isRecording && !interviewState.isPaused) {
      intervalRef.current = setInterval(() => {
        setInterviewState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interviewState.isRecording, interviewState.isPaused]);

  // Mock webcam access
  useEffect(() => {
    if (interviewState.cameraEnabled && videoRef.current) {
      // Simulate camera access
      videoRef.current.srcObject = null;
    }
  }, [interviewState.cameraEnabled]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      phase: 'interview',
      isRecording: true
    }));
  }, []);

  const toggleRecording = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isRecording: !prev.isRecording
    }));
  }, []);

  const togglePause = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  const toggleMic = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      micEnabled: !prev.micEnabled
    }));
  }, []);

  const toggleCamera = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      cameraEnabled: !prev.cameraEnabled
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (interviewState.currentQuestionIndex < mockQuestions.length - 1) {
      setInterviewState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        aiProcessing: true
      }));

      // Simulate AI processing
      setTimeout(() => {
        setShowAIFeedback(true);
        setInterviewState(prev => ({
          ...prev,
          aiProcessing: false
        }));

        // Hide feedback after 3 seconds
        setTimeout(() => {
          setShowAIFeedback(false);
        }, 3000);
      }, 2000);
    } else {
      endInterview();
    }
  }, [interviewState.currentQuestionIndex]);

  const endInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      phase: 'complete',
      isRecording: false
    }));
  }, []);

  const resetInterview = useCallback(() => {
    setInterviewState({
      phase: 'setup',
      currentQuestionIndex: 0,
      isRecording: false,
      isPaused: false,
      micEnabled: true,
      cameraEnabled: true,
      duration: 0,
      responses: [],
      aiProcessing: false
    });
    setCurrentTranscript('');
    setShowAIFeedback(false);
  }, []);

  const currentQuestion = mockQuestions[interviewState.currentQuestionIndex];
  const progress = ((interviewState.currentQuestionIndex + 1) / mockQuestions.length) * 100;

  if (interviewState.phase === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Mock Interview</h1>
            <p className="text-gray-600">Practice your interview skills with our AI interviewer</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Interview Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{mockQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Duration:</span>
                  <span className="font-medium">15-20 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Video Interview</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Camera & Microphone Check</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={toggleCamera}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    interviewState.cameraEnabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {interviewState.cameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span>Camera</span>
                </button>
                <button
                  onClick={toggleMic}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    interviewState.micEnabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {interviewState.micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>Microphone</span>
                </button>
              </div>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Camera preview will appear here</p>
                </div>
              </div>
            </div>

            <button
              onClick={startInterview}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Interview</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (interviewState.phase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h1>
            <p className="text-gray-600">Great job! Here's a summary of your interview performance.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Interview Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-medium">{formatTime(interviewState.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered:</span>
                  <span className="font-medium">{mockQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Response Time:</span>
                  <span className="font-medium">{Math.round(interviewState.duration / mockQuestions.length)}s</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Clear and confident communication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Good eye contact and posture</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Structured responses with examples</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetInterview}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Practice Again
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl p-4 mb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white font-mono text-lg">{formatTime(interviewState.duration)}</span>
              </div>
              <div className="text-white/70">
                Question {interviewState.currentQuestionIndex + 1} of {mockQuestions.length}
              </div>
            </div>
            <button
              onClick={endInterview}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              End Interview
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Interview Interface */}
        <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Video Area */}
            <div className="lg:col-span-2 bg-gray-900 relative">
              <div className="grid grid-rows-2 h-full">
                {/* AI Interviewer */}
                <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/90">AI Interviewer</p>
                    {interviewState.aiProcessing && (
                      <div className="mt-2 flex items-center justify-center space-x-2">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span className="text-white/70 text-sm">Processing response...</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 bg-black/20 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white text-sm">AI Online</span>
                    </div>
                  </div>
                </div>

                {/* User Video */}
                <div className="relative bg-gray-800 flex items-center justify-center">
                  {interviewState.cameraEnabled ? (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/70">
                          <User className="w-12 h-12 mx-auto mb-2" />
                          <p>Your video feed</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-white/70">
                      <VideoOff className="w-12 h-12 mx-auto mb-2" />
                      <p>Camera disabled</p>
                    </div>
                  )}
                  
                  {/* Recording Indicator */}
                  {interviewState.isRecording && !interviewState.isPaused && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-2 bg-red-600 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm">REC</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={toggleMic}
                    className={`p-3 rounded-full transition-colors ${
                      interviewState.micEnabled
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {interviewState.micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={toggleCamera}
                    className={`p-3 rounded-full transition-colors ${
                      interviewState.cameraEnabled
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {interviewState.cameraEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={toggleRecording}
                    className={`p-3 rounded-full transition-colors ${
                      interviewState.isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {interviewState.isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Question & Controls Panel */}
            <div className="bg-gray-50 p-6 flex flex-col">
              {/* Current Question */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    {currentQuestion.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {currentQuestion.text}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Suggested time: {currentQuestion.expectedDuration}s
                </p>
              </div>

              {/* AI Feedback */}
              {showAIFeedback && (
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">AI Feedback</p>
                      <p className="text-sm text-blue-800 mt-1">
                        {mockAIResponses[interviewState.currentQuestionIndex]}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcription */}
              <div className="mb-6 flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Live Transcription</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4 h-32 overflow-y-auto">
                  {interviewState.isRecording ? (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Listening for your response...</span>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Start recording to see transcription</p>
                  )}
                </div>
              </div>

              {/* Question Navigation */}
              <div className="space-y-3">
                <button
                  onClick={nextQuestion}
                  disabled={interviewState.aiProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {interviewState.aiProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : interviewState.currentQuestionIndex === mockQuestions.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Complete Interview</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4" />
                      <span>Next Question</span>
                    </>
                  )}
                </button>

                {/* Question Progress */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Progress</span>
                  <span>{interviewState.currentQuestionIndex + 1}/{mockQuestions.length}</span>
                </div>
                <div className="flex space-x-1">
                  {mockQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-2 rounded ${
                        index <= interviewState.currentQuestionIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MockInterviewPageWrapper() {
  return <MockInterviewPage />;
}