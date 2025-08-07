import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Play, Pause, Download, Share, Edit3, Bookmark, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

const TranscriptViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [transcript, setTranscript] = useState(`
Good morning everyone, thank you for joining today's team meeting. Let's start by reviewing our quarterly goals and project timelines.

First on the agenda, we need to discuss the new product launch scheduled for next month. The development team has made significant progress, and we're currently at 85% completion. 

Key milestones achieved this week:
- User interface design finalized
- Backend API testing completed
- Security audit passed with minor recommendations

Areas that need attention:
- Mobile app optimization for iOS devices
- Integration testing with third-party services
- Final round of user acceptance testing

The marketing team is also preparing promotional materials and has scheduled several demos with potential clients. We expect to have the beta version ready for internal testing by Friday.

Moving forward, we'll need to coordinate closely between development, QA, and marketing teams to ensure a smooth launch. Any questions or concerns about the timeline?
  `);
  
  const [summary] = useState(`
Team meeting covering Q1 product launch progress. Development at 85% completion with UI finalized and security audit passed. Key remaining tasks: iOS optimization, integration testing, and user acceptance testing. Beta version expected by Friday.
  `);

  const [bookmarks] = useState([
    { time: "02:15", text: "Development progress update" },
    { time: "05:30", text: "Key milestones achieved" },
    { time: "08:45", text: "Areas needing attention" },
    { time: "12:20", text: "Marketing team updates" }
  ]);

  const mockTranscriptData = {
    title: "Morning Team Meeting",
    date: "2024-01-15",
    duration: "12:34",
    tag: "Meeting",
    language: "English",
    model: "Whisper Base"
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export started",
      description: `Exporting transcript as ${format.toUpperCase()}`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockTranscriptData.title,
        text: transcript.substring(0, 200) + "...",
      });
    } else {
      toast({
        title: "Copied to clipboard",
        description: "Transcript text copied successfully",
      });
    }
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Playback paused" : "Playing transcript",
      description: isPlaying ? "Audio paused" : "Text-to-speech started",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{mockTranscriptData.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{mockTranscriptData.date}</span>
              <span>•</span>
              <span>{mockTranscriptData.duration}</span>
              <Badge variant="secondary" className="ml-2">
                {mockTranscriptData.tag}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayback}
              className="p-2"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="p-2"
            >
              <Edit3 size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2"
            >
              <Share size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Search Bar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search in transcript..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Transcript */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Transcript</span>
                  {isEditing && (
                    <Badge variant="secondary">Editing Mode</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="min-h-[400px] font-mono text-sm leading-relaxed"
                    placeholder="Edit your transcript..."
                  />
                ) : (
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSearchTerm(transcript.replace(/\n/g, '<br />')) 
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download size={18} />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['TXT', 'PDF', 'DOCX', 'JSON'].map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExport(format)}
                      className="hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Summary */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {summary}
                </p>
              </CardContent>
            </Card>

            {/* Bookmarks */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark size={18} />
                  Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookmarks.map((bookmark, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth">
                      <Badge variant="outline" className="font-mono text-xs">
                        {bookmark.time}
                      </Badge>
                      <span className="text-sm text-foreground flex-1">
                        {bookmark.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium">{mockTranscriptData.language}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{mockTranscriptData.model}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{mockTranscriptData.duration}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Words</span>
                  <span className="font-medium">{transcript.split(' ').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TranscriptViewer;