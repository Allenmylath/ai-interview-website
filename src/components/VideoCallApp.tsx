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
      <div>
        {/* Header */}
        <div className="text-center">
          {/* Paragraph removed */}
        </div>
      </div>

      {/* Video and Chat Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Console */}
        <VideoConsole isConnected={isConnected} />

        {/* Chat Console */}
        <ChatConsole />
      </div>

      {/* Connection Controls */}
      <div className="flex justify-center">
        <ConnectionButton onConnectionChange={handleConnectionChange} />
      </div>
    </div>
  );
}