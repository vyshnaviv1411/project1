import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Building, Star, Clock, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: any;
  onNavigate: (screen: string) => void;
}

export const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const jobCards = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Innovate Inc.',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      salary: '$80k - $120k',
      match: 92,
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Remote',
      skills: ['Python', 'SQL', 'Tableau'],
      salary: '$70k - $95k',
      match: 87,
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      skills: ['Figma', 'User Research', 'Prototyping'],
      salary: '$75k - $110k',
      match: 78,
      posted: '3 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome back, {user?.name || 'Alex'}! 👋
          </motion.h1>
          <p className="text-muted-foreground">Ready to find your next opportunity?</p>
        </div>

        {/* Search Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for jobs, companies, or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Input placeholder="e.g. Frontend Developer" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input placeholder="e.g. San Francisco" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input placeholder="e.g. Google" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Jobs Applied</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <Building className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Offers</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-muted-foreground">Match Score</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {jobCards.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <Badge variant="outline" className="text-primary border-primary">
                      {job.match}% match
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    {job.company}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-primary">{job.salary}</p>
                    <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
                  </div>
                  
                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={() => onNavigate('roleExplainer')}
                  >
                    More About This Role
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};