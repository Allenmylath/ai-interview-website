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

      {/* Video Console */}
      <VideoConsole />

      {/* Chat Console */}
      <ChatConsole />

      {/* Connection Controls */}
      <div className="flex justify-center">
        <ConnectionButton />
      </div>
    </div>
  );
}