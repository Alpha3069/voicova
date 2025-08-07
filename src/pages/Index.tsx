import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Play, Calendar, Clock, Tag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const [recentTranscripts] = useState([
    {
      id: "1",
      title: "Morning Team Meeting",
      duration: "12:34",
      date: "2024-01-15",
      tag: "Meeting",
      snippet: "Discussed quarterly goals and project timelines..."
    },
    {
      id: "2", 
      title: "Lecture Notes - AI Ethics",
      duration: "45:20",
      date: "2024-01-14",
      tag: "Lecture",
      snippet: "Introduction to ethical considerations in artificial intelligence..."
    },
    {
      id: "3",
      title: "Interview with Sarah",
      duration: "28:15",
      date: "2024-01-13", 
      tag: "Interview",
      snippet: "Candidate interview for senior developer position..."
    }
  ]);

  const getTagColor = (tag: string) => {
    const colors = {
      Meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Lecture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Note: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">Voice Recorder</h1>
          <p className="text-muted-foreground">Capture and transcribe your thoughts</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Quick Stats */}
        <Card className="border-0 shadow-elegant bg-gradient-primary text-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp size={20} />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-90">Recordings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2.5h</div>
                <div className="text-sm opacity-90">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-90">Transcripts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/recording">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gradient-accent hover:shadow-glow transition-smooth group"
            >
              <div className="flex flex-col items-center gap-1">
                <Mic size={24} className="group-hover:scale-110 transition-smooth" />
                <span className="font-medium">Start Recording</span>
              </div>
            </Button>
          </Link>
          
          <Link to="/search">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-16 border-2 hover:bg-muted/50 transition-smooth group"
            >
              <div className="flex flex-col items-center gap-1">
                <Play size={20} className="group-hover:scale-110 transition-smooth" />
                <span className="font-medium">Browse</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Recent Transcripts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Transcripts</h2>
            <Link to="/library" className="text-primary hover:text-primary-glow transition-smooth">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentTranscripts.map((transcript) => (
              <Link key={transcript.id} to={`/transcript/${transcript.id}`}>
                <Card className="border-0 shadow-sm hover:shadow-elegant transition-smooth hover:scale-[1.02] active:scale-95">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {transcript.title}
                      </h3>
                      <Badge className={getTagColor(transcript.tag)}>
                        <Tag size={12} className="mr-1" />
                        {transcript.tag}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {transcript.snippet}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {transcript.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(transcript.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;