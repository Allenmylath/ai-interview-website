"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  GripVertical, 
  Sparkles, 
  Timer, 
  MessageSquare, 
  Star, 
  Flag, 
  Search,
  Settings,
  FileText,
  Keyboard,
  RefreshCw,
  AlertTriangle
} from "lucide-react"
import { toast } from "sonner"

interface Question {
  id: string
  text: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
}

interface Answer {
  id: string
  questionId: string
  text: string
  timestamp: Date
  score?: number
  tags: string[]
  feedback?: string
  flagged: boolean
}

interface InterviewSession {
  id: string
  candidateName: string
  role: string
  status: "Ready" | "Live" | "Paused" | "Completed"
  startTime?: Date
  duration: number
}

const defaultQuestions: Question[] = [
  { id: "1", text: "Tell me about yourself and your background.", difficulty: "Easy", category: "General" },
  { id: "2", text: "What interests you about this role?", difficulty: "Easy", category: "Motivation" },
  { id: "3", text: "Describe a challenging project you've worked on.", difficulty: "Medium", category: "Technical" }
]

const templates = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "support", label: "Customer Support" },
  { value: "pm", label: "Product Manager" },
  { value: "custom", label: "Custom Interview" }
]

export default function InterviewStudio() {
  const [session, setSession] = useState<InterviewSession>({
    id: "interview-1",
    candidateName: "Sarah Chen",
    role: "Frontend Engineer",
    status: "Ready",
    duration: 0
  })

  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("frontend")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [contentWarning, setContentWarning] = useState<string | null>(null)
  
  // Settings
  const [settings, setSettings] = useState({
    timePerQuestion: 10,
    allowFollowUps: true,
    recordAudio: false
  })

  const timerRef = useRef<NodeJS.Timeout>()
  const autosaveRef = useRef<NodeJS.Timeout>()

  // Timer effect
  useEffect(() => {
    if (session.status === "Live") {
      timerRef.current = setInterval(() => {
        setSession(prev => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [session.status])

  // Autosave effect
  useEffect(() => {
    if (session.status !== "Ready") {
      autosaveRef.current = setInterval(() => {
        autosave()
      }, 10000)
    }

    return () => {
      if (autosaveRef.current) {
        clearInterval(autosaveRef.current)
      }
    }
  }, [session.status, questions, answers])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault()
        handleSubmitAnswer()
      } else if (e.key === "m" && e.ctrlKey) {
        e.preventDefault()
        handleMarkForReview()
      } else if (e.key === "n" && e.ctrlKey) {
        e.preventDefault()
        handleNextQuestion()
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentAnswer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startInterview = async () => {
    try {
      setSession(prev => ({ 
        ...prev, 
        status: "Live", 
        startTime: new Date() 
      }))
      
      // Make API call to start interview
      const response = await fetch("/api/interviews/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: session.candidateName,
          role: session.role,
          template: selectedTemplate,
          questions: questions.map(q => q.id)
        })
      })

      if (!response.ok) throw new Error("Failed to start interview")
      
      toast.success("Interview started successfully")
    } catch (error) {
      toast.error("Failed to start interview. Please try again.")
      setSession(prev => ({ ...prev, status: "Ready" }))
    }
  }

  const pauseInterview = () => {
    setSession(prev => ({ 
      ...prev, 
      status: prev.status === "Live" ? "Paused" : "Live" 
    }))
  }

  const endInterview = async () => {
    try {
      setSession(prev => ({ ...prev, status: "Completed" }))
      
      const response = await fetch("/api/interviews/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          answers,
          duration: session.duration
        })
      })

      if (!response.ok) throw new Error("Failed to end interview")
      
      toast.success("Interview completed and saved")
    } catch (error) {
      toast.error("Failed to save interview. Please try again.")
    }
  }

  const generateAIQuestion = async () => {
    setIsGeneratingQuestion(true)
    
    try {
      const response = await fetch("/api/interviews/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          previousAnswers: answers,
          currentContext: questions[currentQuestionIndex]
        })
      })

      if (!response.ok) throw new Error("Failed to generate question")
      
      const data = await response.json()
      const newQuestion: Question = {
        id: `generated-${Date.now()}`,
        text: data.question,
        difficulty: data.difficulty || "Medium",
        category: data.category || "Generated"
      }

      setQuestions(prev => [...prev, newQuestion])
      toast.success("AI question generated")
    } catch (error) {
      toast.error("Failed to generate question. Please try again.")
    } finally {
      setIsGeneratingQuestion(false)
    }
  }

  const checkContentSafety = (text: string): string | null => {
    const warnings = []
    
    // Simple PII checks
    if (/\b\d{3}-\d{2}-\d{4}\b/.test(text)) warnings.push("SSN detected")
    if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text)) warnings.push("Email detected")
    if (/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/.test(text)) warnings.push("Credit card number detected")
    
    return warnings.length > 0 ? warnings.join(", ") : null
  }

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) return

    const warning = checkContentSafety(currentAnswer)
    if (warning && !contentWarning) {
      setContentWarning(warning)
      return
    }

    try {
      const newAnswer: Answer = {
        id: `answer-${Date.now()}`,
        questionId: questions[currentQuestionIndex]?.id || "",
        text: currentAnswer,
        timestamp: new Date(),
        tags: [],
        flagged: false
      }

      setAnswers(prev => [...prev, newAnswer])
      setCurrentAnswer("")
      setContentWarning(null)

      // Send to AI for scoring
      const response = await fetch("/api/interviews/score-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questions[currentQuestionIndex]?.text,
          answer: currentAnswer,
          role: session.role
        })
      })

      if (response.ok) {
        const scoreData = await response.json()
        setAnswers(prev => prev.map(a => 
          a.id === newAnswer.id 
            ? { ...a, score: scoreData.score, feedback: scoreData.feedback }
            : a
        ))
      }

      toast.success("Answer submitted")
    } catch (error) {
      toast.error("Failed to submit answer")
    }
  }

  const handleMarkForReview = () => {
    if (answers.length === 0) return
    
    const lastAnswer = answers[answers.length - 1]
    setAnswers(prev => prev.map(a => 
      a.id === lastAnswer.id 
        ? { ...a, flagged: !a.flagged }
        : a
    ))
    
    toast.success(lastAnswer.flagged ? "Removed review flag" : "Marked for review")
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const autosave = async () => {
    try {
      await fetch("/api/interviews/autosave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          questions,
          answers,
          duration: session.duration
        })
      })
    } catch (error) {
      console.error("Autosave failed:", error)
    }
  }

  const exportInterview = async (format: "json" | "md" | "txt") => {
    try {
      const response = await fetch("/api/interviews/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          format,
          questions,
          answers,
          session
        })
      })

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `interview-${session.candidateName}-${format}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Interview exported as ${format.toUpperCase()}`)
      setShowExportDialog(false)
    } catch (error) {
      toast.error("Failed to export interview")
    }
  }

  const retryLastAction = () => {
    toast.info("Retrying last action...")
    // Implementation depends on what the last failed action was
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-display font-semibold">Interview Studio</h1>
          <Badge variant="outline" className="bg-accent">
            {session.candidateName} · {session.role}
          </Badge>
          <Badge 
            variant={session.status === "Live" ? "default" : "secondary"}
            className={session.status === "Live" ? "bg-success text-white" : ""}
          >
            {session.status}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            {formatTime(session.duration)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session.status === "Ready" && (
            <Button onClick={startInterview} className="bg-success hover:bg-success/90">
              <Play className="h-4 w-4 mr-2" />
              Start Interview
            </Button>
          )}
          
          {session.status === "Live" && (
            <>
              <Button variant="outline" onClick={pauseInterview}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="destructive" onClick={endInterview}>
                <Square className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            </>
          )}

          {session.status === "Paused" && (
            <>
              <Button onClick={pauseInterview} className="bg-success hover:bg-success/90">
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
              <Button variant="destructive" onClick={endInterview}>
                <Square className="h-4 w-4 mr-2" />
                End Interview
              </Button>
            </>
          )}

          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose the format for your interview export:
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => exportInterview("json")} variant="outline">
                    JSON
                  </Button>
                  <Button onClick={() => exportInterview("md")} variant="outline">
                    Markdown
                  </Button>
                  <Button onClick={() => exportInterview("txt")} variant="outline">
                    Text
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Keyboard className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Keyboard Shortcuts</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Submit Answer</span>
                  <Badge variant="outline">Ctrl + Enter</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Mark for Review</span>
                  <Badge variant="outline">Ctrl + M</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Next Question</span>
                  <Badge variant="outline">Ctrl + N</Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Column - Config & Questions */}
        <div className="w-1/3 border-r bg-card p-6 space-y-6 overflow-y-auto">
          {/* Template Selector */}
          <div className="space-y-2">
            <Label>Interview Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Questions Queue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Questions Queue</Label>
              <Button 
                onClick={generateAIQuestion}
                disabled={isGeneratingQuestion}
                size="sm"
                variant="outline"
              >
                {isGeneratingQuestion ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                AI Suggest
              </Button>
            </div>

            <div className="space-y-2">
              {questions.map((question, index) => (
                <Card 
                  key={question.id} 
                  className={`p-3 cursor-pointer transition-colors ${
                    index === currentQuestionIndex ? "bg-accent" : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium">{question.text}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={
                            question.difficulty === "Hard" ? "border-red-200 text-red-700" :
                            question.difficulty === "Medium" ? "border-yellow-200 text-yellow-700" :
                            "border-green-200 text-green-700"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{question.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {/* Settings */}
          <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Interview Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Interview Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Time per Question (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.timePerQuestion}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      timePerQuestion: parseInt(e.target.value) || 10 
                    }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.allowFollowUps}
                    onCheckedChange={(checked) => setSettings(prev => ({ 
                      ...prev, 
                      allowFollowUps: checked 
                    }))}
                  />
                  <Label>Allow follow-up questions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.recordAudio}
                    onCheckedChange={(checked) => setSettings(prev => ({ 
                      ...prev, 
                      recordAudio: checked 
                    }))}
                  />
                  <Label>Record audio</Label>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Column - Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Conversation View */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {questions[currentQuestionIndex] && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">AI Interviewer</p>
                      <p>{questions[currentQuestionIndex].text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {answers
              .filter(answer => answer.questionId === questions[currentQuestionIndex]?.id)
              .map(answer => (
                <div key={answer.id} className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {session.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{session.candidateName}</p>
                          <p className="whitespace-pre-wrap">{answer.text}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{answer.timestamp.toLocaleTimeString()}</span>
                            {answer.flagged && <Flag className="h-3 w-3 text-yellow-500" />}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Scoring Panel */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Score:</Label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Button
                                key={star}
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => {
                                  setAnswers(prev => prev.map(a => 
                                    a.id === answer.id ? { ...a, score: star } : a
                                  ))
                                }}
                              >
                                <Star 
                                  className={`h-4 w-4 ${
                                    (answer.score || 0) >= star 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-muted-foreground"
                                  }`} 
                                />
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Add feedback or tags..."
                            value={answer.feedback || ""}
                            onChange={(e) => {
                              setAnswers(prev => prev.map(a => 
                                a.id === answer.id ? { ...a, feedback: e.target.value } : a
                              ))
                            }}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>

          {/* Answer Input */}
          <div className="border-t p-6 space-y-4">
            {contentWarning && (
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-destructive">Content Warning</p>
                      <p className="text-sm text-muted-foreground mt-1">{contentWarning}</p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => {
                            setContentWarning(null)
                            handleSubmitAnswer()
                          }}
                        >
                          Confirm Send
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setContentWarning(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Textarea
                placeholder="Type your answer here..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="min-h-[100px] resize-none"
                disabled={session.status !== "Live"}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!currentAnswer.trim() || session.status !== "Live"}
                  >
                    Submit Answer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleMarkForReview}
                    disabled={answers.length === 0}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Mark for Review
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Ctrl+Enter to submit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-8"
            />
          </div>
          <Button variant="outline" size="sm" onClick={retryLastAction}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Create Job Report
          </Button>
          <span className="text-xs text-muted-foreground">
            Last saved: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  )
}