import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Smile, Frown, Meh, Star, Download, Target, CheckCircle } from 'lucide-react';

interface GrowthTrackerProps {
  onNext: () => void;
}

export const GrowthTracker = ({ onNext }: GrowthTrackerProps) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const moodOptions = [
    { mood: 'motivated', icon: Star, color: 'text-success', label: 'Motivated' },
    { mood: 'happy', icon: Smile, color: 'text-success', label: 'Happy' },
    { mood: 'neutral', icon: Meh, color: 'text-warning', label: 'Neutral' },
    { mood: 'anxious', icon: Frown, color: 'text-destructive', label: 'Anxious' },
    { mood: 'proud', icon: TrendingUp, color: 'text-primary', label: 'Proud' }
  ];

  const timelineData = [
    {
      date: '2024-01-15',
      type: 'application',
      title: 'Applied to Tech Innovate Inc.',
      mood: 'motivated',
      description: 'Frontend Developer position'
    },
    {
      date: '2024-01-18',
      type: 'mood',
      title: 'Feeling confident',
      mood: 'happy',
      description: 'Good progress on portfolio project'
    },
    {
      date: '2024-01-20',
      type: 'interview',
      title: 'First round interview',
      mood: 'anxious',
      description: 'MegaCorp technical interview'
    },
    {
      date: '2024-01-22',
      type: 'achievement',
      title: 'Completed React certification',
      mood: 'proud',
      description: 'Advanced React certification from Coursera'
    },
    {
      date: '2024-01-25',
      type: 'application',
      title: 'Applied to StartupXYZ',
      mood: 'motivated',
      description: 'Remote React Developer role'
    },
    {
      date: '2024-01-28',
      type: 'offer',
      title: 'Job offer received!',
      mood: 'proud',
      description: 'Junior Developer at GrowthCo - $85,000'
    }
  ];

  const weeklyStats = [
    {
      week: 'Week 1',
      applications: 5,
      interviews: 1,
      moodTrend: 'positive',
      avgMood: 4.2,
      achievements: 2
    },
    {
      week: 'Week 2',
      applications: 8,
      interviews: 3,
      moodTrend: 'mixed',
      avgMood: 3.8,
      achievements: 1
    },
    {
      week: 'Week 3',
      applications: 6,
      interviews: 2,
      moodTrend: 'positive',
      avgMood: 4.5,
      achievements: 3
    },
    {
      week: 'Week 4',
      applications: 4,
      interviews: 4,
      moodTrend: 'positive',
      avgMood: 4.1,
      achievements: 1
    }
  ];

  const getMoodIcon = (mood: string) => {
    const moodData = moodOptions.find(m => m.mood === mood);
    if (!moodData) return Meh;
    return moodData.icon;
  };

  const getMoodColor = (mood: string) => {
    const moodData = moodOptions.find(m => m.mood === mood);
    return moodData?.color || 'text-muted-foreground';
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'application': return Target;
      case 'interview': return Star;
      case 'offer': return CheckCircle;
      case 'achievement': return TrendingUp;
      default: return Smile;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'application': return 'text-primary';
      case 'interview': return 'text-warning';
      case 'offer': return 'text-success';
      case 'achievement': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const renderTimeline = () => (
    <div className="space-y-4">
      {timelineData.map((event, index) => {
        const EventIcon = getEventIcon(event.type);
        const MoodIcon = getMoodIcon(event.mood);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center ${getEventColor(event.type)}`}>
                <EventIcon className="h-5 w-5" />
              </div>
              {index < timelineData.length - 1 && (
                <div className="w-0.5 h-8 bg-border mt-2"></div>
              )}
            </div>
            
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{event.title}</h4>
                <MoodIcon className={`h-4 w-4 ${getMoodColor(event.mood)}`} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderWeeklySummary = () => (
    <div className="space-y-4">
      {weeklyStats.map((week, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            className={`card-hover cursor-pointer ${selectedWeek === index ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedWeek(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{week.week}</h4>
                <Badge 
                  variant={week.moodTrend === 'positive' ? 'default' : 
                          week.moodTrend === 'mixed' ? 'secondary' : 'outline'}
                >
                  {week.moodTrend}
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{week.applications}</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">{week.interviews}</div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">{week.achievements}</div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">{week.avgMood}/5</div>
                  <div className="text-xs text-muted-foreground">Avg Mood</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Personal Growth Tracker</h1>
          <p className="text-muted-foreground">
            Track your career journey, mood, and achievements over time
          </p>
        </div>

        {/* Current Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                {moodOptions.map((mood) => {
                  const IconComponent = mood.icon;
                  return (
                    <Button
                      key={mood.mood}
                      variant="outline"
                      size="lg"
                      className="flex flex-col gap-2 h-auto p-4"
                    >
                      <IconComponent className={`h-6 w-6 ${mood.color}`} />
                      <span className="text-xs">{mood.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Timeline View */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="card-gradient h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Career Journey Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {renderTimeline()}
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-gradient h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {renderWeeklySummary()}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">23</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-warning mb-2">10</div>
              <div className="text-sm text-muted-foreground">Interviews Completed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-success mb-2">7</div>
              <div className="text-sm text-muted-foreground">Achievements Unlocked</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-500 mb-2">4.2</div>
              <div className="text-sm text-muted-foreground">Average Mood Score</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF Report
          </Button>
          <Button variant="gradient" onClick={onNext}>
            View Admin Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};