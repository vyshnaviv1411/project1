import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Upload, FileText, Globe } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: any) => void;
  onNext: () => void;
}

export const LoginScreen = ({ onLogin, onNext }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const handleGoogleLogin = () => {
    const user = { name: 'Alex Johnson', email: 'alex.johnson@university.edu' };
    onLogin(user);
    setShowResumeUpload(true);
  };

  const handleEmailOtp = () => {
    if (email) {
      setShowOtp(true);
    }
  };

  const handleOtpVerify = () => {
    const user = { name: 'Alex Johnson', email: email };
    onLogin(user);
    setShowResumeUpload(true);
  };

  const handleResumeUpload = () => {
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="card-gradient">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gradient">Welcome to Smart Job Aggregator</CardTitle>
            <p className="text-muted-foreground">Sign in to start your career journey</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!showOtp && !showResumeUpload && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <Button 
                  variant="gradient" 
                  className="w-full" 
                  onClick={handleGoogleLogin}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="w-full" onClick={handleEmailOtp}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send OTP
                </Button>
              </motion.div>
            )}

            {showOtp && !showResumeUpload && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <Label htmlFor="otp">Enter OTP sent to {email}</Label>
                <Input
                  id="otp"
                  placeholder="6-digit OTP"
                  maxLength={6}
                />
                <Button variant="gradient" className="w-full" onClick={handleOtpVerify}>
                  Verify & Continue
                </Button>
              </motion.div>
            )}

            {showResumeUpload && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">Upload Your Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your resume to get personalized job recommendations
                </p>
                
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag & drop your PDF resume or click to browse
                  </p>
                  <Button variant="outline" className="mb-2">
                    <FileText className="mr-2 h-4 w-4" />
                    Choose PDF File
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Or</p>
                  <Input
                    placeholder="Paste your LinkedIn profile URL"
                    className="mb-4"
                  />
                </div>
                
                <Button variant="gradient" className="w-full" onClick={handleResumeUpload}>
                  Continue to Dashboard
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};