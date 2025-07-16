import { useState } from 'react'
import { Plus, Play, Clock, Dumbbell, Calendar, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface WorkoutPageProps {
  user: any
}

export function WorkoutPage({ user }: WorkoutPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const workoutTemplates = [
    {
      id: '1',
      name: 'Upper Body Strength',
      category: 'Strength',
      duration: 45,
      exercises: 6,
      difficulty: 'Intermediate',
      description: 'Focus on chest, back, shoulders, and arms',
      muscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms']
    },
    {
      id: '2',
      name: 'HIIT Cardio Blast',
      category: 'Cardio',
      duration: 30,
      exercises: 8,
      difficulty: 'Advanced',
      description: 'High-intensity interval training for maximum burn',
      muscleGroups: ['Full Body']
    },
    {
      id: '3',
      name: 'Leg Day Power',
      category: 'Strength',
      duration: 60,
      exercises: 8,
      difficulty: 'Advanced',
      description: 'Complete lower body strength training',
      muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves']
    },
    {
      id: '4',
      name: 'Core & Abs',
      category: 'Core',
      duration: 25,
      exercises: 6,
      difficulty: 'Beginner',
      description: 'Strengthen your core and improve stability',
      muscleGroups: ['Core', 'Abs']
    }
  ]

  const recentWorkouts = [
    {
      id: '1',
      name: 'Upper Body Strength',
      date: '2024-01-15',
      duration: 45,
      exercises: 6,
      completed: true,
      notes: 'Great session! Increased weight on bench press.'
    },
    {
      id: '2',
      name: 'Cardio HIIT',
      date: '2024-01-14',
      duration: 30,
      exercises: 4,
      completed: true,
      notes: 'Tough but rewarding. Heart rate peaked at 180 BPM.'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength':
        return 'bg-blue-100 text-blue-800'
      case 'Cardio':
        return 'bg-red-100 text-red-800'
      case 'Core':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTemplates = workoutTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || template.category === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workouts</h1>
          <p className="text-muted-foreground">Choose a workout or create your own</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-gradient-orange text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Create Workout
          </Button>
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Quick Start
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Strength">Strength</SelectItem>
            <SelectItem value="Cardio">Cardio</SelectItem>
            <SelectItem value="Core">Core</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workout Templates */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Workout Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{template.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Dumbbell className="w-4 h-4" />
                        <span>{template.exercises} exercises</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                        <Badge className={getDifficultyColor(template.difficulty)}>
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Target Muscles:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.muscleGroups.map((muscle, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-orange text-white hover:opacity-90">
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Workouts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Recent Workouts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{workout.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={workout.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {workout.completed ? 'Completed' : 'Incomplete'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {workout.date} • {workout.duration} min • {workout.exercises} exercises
                    </p>
                    {workout.notes && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        "{workout.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Workouts</span>
                  <span className="text-lg font-bold text-foreground">3/4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Time</span>
                  <span className="text-lg font-bold text-foreground">135 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Duration</span>
                  <span className="text-lg font-bold text-foreground">45 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}