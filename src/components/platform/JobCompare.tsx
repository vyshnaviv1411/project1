import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Building, MapPin, DollarSign, Star, Download, CheckCircle, X } from 'lucide-react';

interface JobCompareProps {
  onNext: () => void;
}

export const JobCompare = ({ onNext }: JobCompareProps) => {
  const [selectedJob1, setSelectedJob1] = useState('frontend-tech');
  const [selectedJob2, setSelectedJob2] = useState('fullstack-mega');

  const availableJobs = {
    'frontend-tech': {
      title: 'Frontend Developer',
      company: 'Tech Innovate Inc.',
      location: 'San Francisco, CA',
      salary: '$95,000',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      benefits: ['Health Insurance', 'Remote Work', 'Stock Options', '401k'],
      matchScore: 92,
      workLifeBalance: 4.2,
      companyRating: 4.5,
      growth: 'High'
    },
    'fullstack-mega': {
      title: 'Full Stack Developer',
      company: 'MegaCorp',
      location: 'New York, NY',
      salary: '$105,000',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
      benefits: ['Health Insurance', 'Dental', 'Gym Membership', 'Flexible Hours'],
      matchScore: 87,
      workLifeBalance: 3.8,
      companyRating: 4.1,
      growth: 'Medium'
    },
    'react-startup': {
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$85,000',
      skills: ['React', 'Next.js', 'TypeScript', 'Firebase'],
      benefits: ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible PTO'],
      matchScore: 94,
      workLifeBalance: 4.0,
      companyRating: 4.3,
      growth: 'High'
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getGrowthColor = (growth: string) => {
    if (growth === 'High') return 'text-success';
    if (growth === 'Medium') return 'text-warning';
    return 'text-muted-foreground';
  };

  const renderComparisonRow = (label: string, job1Value: any, job2Value: any, icon?: React.ReactNode) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        {label}
      </div>
      <div className="text-center">{job1Value}</div>
      <div className="text-center">{job2Value}</div>
    </div>
  );

  const renderJobCard = (jobKey: string, job: any, position: 'left' | 'right') => (
    <Card className="card-gradient h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge variant="outline" className={`${getScoreColor(job.matchScore)} border-current`}>
            {job.matchScore}% match
          </Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-muted-foreground">
            <Building className="h-4 w-4 mr-2" />
            {job.company}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold text-lg text-primary">{job.salary}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Benefits</h4>
          <ul className="space-y-1">
            {job.benefits.slice(0, 3).map((benefit: string) => (
              <li key={benefit} className="flex items-center text-sm">
                <CheckCircle className="h-3 w-3 text-success mr-2" />
                {benefit}
              </li>
            ))}
            {job.benefits.length > 3 && (
              <li className="text-xs text-muted-foreground">
                +{job.benefits.length - 3} more benefits
              </li>
            )}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-muted-foreground">Work-Life Balance</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-warning mr-1" />
              {job.workLifeBalance}/5
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Company Rating</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-warning mr-1" />
              {job.companyRating}/5
            </div>
          </div>
        </div>

        <div>
          <div className="text-muted-foreground text-sm">Growth Potential</div>
          <div className={`font-medium ${getGrowthColor(job.growth)}`}>
            {job.growth}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const job1 = availableJobs[selectedJob1 as keyof typeof availableJobs];
  const job2 = availableJobs[selectedJob2 as keyof typeof availableJobs];

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Job Comparison Tool</h1>
          <p className="text-muted-foreground">
            Compare job offers side-by-side to make informed decisions
          </p>
        </div>

        {/* Job Selection */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Select First Job</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedJob1} onValueChange={setSelectedJob1}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a job offer" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(availableJobs).map(([key, job]) => (
                    <SelectItem key={key} value={key}>
                      {job.title} at {job.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Select Second Job</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedJob2} onValueChange={setSelectedJob2}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a job offer" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(availableJobs).map(([key, job]) => (
                    <SelectItem key={key} value={key}>
                      {job.title} at {job.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {renderJobCard(selectedJob1, job1, 'left')}
          {renderJobCard(selectedJob2, job2, 'right')}
        </motion.div>

        {/* Detailed Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                <div className="grid grid-cols-3 gap-4 py-3 border-b border-border font-semibold">
                  <div>Criteria</div>
                  <div className="text-center">{job1.company}</div>
                  <div className="text-center">{job2.company}</div>
                </div>
                
                {renderComparisonRow(
                  'Salary',
                  job1.salary,
                  job2.salary,
                  <DollarSign className="h-4 w-4 text-primary" />
                )}
                
                {renderComparisonRow(
                  'Resume Match',
                  <span className={getScoreColor(job1.matchScore)}>{job1.matchScore}%</span>,
                  <span className={getScoreColor(job2.matchScore)}>{job2.matchScore}%</span>,
                  <Star className="h-4 w-4 text-warning" />
                )}
                
                {renderComparisonRow(
                  'Location',
                  job1.location,
                  job2.location,
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                
                {renderComparisonRow(
                  'Work-Life Balance',
                  `${job1.workLifeBalance}/5`,
                  `${job2.workLifeBalance}/5`
                )}
                
                {renderComparisonRow(
                  'Company Rating',
                  `${job1.companyRating}/5`,
                  `${job2.companyRating}/5`
                )}
                
                {renderComparisonRow(
                  'Growth Potential',
                  <span className={getGrowthColor(job1.growth)}>{job1.growth}</span>,
                  <span className={getGrowthColor(job2.growth)}>{job2.growth}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4 justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export as PDF
          </Button>
          <Button variant="gradient" onClick={onNext}>
            Compare with Peer Resumes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};