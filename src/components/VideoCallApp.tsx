"use client";

import { useState } from "react";
import { VideoConsole } from "./VideoConsole";
import { ChatConsole } from "./ChatConsole";
import { ConnectionButton } from "./ConnectionButton";

export function VideoCallApp() {
  const [isConnected, setIsConnected] = useState(false);
  
  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Jessica AI Video Bot
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Section */}
        <div className="flex flex-col gap-4 lg:flex-1">
          <VideoConsole isConnected={isConnected} />
          
          {/* Connection Controls */}
          <div className="flex justify-center py-4">
            <ConnectionButton onConnectionChange={handleConnectionChange} />
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:w-96">
          <ChatConsole isConnected={isConnected} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Click connect to start your AI-powered video call experience</p>
      </div>
    </div>
  );
}