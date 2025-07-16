import { useState } from 'react'
import { User, Settings, Target, Award, Calendar, Edit, Camera, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { blink } from '../blink/client'

interface ProfilePageProps {
  user: any
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)

  const userStats = {
    totalWorkouts: 47,
    totalHours: 35.5,
    currentStreak: 7,
    personalRecords: 12,
    favoriteExercise: 'Bench Press',
    joinDate: '2023-12-01'
  }

  const achievements = [
    {
      id: '1',
      title: 'First Workout',
      description: 'Completed your first workout',
      icon: '🎯',
      earned: true,
      date: '2023-12-01'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Worked out 7 days in a row',
      icon: '🔥',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Strength Master',
      description: 'Set 10 personal records',
      icon: '💪',
      earned: true,
      date: '2024-01-12'
    },
    {
      id: '4',
      title: 'Century Club',
      description: 'Complete 100 workouts',
      icon: '💯',
      earned: false,
      progress: 47
    },
    {
      id: '5',
      title: 'Marathon Trainer',
      description: 'Train for 100 hours total',
      icon: '⏱️',
      earned: false,
      progress: 35.5
    },
    {
      id: '6',
      title: 'Consistency King',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      earned: false,
      progress: 7
    }
  ]

  const preferences = {
    units: 'metric', // metric or imperial
    notifications: true,
    publicProfile: false,
    shareWorkouts: true
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl bg-gradient-orange text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                {user?.email?.split('@')[0] || 'Fitness Enthusiast'}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {new Date(userStats.joinDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <Badge className="bg-primary/10 text-primary">
                  {userStats.currentStreak} day streak
                </Badge>
                <Badge className="bg-accent/10 text-accent">
                  {userStats.totalWorkouts} workouts
                </Badge>
                <Badge className="bg-orange-100 text-orange-800">
                  {userStats.personalRecords} PRs
                </Badge>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => blink.auth.logout()}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fitness Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Fitness Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{userStats.totalWorkouts}</p>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                  <p className="text-2xl font-bold text-accent">{userStats.totalHours}h</p>
                  <p className="text-sm text-muted-foreground">Hours Trained</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{userStats.personalRecords}</p>
                  <p className="text-sm text-muted-foreground">Personal Records</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-muted/50 border-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <p className="text-xs text-green-600 mt-1">
                            Earned on {achievement.date}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">
                            Progress: {achievement.progress}/
                            {achievement.id === '4' ? '100' : achievement.id === '5' ? '100' : '30'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Quick Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Favorite Exercise</span>
                <span className="text-sm font-medium">{userStats.favoriteExercise}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Workout</span>
                <span className="text-sm font-medium">45 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="text-sm font-medium">4 workouts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Goal</span>
                <span className="text-sm font-medium">100kg Bench</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-accent" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Units</span>
                <Badge variant="outline">
                  {preferences.units === 'metric' ? 'Metric (kg)' : 'Imperial (lbs)'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Notifications</span>
                <Badge variant={preferences.notifications ? 'default' : 'secondary'}>
                  {preferences.notifications ? 'On' : 'Off'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Public Profile</span>
                <Badge variant={preferences.publicProfile ? 'default' : 'secondary'}>
                  {preferences.publicProfile ? 'Public' : 'Private'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Share Workouts</span>
                <Badge variant={preferences.shareWorkouts ? 'default' : 'secondary'}>
                  {preferences.shareWorkouts ? 'Yes' : 'No'}
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Settings className="w-4 h-4 mr-2" />
                Manage Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Completed Upper Body workout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-muted-foreground">Set new Bench Press PR</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">Updated fitness goal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">Earned Week Warrior badge</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}