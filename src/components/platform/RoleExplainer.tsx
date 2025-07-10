import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, CheckCircle, TrendingUp, Users, X } from 'lucide-react';

interface RoleExplainerProps {
  onNext: () => void;
}

export const RoleExplainer = ({ onNext }: RoleExplainerProps) => {
  const [showModal, setShowModal] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const roleData = {
    title: 'Frontend Developer',
    company: 'Tech Innovate Inc.',
    summary: 'Frontend Developers create user-facing web applications using modern JavaScript frameworks. They bridge the gap between design and technology, ensuring excellent user experiences.',
    keySkills: [
      'JavaScript/TypeScript',
      'React/Vue/Angular',
      'CSS/Tailwind',
      'Version Control (Git)',
      'Responsive Design',
      'API Integration'
    ],
    whoItSuits: [
      'Creative problem solvers',
      'Detail-oriented individuals',
      'Tech enthusiasts',
      'Visual learners',
      'Collaborative team players'
    ],
    careerPath: [
      { role: 'Junior Frontend Developer', level: 'Entry', salary: '$60k-80k' },
      { role: 'Frontend Developer', level: 'Mid', salary: '$80k-120k' },
      { role: 'Senior Frontend Developer', level: 'Senior', salary: '$120k-160k' },
      { role: 'Frontend Tech Lead', level: 'Lead', salary: '$150k-200k' }
    ]
  };

  const similarRoles = [
    { title: 'Full Stack Developer', match: 85 },
    { title: 'React Developer', match: 92 },
    { title: 'UI/UX Developer', match: 78 },
    { title: 'JavaScript Developer', match: 88 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              {roleData.title} at {roleData.company}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Role Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Role Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {roleData.summary}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-gradient">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {!showVideo ? (
                      <div className="text-center">
                        <Button 
                          variant="hero" 
                          size="lg" 
                          className="mb-4"
                          onClick={() => setShowVideo(true)}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Watch 1-min Explainer Video
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Learn what Frontend Developers actually do
                        </p>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-black/80 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p>Playing: "A Day in the Life of a Frontend Developer"</p>
                          <p className="text-sm mt-2">Duration: 1:24</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills and Fit */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-gradient h-full">
                  <CardHeader>
                    <CardTitle>Key Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {roleData.keySkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="justify-center">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="card-gradient h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Who This Role Suits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {roleData.whoItSuits.map((trait) => (
                        <li key={trait} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Career Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Career Progression Path</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {roleData.careerPath.map((stage, index) => (
                      <div key={stage.role} className="text-center">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-primary' : 'bg-muted'
                          }`}>
                            {index + 1}
                          </div>
                          {index < roleData.careerPath.length - 1 && (
                            <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-muted"></div>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{stage.role}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{stage.level}</p>
                        <p className="text-xs font-medium text-primary">{stage.salary}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Similar Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Similar Roles You Might Like</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {similarRoles.map((role) => (
                      <div key={role.title} className="text-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                        <h4 className="font-medium text-sm mb-1">{role.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {role.match}% match
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Explore Similar Roles
              </Button>
              <Button variant="gradient" onClick={onNext} className="flex-1">
                Analyze My Skills for This Role
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Background content when modal is closed */}
      {!showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center py-20"
        >
          <h2 className="text-2xl font-bold mb-4">Role Explorer</h2>
          <p className="text-muted-foreground mb-6">
            Explore detailed information about different career paths
          </p>
          <Button variant="gradient" onClick={() => setShowModal(true)}>
            Reopen Role Details
          </Button>
        </motion.div>
      )}
    </div>
  );
};