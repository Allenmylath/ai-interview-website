"use client";

import React, { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, User, Bot, Wifi, WifiOff, Circle } from 'lucide-react';

export const VideoCallApp = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('Connected');
      setIsRecording(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Status Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-yellow-400'}`}>
              {connectionStatus}
            </span>
          </div>
          {isRecording && (
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span className="text-sm text-red-400 font-medium">Recording</span>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-400">
          Mock Interview Session
        </div>
      </div>

      {/* Video Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Interviewer Panel */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 bg-opacity-80 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Interviewer</h3>
                <p className="text-purple-200 text-sm">Sarah - Senior Tech Recruiter</p>
              </div>
            </div>
            
            {/* Mock AI Avatar */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <Bot className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="px-4 py-2 bg-black bg-opacity-40 rounded-full">
                <span className="text-white text-sm">Speaking...</span>
              </div>
            </div>
          </div>
          
          {/* Speaking indicator animation */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* User Camera Panel */}
        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          {isVideoOn ? (
            <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Mock camera feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-30"></div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 bg-opacity-80 rounded-full">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">You</h3>
                    <p className="text-blue-200 text-sm">Candidate</p>
                  </div>
                </div>
                
                {/* Mock user avatar */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                    <User className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-800">
              <div className="p-4 bg-gray-700 rounded-full mb-4">
                <VideoOff className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 font-medium">Camera is off</p>
              <p className="text-gray-500 text-sm mt-2">Turn on your camera to continue</p>
            </div>
          )}
          
          {/* Audio indicator */}
          {!isAudioOn && (
            <div className="absolute top-4 right-4 p-2 bg-red-600 bg-opacity-90 rounded-full">
              <MicOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 bg-gray-900 rounded-full px-6 py-4 border border-gray-800 shadow-xl">
          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-all duration-200 ${
              isVideoOn
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25'
            }`}
          >
            {isVideoOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
          </button>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full transition-all duration-200 ${
              isAudioOn
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25'
            }`}
          >
            {isAudioOn ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
          </button>

          {/* End Call Button */}
          <button className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-red-500/25 ml-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.707 14.293a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zM5.121 12.879a3 3 0 004.242 0l.707-.707a1 1 0 011.414 1.414l-.707.707a5 5 0 01-7.07 0l-.707-.707a1 1 0 011.414-1.414l.707.707zM12 8a4 4 0 11-8 0 4 4 0 018 0zM8 10a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Interview Progress */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-white font-medium">Interview Progress</h4>
            <p className="text-gray-400 text-sm">Question 3 of 8 • Technical Round</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              Duration: <span className="text-white font-mono">12:34</span>
            </div>
            <div className="w-32 bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};