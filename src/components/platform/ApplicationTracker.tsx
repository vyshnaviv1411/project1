import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle, X, Building, MapPin, Calendar } from 'lucide-react';

interface ApplicationTrackerProps {
  onNext: () => void;
}

export const ApplicationTracker = ({ onNext }: ApplicationTrackerProps) => {
  const [showReminder, setShowReminder] = useState(true);

  const kanbanColumns = {
    applied: {
      title: 'Applied',
      color: 'bg-blue-500',
      jobs: [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'Tech Innovate Inc.',
          location: 'San Francisco, CA',
          appliedDate: '2024-01-15',
          status: 'applied'
        },
        {
          id: 2,
          title: 'React Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          appliedDate: '2024-01-18',
          status: 'applied'
        }
      ]
    },
    interview: {
      title: 'Interview',
      color: 'bg-yellow-500',
      jobs: [
        {
          id: 3,
          title: 'Full Stack Developer',
          company: 'MegaCorp',
          location: 'New York, NY',
          appliedDate: '2024-01-10',
          interviewDate: '2024-01-22',
          status: 'interview'
        }
      ]
    },
    offer: {
      title: 'Offer',
      color: 'bg-green-500',
      jobs: [
        {
          id: 4,
          title: 'Junior Developer',
          company: 'GrowthCo',
          location: 'Austin, TX',
          appliedDate: '2024-01-08',
          offerDate: '2024-01-20',
          salary: '$85,000',
          status: 'offer'
        }
      ]
    },
    rejected: {
      title: 'Rejected',
      color: 'bg-red-500',
      jobs: [
        {
          id: 5,
          title: 'Software Engineer',
          company: 'BigTech',
          location: 'Seattle, WA',
          appliedDate: '2024-01-05',
          rejectedDate: '2024-01-12',
          status: 'rejected'
        }
      ]
    }
  };

  const handleStatusUpdate = (jobId: number, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updated job ${jobId} to status: ${newStatus}`);
  };

  const renderJobCard = (job: any) => (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3"
    >
      <Card className="card-hover cursor-move">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-sm">{job.title}</h4>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                job.status === 'applied' ? 'border-blue-500 text-blue-500' :
                job.status === 'interview' ? 'border-yellow-500 text-yellow-500' :
                job.status === 'offer' ? 'border-green-500 text-green-500' :
                'border-red-500 text-red-500'
              }`}
            >
              {job.status}
            </Badge>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <Building className="h-3 w-3 mr-1" />
            {job.company}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            {job.location}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3 mr-1" />
            Applied: {new Date(job.appliedDate).toLocaleDateString()}
          </div>
          
          {job.salary && (
            <p className="text-sm font-semibold text-primary mb-2">{job.salary}</p>
          )}
          
          <div className="flex gap-1">
            {job.status === 'applied' && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleStatusUpdate(job.id, 'interview')}
                className="text-xs"
              >
                → Interview
              </Button>
            )}
            {job.status === 'interview' && (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleStatusUpdate(job.id, 'offer')}
                  className="text-xs"
                >
                  → Offer
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleStatusUpdate(job.id, 'rejected')}
                  className="text-xs"
                >
                  → Rejected
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Application Tracker</h1>
          <p className="text-muted-foreground">
            Track your job applications and follow up at the right time
          </p>
        </div>

        {/* Reminder Popup */}
        {showReminder && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-warning bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium">Follow-up Reminder</p>
                      <p className="text-sm text-muted-foreground">
                        It's been 5 days since you applied to Tech Innovate Inc. Consider sending a follow-up email.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Send Follow-up
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowReminder(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(kanbanColumns).map(([key, column], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    {column.title}
                    <Badge variant="secondary" className="ml-auto">
                      {column.jobs.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {column.jobs.map(renderJobCard)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">3</div>
              <div className="text-sm text-muted-foreground">Offers Received</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-muted-foreground">12.5%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
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
          <Button variant="outline">
            Add New Application
          </Button>
          <Button variant="gradient" onClick={onNext}>
            Compare Job Offers
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};