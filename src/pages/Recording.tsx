import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Square, Play, Pause, Bookmark, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

const Recording = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("Meeting");
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [bookmarks, setBookmarks] = useState<Array<{ time: number; text: string }>>([]);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const recognitionRef = useRef<any>();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: noiseReduction
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          let transcript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              transcript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          
          // Only show the final transcript, avoid duplicates
          if (transcript) {
            setLiveTranscript(prev => prev + transcript);
          } else {
            // Show interim results temporarily
            setLiveTranscript(prev => {
              const finalPart = prev.replace(/\s*\[interim\].*$/, '');
              return finalPart + (interimTranscript ? ` [interim] ${interimTranscript}` : '');
            });
          }
        };
        
        recognitionRef.current = recognition;
        recognition.start();
      }
      
      setIsRecording(true);
      setIsPaused(false);
      
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Your voice is being captured and transcribed",
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      recognitionRef.current?.stop();
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      recognitionRef.current?.start();
      setIsPaused(false);
      
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    recognitionRef.current?.stop();
    clearInterval(intervalRef.current);
    setIsRecording(false);
    setIsPaused(false);
    
    toast({
      title: "Recording saved",
      description: "Your transcript has been processed",
    });
    
    // Navigate to transcript viewer
    navigate("/transcript/new");
  };

  const addBookmark = () => {
    const bookmark = {
      time: duration,
      text: `Bookmark at ${formatTime(duration)}`
    };
    setBookmarks(prev => [...prev, bookmark]);
    
    toast({
      title: "Bookmark added",
      description: `Marked at ${formatTime(duration)}`,
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      recognitionRef.current?.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-foreground mb-2">Voice Recording</h1>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="px-3 py-1">
              {selectedLabel}
            </Badge>
            <div className="text-2xl font-mono font-bold text-primary">
              {formatTime(duration)}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        
        {/* Recording Controls */}
        <Card className="border-0 shadow-elegant">
          <CardContent className="p-6">
            {/* Label Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Recording Label
              </label>
              <Select value={selectedLabel} onValueChange={setSelectedLabel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Lecture">Lecture</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Note">Personal Note</SelectItem>
                  <SelectItem value="Memo">Voice Memo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Settings */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Settings2 size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Noise Reduction</span>
              </div>
              <Switch 
                checked={noiseReduction} 
                onCheckedChange={setNoiseReduction}
                disabled={isRecording}
              />
            </div>

            {/* Main Recording Button */}
            <div className="flex justify-center mb-4">
              {!isRecording ? (
                <Button
                  size="lg"
                  onClick={startRecording}
                  className="w-20 h-20 rounded-full bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Mic size={32} />
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    variant={isPaused ? "default" : "secondary"}
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="w-16 h-16 rounded-full transition-smooth"
                  >
                    {isPaused ? <Play size={24} /> : <Pause size={24} />}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full transition-smooth"
                  >
                    <Square size={24} />
                  </Button>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="text-center">
              {!isRecording && (
                <p className="text-muted-foreground">Tap to start recording</p>
              )}
              {isRecording && !isPaused && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-red-500 font-medium">Recording...</p>
                </div>
              )}
              {isPaused && (
                <p className="text-orange-500 font-medium">Recording Paused</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Live Transcript */}
        {isRecording && liveTranscript && (
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Live Transcript</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={addBookmark}
                  className="text-primary hover:text-primary-glow"
                >
                  <Bookmark size={16} className="mr-1" />
                  Bookmark
                </Button>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
                <p className="text-sm text-foreground leading-relaxed">
                  {liveTranscript}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground mb-3">Bookmarks</h3>
              <div className="space-y-2">
                {bookmarks.map((bookmark, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Bookmark size={14} className="text-primary" />
                    <span className="font-mono text-primary">{formatTime(bookmark.time)}</span>
                    <span className="text-muted-foreground">{bookmark.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Recording;