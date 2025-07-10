import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, TrendingUp, Users, Award, Target, Download } from 'lucide-react';

interface PeerResumeComparisonProps {
  onNext: () => void;
}

export const PeerResumeComparison = ({ onNext }: PeerResumeComparisonProps) => {
  const [filter, setFilter] = useState('same-college');
  const [domain, setDomain] = useState('computer-science');
  const [showResults, setShowResults] = useState(false);

  const comparisonData = {
    overallRank: 73,
    totalPeers: 2847,
    strengths: [
      { category: 'Technical Skills', score: 89, percentile: 85 },
      { category: 'Project Experience', score: 82, percentile: 78 },
      { category: 'Education', score: 91, percentile: 92 },
      { category: 'Work Experience', score: 65, percentile: 55 },
      { category: 'Certifications', score: 78, percentile: 70 }
    ],
    missingKeywords: [
      { keyword: 'Machine Learning', frequency: 67, importance: 'High' },
      { keyword: 'Docker', frequency: 45, importance: 'Medium' },
      { keyword: 'Agile/Scrum', frequency: 78, importance: 'High' },
      { keyword: 'Cloud Computing', frequency: 56, importance: 'Medium' }
    ],
    suggestedTitles: [
      { title: 'Full Stack Developer', confidence: 89 },
      { title: 'Software Engineer', confidence: 87 },
      { title: 'Frontend Developer', confidence: 92 },
      { title: 'React Developer', confidence: 85 }
    ]
  };

  const renderRadarChart = () => (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background grid */}
        {[20, 40, 60, 80].map((radius) => (
          <circle
            key={radius}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {comparisonData.strengths.map((_, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180);
          const x2 = 100 + 80 * Math.cos(angle);
          const y2 = 100 + 80 * Math.sin(angle);
          return (
            <line
              key={index}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon
          points={comparisonData.strengths
            .map((item, index) => {
              const angle = (index * 72 - 90) * (Math.PI / 180);
              const radius = (item.score / 100) * 80;
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ')}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {comparisonData.strengths.map((item, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180);
          const radius = (item.score / 100) * 80;
          const x = 100 + radius * Math.cos(angle);
          const y = 100 + radius * Math.sin(angle);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="hsl(var(--primary))"
            />
          );
        })}
        
        {/* Labels */}
        {comparisonData.strengths.map((item, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180);
          const x = 100 + 95 * Math.cos(angle);
          const y = 100 + 95 * Math.sin(angle);
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-current"
            >
              {item.category.split(' ')[0]}
            </text>
          );
        })}
      </svg>
    </div>
  );

  const renderUploadStep = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-2xl mx-auto"
    >
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="text-2xl text-gradient">Peer Resume Comparison</CardTitle>
          <p className="text-muted-foreground">
            Compare your resume with peers from your college and domain
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
            <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload your resume to compare with anonymized peer data
            </p>
            <Button variant="outline">Choose Resume File</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="text-left">
              <label className="text-sm font-medium mb-2 block">Filter by</label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same-college">Same College</SelectItem>
                  <SelectItem value="same-region">Same Region</SelectItem>
                  <SelectItem value="all-peers">All Peers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-left">
              <label className="text-sm font-medium mb-2 block">Domain</label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="gradient" 
            className="w-full"
            onClick={() => setShowResults(true)}
          >
            Compare with Peers
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Overall Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="card-gradient text-center">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {comparisonData.overallRank}
                  <span className="text-lg">th</span>
                </div>
                <p className="text-muted-foreground">Percentile Rank</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {comparisonData.totalPeers.toLocaleString()}
                </div>
                <p className="text-muted-foreground">Total Peers</p>
              </div>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              Better than {100 - comparisonData.overallRank}% of peers
            </Badge>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-gradient h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderRadarChart()}
              <div className="mt-4 space-y-2">
                {comparisonData.strengths.map((item) => (
                  <div key={item.category} className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.score}/100</span>
                      <Badge variant="outline" className="text-xs">
                        {item.percentile}th percentile
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Missing Keywords */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-gradient h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Missing Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisonData.missingKeywords.map((item) => (
                <div key={item.keyword} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.keyword}</span>
                    <Badge 
                      variant={item.importance === 'High' ? 'destructive' : 'default'}
                    >
                      {item.importance}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Used by {item.frequency}% of peers</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Suggested Titles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Suggested Job Titles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisonData.suggestedTitles.map((item) => (
                <div key={item.title} className="text-center p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">{item.title}</h4>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {item.confidence}%
                  </div>
                  <p className="text-xs text-muted-foreground">Match confidence</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex gap-4 justify-center pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" onClick={() => setShowResults(false)}>
          Compare Another Resume
        </Button>
        <Button variant="gradient" onClick={onNext}>
          View Growth Tracker
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
          <h1 className="text-3xl font-bold text-gradient mb-2">Peer Resume Comparison</h1>
          <p className="text-muted-foreground">
            See how your resume stacks up against peers in your field
          </p>
        </div>

        {!showResults ? renderUploadStep() : renderResults()}
      </motion.div>
    </div>
  );
};