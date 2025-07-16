import { useState } from 'react'
import { Search, Filter, Play, BookOpen, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface ExerciseLibraryProps {
  user: any
}

export function ExerciseLibrary({ user }: ExerciseLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  const exercises = [
    {
      id: '1',
      name: 'Push-ups',
      category: 'Chest',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      instructions: 'Start in plank position, lower body to ground, push back up.',
      tips: 'Keep core tight and maintain straight line from head to heels.'
    },
    {
      id: '2',
      name: 'Bench Press',
      category: 'Chest',
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      instructions: 'Lie on bench, grip bar wider than shoulders, lower to chest, press up.',
      tips: 'Keep feet flat on floor and maintain natural arch in back.'
    },
    {
      id: '3',
      name: 'Squats',
      category: 'Legs',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      instructions: 'Stand with feet shoulder-width apart, lower hips back and down, return to standing.',
      tips: 'Keep knees in line with toes and chest up throughout movement.'
    },
    {
      id: '4',
      name: 'Deadlift',
      category: 'Back',
      difficulty: 'Advanced',
      equipment: 'Barbell',
      muscleGroups: ['Hamstrings', 'Glutes', 'Back', 'Core'],
      instructions: 'Stand with bar over mid-foot, grip bar, lift by extending hips and knees.',
      tips: 'Keep bar close to body and maintain neutral spine throughout lift.'
    },
    {
      id: '5',
      name: 'Pull-ups',
      category: 'Back',
      difficulty: 'Intermediate',
      equipment: 'Pull-up Bar',
      muscleGroups: ['Lats', 'Biceps', 'Rhomboids'],
      instructions: 'Hang from bar with overhand grip, pull body up until chin clears bar.',
      tips: 'Engage core and avoid swinging or kipping movements.'
    },
    {
      id: '6',
      name: 'Plank',
      category: 'Core',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      muscleGroups: ['Core', 'Shoulders', 'Glutes'],
      instructions: 'Hold push-up position with forearms on ground, maintain straight line.',
      tips: 'Breathe normally and avoid letting hips sag or pike up.'
    }
  ]

  const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio']
  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

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
    const colors: { [key: string]: string } = {
      'Chest': 'bg-blue-100 text-blue-800',
      'Back': 'bg-green-100 text-green-800',
      'Legs': 'bg-purple-100 text-purple-800',
      'Shoulders': 'bg-orange-100 text-orange-800',
      'Arms': 'bg-pink-100 text-pink-800',
      'Core': 'bg-indigo-100 text-indigo-800',
      'Cardio': 'bg-red-100 text-red-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.muscleGroups.some(muscle => 
                           muscle.toLowerCase().includes(searchQuery.toLowerCase())
                         )
    const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Exercise Library</h1>
        <p className="text-muted-foreground">
          Discover exercises to build your perfect workout
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises or muscle groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Target className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{exercise.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {exercise.equipment}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-orange rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(exercise.category)}>
                  {exercise.category}
                </Badge>
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Target Muscles:</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.muscleGroups.map((muscle, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Instructions:</p>
                <p className="text-sm text-foreground line-clamp-3">
                  {exercise.instructions}
                </p>
              </div>

              {exercise.tips && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Pro Tip:</p>
                  <p className="text-sm text-accent font-medium line-clamp-2">
                    {exercise.tips}
                  </p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-orange text-white hover:opacity-90">
                  <Play className="w-3 h-3 mr-1" />
                  Demo
                </Button>
                <Button size="sm" variant="outline">
                  Add to Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No exercises found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}