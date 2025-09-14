"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Header } from "@/components/header"
import {
  BookOpen, Video, Headphones, Heart, Search, Clock, User, Play, Star, Filter,
  Brain, Zap, Moon, Target, Palette, Download, Volume2, VolumeX, Pause, RotateCcw,
  Circle, Square, Minus, Type, Eraser
} from "lucide-react"
import Link from "next/link"

// Drawing Canvas Component
function DrawingPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen')
  const [currentColor, setCurrentColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState([5])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 400
    
    // Set default styles
    context.lineCap = 'round'
    context.lineJoin = 'round'
  }, [])

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentTool === 'eraser') {
      context.globalCompositeOperation = 'destination-out'
    } else {
      context.globalCompositeOperation = 'source-over'
      context.strokeStyle = currentColor
    }
    
    context.lineWidth = brushSize[0]
    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'my-drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Creative Drawing Pad
        </CardTitle>
        <CardDescription>
          Express yourself through art. Drawing can be therapeutic and help process emotions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drawing Tools */}
        <div className="flex items-center gap-4 p-2 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Button
              variant={currentTool === 'pen' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('pen')}
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === 'eraser' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentTool('eraser')}
            >
              <Eraser className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Color:</span>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-8 h-8 rounded border"
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm">Size:</span>
            <Slider
              value={brushSize}
              onValueChange={setBrushSize}
              max={20}
              min={1}
              step={1}
              className="w-20"
            />
            <span className="text-sm">{brushSize[0]}px</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={saveDrawing}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair w-full h-64"
            style={{ maxWidth: '100%', height: '300px' }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          💡 Tip: Try drawing your feelings, doodling patterns, or creating something that brings you joy.
        </p>
      </CardContent>
    </Card>
  )
}

// Calming Sounds Component
function CalmingSounds() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState([50])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const sounds = [
    { id: '1', name: 'Rain Sounds', description: 'Gentle rainfall', icon: '🌧️', duration: '10:00' },
    { id: '2', name: 'Ocean Waves', description: 'Peaceful ocean waves', icon: '🌊', duration: '15:00' },
    { id: '3', name: 'Forest Birds', description: 'Nature sounds with birds', icon: '🌲', duration: '12:00' },
    { id: '4', name: 'White Noise', description: 'Soothing white noise', icon: '⚪', duration: '∞' },
    { id: '5', name: 'Meditation Bell', description: 'Tibetan singing bowls', icon: '🔔', duration: '8:00' },
    { id: '6', name: 'Wind Chimes', description: 'Gentle wind chimes', icon: '🎐', duration: '20:00' },
    { id: '7', name: 'Crackling Fire', description: 'Cozy fireplace sounds', icon: '🔥', duration: '25:00' },
    { id: '8', name: 'Night Crickets', description: 'Peaceful night sounds', icon: '🦗', duration: '30:00' },
  ]

  const playSound = (soundId: string) => {
    // In a real implementation, you would load actual audio files
    if (currentlyPlaying === soundId) {
      setCurrentlyPlaying(null)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      setCurrentlyPlaying(soundId)
      // Here you would load and play the actual audio file
      console.log(`Playing sound: ${soundId}`)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-5 w-5" />
          Calming Background Sounds
        </CardTitle>
        <CardDescription>
          Listen to relaxing sounds to reduce stress and improve focus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Volume Control */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            min={0}
            step={1}
            className="flex-1"
          />
          <span className="text-sm w-10">{volume[0]}%</span>
        </div>

        {/* Sound Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sounds.map((sound) => (
            <Card 
              key={sound.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                currentlyPlaying === sound.id ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => playSound(sound.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{sound.icon}</div>
                <h4 className="font-medium text-sm mb-1">{sound.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{sound.description}</p>
                <div className="flex items-center justify-center gap-1">
                  {currentlyPlaying === sound.id ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  <span className="text-xs">{sound.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <audio ref={audioRef} loop />
        
        <p className="text-sm text-muted-foreground">
          🎧 Best experienced with headphones. Use these sounds during study, meditation, or relaxation.
        </p>
      </CardContent>
    </Card>
  )
}

// Exercise GIFs Component
function ExerciseGuides() {
  const exercises = [
    {
      id: '1',
      name: 'Deep Breathing',
      description: '4-7-8 breathing technique for anxiety relief',
      duration: '5 min',
      difficulty: 'Beginner',
      category: 'Breathing',
      steps: [
        'Sit comfortably with your back straight',
        'Exhale completely through your mouth',
        'Inhale through nose for 4 counts',
        'Hold breath for 7 counts',
        'Exhale through mouth for 8 counts',
        'Repeat 3-4 times'
      ]
    },
    {
      id: '2',
      name: 'Progressive Muscle Relaxation',
      description: 'Tense and release muscle groups to reduce stress',
      duration: '10 min',
      difficulty: 'Beginner',
      category: 'Relaxation',
      steps: [
        'Lie down in a comfortable position',
        'Start with your toes - tense for 5 seconds',
        'Release and relax for 10 seconds',
        'Move up to calves, thighs, abdomen',
        'Continue to arms, shoulders, face',
        'Notice the contrast between tension and relaxation'
      ]
    },
    {
      id: '3',
      name: 'Mindful Stretching',
      description: 'Gentle stretches to release tension',
      duration: '8 min',
      difficulty: 'Beginner',
      category: 'Movement',
      steps: [
        'Start with neck rolls - slow and gentle',
        'Shoulder shrugs - lift and release',
        'Arm stretches across body',
        'Gentle spinal twist while seated',
        'Forward fold to stretch back',
        'Hold each stretch for 30 seconds'
      ]
    },
    {
      id: '4',
      name: 'Grounding Exercise',
      description: '5-4-3-2-1 technique for anxiety and panic',
      duration: '3 min',
      difficulty: 'Beginner',
      category: 'Mindfulness',
      steps: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste',
        'Take slow, deep breaths throughout'
      ]
    }
  ]

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <CardDescription>{exercise.description}</CardDescription>
              </div>
              <Badge variant="outline">{exercise.category}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {exercise.duration}
              </span>
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {exercise.difficulty}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Placeholder for GIF/Animation */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Exercise Animation</p>
                  <p className="text-xs text-gray-400">GIF would be displayed here</p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Step-by-Step Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{exercise.name}</DialogTitle>
                    <DialogDescription>{exercise.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {exercise.steps.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Enhanced Resources Component
interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "audio" | "tool"
  category: string
  duration: string
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  rating: number
  thumbnail: string
  author: string
  tags: string[]
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: A Student's Guide",
    description: "Learn about anxiety symptoms, triggers, and coping strategies specifically for college students.",
    type: "article",
    category: "Anxiety",
    duration: "8 min read",
    language: "English",
    difficulty: "beginner",
    rating: 4.8,
    thumbnail: "/anxiety-guide-thumbnail.jpg",
    author: "Dr. Sarah Johnson",
    tags: ["anxiety", "students", "coping", "mental health"]
  },
  {
    id: "2",
    title: "Guided Meditation for Better Sleep",
    description: "A soothing meditation session designed to help you unwind and prepare for restful sleep.",
    type: "audio",
    category: "Sleep",
    duration: "20 min",
    language: "English",
    difficulty: "beginner",
    rating: 4.9,
    thumbnail: "/meditation-audio-thumbnail.jpg",
    author: "Mindful Moments",
    tags: ["meditation", "sleep", "relaxation", "guided"]
  },
  {
    id: "3",
    title: "Breathing Exercises for Stress Relief",
    description: "Learn various breathing techniques that can help reduce stress and anxiety in real-time.",
    type: "video",
    category: "Stress Management",
    duration: "12 min",
    language: "English",
    difficulty: "beginner",
    rating: 4.7,
    thumbnail: "/breathing-exercises-video-thumbnail.jpg",
    author: "Wellness Workshop",
    tags: ["breathing", "stress relief", "techniques", "wellness"]
  }
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mental Health Resources</h1>
          <p className="text-muted-foreground">
            Access a comprehensive collection of tools, guides, and activities to support your mental wellness journey.
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources">Articles & Videos</TabsTrigger>
            <TabsTrigger value="sounds">Calming Sounds</TabsTrigger>
            <TabsTrigger value="exercises">Wellness Exercises</TabsTrigger>
            <TabsTrigger value="drawing">Creative Pad</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Anxiety">Anxiety</SelectItem>
                  <SelectItem value="Depression">Depression</SelectItem>
                  <SelectItem value="Stress Management">Stress Management</SelectItem>
                  <SelectItem value="Sleep">Sleep</SelectItem>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="tool">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                      {resource.type === 'video' && <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />}
                      {resource.type === 'audio' && <Headphones className="h-8 w-8 mx-auto mb-2 text-gray-400" />}
                      {resource.type === 'article' && <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />}
                      {resource.type === 'tool' && <Brain className="h-8 w-8 mx-auto mb-2 text-gray-400" />}
                      <p className="text-sm text-gray-500">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{resource.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {resource.author}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/resources/${resource.id}`}>
                        Access Resource
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sounds">
            <CalmingSounds />
          </TabsContent>

          <TabsContent value="exercises">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Wellness Exercises
                </CardTitle>
                <CardDescription>
                  Practice these exercises regularly to build resilience and manage stress
                </CardDescription>
              </CardHeader>
            </Card>
            <ExerciseGuides />
          </TabsContent>

          <TabsContent value="drawing">
            <DrawingPad />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
