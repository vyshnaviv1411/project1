import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, TrendingUp, Settings, Eye, UserCheck, Building, Target } from 'lucide-react';

interface AdminDashboardProps {
  onNext: () => void;
}

export const AdminDashboard = ({ onNext }: AdminDashboardProps) => {
  const adminStats = {
    totalUsers: 12847,
    activeUsers: 8943,
    totalJobs: 3421,
    totalApplications: 45612,
    avgSuccessRate: 14.2,
    topRoles: [
      { role: 'Frontend Developer', applications: 2843, success: 16.8 },
      { role: 'Full Stack Developer', applications: 2156, success: 15.2 },
      { role: 'Data Analyst', applications: 1987, success: 12.4 },
      { role: 'Backend Developer', applications: 1654, success: 18.1 },
      { role: 'Mobile Developer', applications: 1234, success: 11.7 }
    ],
    skillGaps: [
      { skill: 'TypeScript', gap: 67, trend: 'increasing' },
      { skill: 'Cloud Computing', gap: 54, trend: 'stable' },
      { skill: 'Docker/Kubernetes', gap: 48, trend: 'increasing' },
      { skill: 'Machine Learning', gap: 71, trend: 'increasing' },
      { skill: 'Testing/QA', gap: 42, trend: 'decreasing' }
    ],
    recentUsers: [
      { name: 'Alex Johnson', email: 'alex.j@uni.edu', joined: '2024-01-20', status: 'active' },
      { name: 'Sarah Chen', email: 'sarah.c@college.edu', joined: '2024-01-19', status: 'active' },
      { name: 'Mike Rodriguez', email: 'mike.r@school.edu', joined: '2024-01-18', status: 'inactive' },
      { name: 'Emily Davis', email: 'emily.d@uni.edu', joined: '2024-01-17', status: 'active' }
    ]
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'increasing' ? '↗️' : trend === 'decreasing' ? '↘️' : '→';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'increasing' ? 'text-destructive' : 
           trend === 'decreasing' ? 'text-success' : 
           'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage platform analytics and user insights
            </p>
          </div>
          <Badge variant="outline" className="text-success border-success">
            Admin Access
          </Badge>
        </div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-gradient">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-1">
                {adminStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-xs text-success mt-1">
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-success mb-1">
                {adminStats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="text-xs text-success mt-1">
                {((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}% engagement
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning mb-1">
                {adminStats.totalJobs.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Jobs</div>
              <div className="text-xs text-warning mt-1">
                +8% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-500 mb-1">
                {adminStats.avgSuccessRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="text-xs text-success mt-1">
                +2.1% improvement
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Most Applied Roles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-gradient h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Most Applied Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminStats.topRoles.map((role, index) => (
                  <div key={role.role} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{role.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {role.applications} applications
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={role.success > 15 ? 'text-success border-success' : 'text-warning border-warning'}
                    >
                      {role.success}% success
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Gaps Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-gradient h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Skill Gaps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminStats.skillGaps.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getTrendColor(skill.trend)}`}>
                          {getTrendIcon(skill.trend)}
                        </span>
                        <span className="text-sm font-medium">{skill.gap}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${skill.gap}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="card-gradient h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminStats.recentUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {user.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Admin Actions */}
        <motion.div 
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Manage Users</h3>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage user accounts, permissions, and activities
              </p>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Users
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Job Categories</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage job categories, roles, and skill requirements
              </p>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Manage Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Role Explainers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload and manage role explainer videos and content
              </p>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Upload Content
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="card-gradient max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gradient mb-4">
                Smart Job Aggregator Demo Complete! 🎉
              </h2>
              <p className="text-muted-foreground mb-6">
                You've experienced all the key features of our comprehensive student career platform.
                From job discovery to resume analysis, application tracking to peer comparisons.
              </p>
              <Button variant="hero" size="lg" onClick={onNext}>
                Start Demo Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};