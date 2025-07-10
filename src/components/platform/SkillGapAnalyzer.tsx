import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, CheckCircle, X, TrendingUp, BookOpen, Target } from 'lucide-react';

interface SkillGapAnalyzerProps {
  onNext: () => void;
}

export const SkillGapAnalyzer = ({ onNext }: SkillGapAnalyzerProps) => {
  const [step, setStep] = useState(0);
  const [selectedJob, setSelectedJob] = useState('Frontend Developer');

  const analysisData = {
    overallMatch: 87,
    skillsYouHave: [
      { skill: 'JavaScript', level: 90, trending: true },
      { skill: 'React', level: 85, trending: true },
      { skill: 'CSS', level: 80, trending: false },
      { skill: 'HTML', level: 95, trending: false },
      { skill: 'Git', level: 75, trending: false }
    ],
    missingSkills: [
      { skill: 'TypeScript', importance: 'High', courses: 3 },
      { skill: 'Testing (Jest)', importance: 'Medium', courses: 5 },
      { skill: 'GraphQL', importance: 'Medium', courses: 4 },
      { skill: 'Docker', importance: 'Low', courses: 7 }
    ],
    trendingSkills: [
      { skill: 'Next.js', growth: '+45%', courses: 8 },
      { skill: 'Tailwind CSS', growth: '+38%', courses: 6 },
      { skill: 'Vercel', growth: '+52%', courses: 4 }
    ]
  };

  const jobOptions = [
    'Frontend Developer',
    'Full Stack Developer',
    'React Developer',
    'UI/UX Developer'
  ];

  const renderUploadStep = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <Card className="card-gradient max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-gradient">Skill Gap Analysis</CardTitle>
          <p className="text-muted-foreground">
            Upload your resume to get personalized skill insights
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Drop your resume here or click to upload
            </p>
            <Button variant="outline">Choose File</Button>
          </div>
          
          <div className="text-left">
            <label className="text-sm font-medium mb-2 block">Target Job Role</label>
            <div className="grid grid-cols-2 gap-2">
              {jobOptions.map((job) => (
                <Button
                  key={job}
                  variant={selectedJob === job ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedJob(job)}
                >
                  {job}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            variant="gradient" 
            className="w-full"
            onClick={() => setStep(1)}
          >
            Analyze Skills
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAnalysisResults = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="card-gradient text-center">
          <CardContent className="p-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - analysisData.overallMatch / 100)}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gradient">{analysisData.overallMatch}%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Overall Match Score</h3>
            <p className="text-muted-foreground">
              You're a strong candidate for {selectedJob}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills You Have */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-gradient h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                Skills You Have
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData.skillsYouHave.map((skill, index) => (
                <motion.div 
                  key={skill.skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.skill}</span>
                      {skill.trending && (
                        <Badge variant="outline" className="text-xs text-primary border-primary">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Missing Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-gradient h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Target className="h-5 w-5" />
                Missing Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData.missingSkills.map((skill, index) => (
                <motion.div 
                  key={skill.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="border border-border rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge 
                      variant={skill.importance === 'High' ? 'destructive' : 
                               skill.importance === 'Medium' ? 'default' : 'secondary'}
                    >
                      {skill.importance}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{skill.courses} courses available</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Trending Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-gradient h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                Trending Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData.trendingSkills.map((skill, index) => (
                <motion.div 
                  key={skill.skill}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border border-border rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge variant="outline" className="text-primary border-primary">
                      {skill.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{skill.courses} courses available</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="flex gap-4 justify-center pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button variant="outline" onClick={() => setStep(0)}>
          Analyze Another Role
        </Button>
        <Button variant="gradient" onClick={onNext}>
          Track Applications
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Skill Gap Analyzer</h1>
          <p className="text-muted-foreground">
            Discover what skills you need to land your dream job
          </p>
        </div>

        {step === 0 ? renderUploadStep() : renderAnalysisResults()}
      </motion.div>
    </div>
  );
};