import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FloatingNavigationProps {
  currentScreen: string;
  screens: Record<string, string>;
  onNavigate: (screen: string) => void;
}

export const FloatingNavigation = ({ currentScreen, screens, onNavigate }: FloatingNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const screenKeys = Object.keys(screens);
  const currentIndex = screenKeys.indexOf(currentScreen);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < screenKeys.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      onNavigate(screenKeys[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(screenKeys[currentIndex + 1]);
    }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          variant="gradient"
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 shadow-glow"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <Card className="card-gradient p-4 min-w-80 shadow-glow">
              {/* Current Screen Info */}
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg">{screens[currentScreen]}</h3>
                <Badge variant="outline" className="mt-1">
                  {currentIndex + 1} of {screenKeys.length}
                </Badge>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {screenKeys.map((key, index) => (
                    <div
                      key={key}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={!canGoNext}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Screen List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {screenKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onNavigate(key);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                      key === currentScreen 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {screens[key]}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};