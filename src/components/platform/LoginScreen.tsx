import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Upload, FileText, Globe } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: any) => void;
  onNext: (user?: any) => void;
}

export const LoginScreen = ({ onLogin, onNext }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null);

  const handleGoogleLogin = (type: 'student' | 'admin') => {
    const user = { 
      name: type === 'admin' ? 'Admin User' : 'Alex Johnson', 
      email: type === 'admin' ? 'admin@university.edu' : 'alex.johnson@university.edu',
      role: type
    };
    onLogin(user);
    if (type === 'student') {
      setShowResumeUpload(true);
    } else {
      onNext(user); // Skip resume upload for admin
    }
  };

  const handleEmailOtp = () => {
    if (email && userType) {
      setShowOtp(true);
    }
  };

  const handleOtpVerify = () => {
    const user = { 
      name: userType === 'admin' ? 'Admin User' : 'Alex Johnson', 
      email: email,
      role: userType
    };
    onLogin(user);
    if (userType === 'student') {
      setShowResumeUpload(true);
    } else {
      onNext(user); // Skip resume upload for admin
    }
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
            {!userType && !showOtp && !showResumeUpload && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-center mb-4">Choose Your Login Type</h3>
                
                <Button 
                  variant="gradient" 
                  className="w-full" 
                  onClick={() => setUserType('student')}
                >
                  Student Login
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={() => setUserType('admin')}
                >
                  Admin Login
                </Button>
              </motion.div>
            )}

            {userType && !showOtp && !showResumeUpload && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold capitalize">{userType} Login</h3>
                  <button 
                    onClick={() => setUserType(null)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Back to login options
                  </button>
                </div>

                <Button 
                  variant="gradient" 
                  className="w-full" 
                  onClick={() => handleGoogleLogin(userType)}
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Continue with Google as {userType === 'admin' ? 'Admin' : 'Student'}
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
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="sr-only"
                      id="resume-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log('Resume uploaded:', file.name, file.type);
                          alert(`Selected file: ${file.name}`);
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      className="mb-2 pointer-events-none"
                      type="button"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Choose PDF File
                    </Button>
                  </label>
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