import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoginScreen } from '@/components/platform/LoginScreen';
import { Dashboard } from '@/components/platform/Dashboard';
import { RoleExplainer } from '@/components/platform/RoleExplainer';
import { SkillGapAnalyzer } from '@/components/platform/SkillGapAnalyzer';
import { ApplicationTracker } from '@/components/platform/ApplicationTracker';
import { JobCompare } from '@/components/platform/JobCompare';
import { PeerResumeComparison } from '@/components/platform/PeerResumeComparison';
import { GrowthTracker } from '@/components/platform/GrowthTracker';
import { AdminDashboard } from '@/components/platform/AdminDashboard';
import { FloatingNavigation } from '@/components/platform/FloatingNavigation';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [user, setUser] = useState(null);

  const screens = {
    intro: 'Introduction',
    login: 'Login',
    dashboard: 'Dashboard',
    roleExplainer: 'Role Explainer',
    skillGap: 'Skill Gap Analyzer',
    tracker: 'Application Tracker',
    compare: 'Job Compare',
    peerResume: 'Peer Resume Comparison',
    growth: 'Growth Tracker',
    admin: 'Admin Dashboard'
  };

  const renderIntroScreen = () => (
    <div className="min-h-screen bg-gradient-pastel flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-6xl font-bold text-pastel-dark-brown mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Smart Job Aggregator
        </motion.h1>
        
        <motion.p 
          className="text-xl text-pastel-dark-brown/80 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The ultimate platform for students to discover jobs, analyze resumes, 
          compare offers, track applications, and manage their career journey — all in one place.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="bg-pastel-cream/80 border-pastel-light-peach/50 backdrop-blur-md shadow-pastel rounded-2xl hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-pastel-dark-brown">🎯 Smart Job Discovery</h3>
              <p className="text-sm text-pastel-dark-brown/70">AI-powered job matching with skill analysis</p>
            </CardContent>
          </Card>
          
          <Card className="bg-pastel-cream/80 border-pastel-light-peach/50 backdrop-blur-md shadow-pastel rounded-2xl hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-pastel-dark-brown">📊 Resume Analytics</h3>
              <p className="text-sm text-pastel-dark-brown/70">Deep insights and peer comparisons</p>
            </CardContent>
          </Card>
          
          <Card className="bg-pastel-cream/80 border-pastel-light-peach/50 backdrop-blur-md shadow-pastel rounded-2xl hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-pastel-dark-brown">🚀 Career Tracking</h3>
              <p className="text-sm text-pastel-dark-brown/70">Complete application and growth management</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setCurrentScreen('login')}
            className="text-lg px-12 py-4 bg-gradient-to-r from-pastel-dark-brown to-pastel-plum text-pastel-cream shadow-pastel hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-2xl"
          >
            Start Demo Experience
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return renderIntroScreen();
      case 'login':
        return <LoginScreen 
          onLogin={setUser} 
          onNext={(user) => {
            if (user?.role === 'admin') {
              setCurrentScreen('admin');
            } else {
              setCurrentScreen('dashboard');
            }
          }} 
        />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentScreen} />;
      case 'roleExplainer':
        return <RoleExplainer onNext={() => setCurrentScreen('skillGap')} />;
      case 'skillGap':
        return <SkillGapAnalyzer onNext={() => setCurrentScreen('tracker')} />;
      case 'tracker':
        return <ApplicationTracker onNext={() => setCurrentScreen('compare')} />;
      case 'compare':
        return <JobCompare onNext={() => setCurrentScreen('peerResume')} />;
      case 'peerResume':
        return <PeerResumeComparison onNext={() => setCurrentScreen('growth')} />;
      case 'growth':
        return <GrowthTracker onNext={() => setCurrentScreen('admin')} />;
      case 'admin':
        return <AdminDashboard onNext={() => setCurrentScreen('intro')} />;
      default:
        return renderIntroScreen();
    }
  };

  return (
    <div className="min-h-screen bg-pastel-cream text-pastel-dark-brown">
      {renderCurrentScreen()}
      
      {currentScreen !== 'intro' && (
        <FloatingNavigation 
          currentScreen={currentScreen}
          screens={screens}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
};

export default Index;