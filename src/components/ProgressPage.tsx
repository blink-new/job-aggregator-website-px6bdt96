import { useState } from 'react'
import { TrendingUp, Calendar, Award, Target, BarChart3, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface ProgressPageProps {
  user: any
}

export function ProgressPage({ user }: ProgressPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const weeklyStats = {
    workouts: 4,
    totalTime: 180,
    avgDuration: 45,
    caloriesBurned: 920,
    personalRecords: 2
  }

  const personalRecords = [
    {
      id: '1',
      exercise: 'Bench Press',
      value: 85,
      unit: 'kg',
      date: '2024-01-15',
      improvement: '+5kg'
    },
    {
      id: '2',
      exercise: 'Squat',
      value: 120,
      unit: 'kg',
      date: '2024-01-14',
      improvement: '+10kg'
    },
    {
      id: '3',
      exercise: '5K Run',
      value: 24.5,
      unit: 'min',
      date: '2024-01-13',
      improvement: '-1.5min'
    },
    {
      id: '4',
      exercise: 'Plank',
      value: 180,
      unit: 'sec',
      date: '2024-01-12',
      improvement: '+30sec'
    }
  ]

  const goals = [
    {
      id: '1',
      title: 'Workout 5 times this week',
      progress: 80,
      current: 4,
      target: 5,
      unit: 'workouts',
      deadline: '2 days left'
    },
    {
      id: '2',
      title: 'Bench Press 100kg',
      progress: 85,
      current: 85,
      target: 100,
      unit: 'kg',
      deadline: '1 month left'
    },
    {
      id: '3',
      title: 'Run 5km under 24 minutes',
      progress: 75,
      current: 24.5,
      target: 24,
      unit: 'minutes',
      deadline: '2 weeks left'
    },
    {
      id: '4',
      title: 'Lose 5kg body weight',
      progress: 60,
      current: 3,
      target: 5,
      unit: 'kg lost',
      deadline: '6 weeks left'
    }
  ]

  const workoutHistory = [
    { date: '2024-01-15', workouts: 1, duration: 45 },
    { date: '2024-01-14', workouts: 1, duration: 60 },
    { date: '2024-01-13', workouts: 1, duration: 30 },
    { date: '2024-01-12', workouts: 0, duration: 0 },
    { date: '2024-01-11', workouts: 1, duration: 50 },
    { date: '2024-01-10', workouts: 0, duration: 0 },
    { date: '2024-01-09', workouts: 1, duration: 40 }
  ]

  const bodyMeasurements = [
    { date: '2024-01-15', weight: 75.2, bodyFat: 15.8 },
    { date: '2024-01-08', weight: 75.8, bodyFat: 16.2 },
    { date: '2024-01-01', weight: 76.5, bodyFat: 16.8 }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Monitor your fitness journey and celebrate achievements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{weeklyStats.workouts}</p>
                <p className="text-xs text-muted-foreground">Workouts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{weeklyStats.totalTime}m</p>
                <p className="text-xs text-muted-foreground">Total Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{weeklyStats.avgDuration}m</p>
                <p className="text-xs text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔥</span>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{weeklyStats.caloriesBurned}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{weeklyStats.personalRecords}</p>
                <p className="text-xs text-muted-foreground">New PRs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="body">Body Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workout Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Workout Activity (Last 7 Days)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workoutHistory.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {day.workouts > 0 ? `${day.duration} minutes` : 'Rest day'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {day.workouts > 0 ? (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Rest
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">New Personal Record!</p>
                      <p className="text-sm text-muted-foreground">Bench Press: 85kg (+5kg)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Goal Milestone</p>
                      <p className="text-sm text-muted-foreground">4 workouts this week completed!</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Consistency Streak</p>
                      <p className="text-sm text-muted-foreground">7 days of regular workouts!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{goal.deadline}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {goal.progress}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Update Progress
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{record.exercise}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {record.improvement}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {record.value} {record.unit}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Achieved on {record.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="body" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Body Weight Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bodyMeasurements.map((measurement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{measurement.weight} kg</p>
                        <p className="text-sm text-muted-foreground">{measurement.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Body Fat</p>
                        <p className="font-medium text-foreground">{measurement.bodyFat}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Measurement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-orange text-white hover:opacity-90">
                    Record New Measurement
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add Progress Photo
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Measurement History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}