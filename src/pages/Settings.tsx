import { useState } from "react";
import { Settings2, Mic, Globe, Brain, Moon, FolderOpen, Download, RotateCcw, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [sttModel, setSttModel] = useState("whisper-base");
  const [language, setLanguage] = useState("en-US");
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoStop, setAutoStop] = useState(true);
  const [savePath, setSavePath] = useState("/Documents/Transcripts");

  const sttModels = [
    { value: "whisper-tiny", label: "Whisper Tiny", size: "39 MB", quality: "Good", speed: "Very Fast" },
    { value: "whisper-base", label: "Whisper Base", size: "74 MB", quality: "Better", speed: "Fast" },
    { value: "whisper-small", label: "Whisper Small", size: "244 MB", quality: "Great", speed: "Medium" },
    { value: "whisper-medium", label: "Whisper Medium", size: "769 MB", quality: "Excellent", speed: "Slow" },
  ];

  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "es-ES", label: "Spanish" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "it-IT", label: "Italian" },
    { value: "pt-BR", label: "Portuguese (Brazil)" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
    { value: "ja-JP", label: "Japanese" },
    { value: "ko-KR", label: "Korean" },
  ];

  const handleModelUpdate = () => {
    toast({
      title: "Model update started",
      description: "Downloading latest STT models...",
    });
  };

  const handleExportSettings = () => {
    toast({
      title: "Settings exported",
      description: "Configuration saved to Downloads folder",
    });
  };

  const handleBackupData = () => {
    toast({
      title: "Backup started",
      description: "Creating backup of all transcripts...",
    });
  };

  const selectedModel = sttModels.find(model => model.value === sttModel);
  const selectedLanguage = languages.find(lang => lang.value === language);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your voice recording preferences</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* STT Model Selection */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic size={20} />
              Speech Recognition Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Select STT Model
              </label>
              <Select value={sttModel} onValueChange={setSttModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sttModels.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{model.label}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant="outline">{model.size}</Badge>
                          <Badge variant="secondary">{model.quality}</Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedModel && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Model</span>
                    <span className="font-medium">{selectedModel.label}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Size</span>
                    <span className="font-medium">{selectedModel.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Quality</span>
                    <span className="font-medium">{selectedModel.quality}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Speed</span>
                    <span className="font-medium">{selectedModel.speed}</span>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Model Status</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Downloaded</Badge>
                    <Button size="sm" variant="outline" onClick={handleModelUpdate}>
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Language & Audio Settings */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Language & Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Recognition Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Noise Reduction</div>
                  <div className="text-sm text-muted-foreground">
                    Filter background noise during recording
                  </div>
                </div>
                <Switch checked={noiseReduction} onCheckedChange={setNoiseReduction} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Auto-stop on Silence</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically pause recording after 30 seconds of silence
                  </div>
                </div>
                <Switch checked={autoStop} onCheckedChange={setAutoStop} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} />
              AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Auto-summarization</div>
                <div className="text-sm text-muted-foreground">
                  Generate AI summaries of transcripts automatically
                </div>
              </div>
              <Switch checked={autoSummarize} onCheckedChange={setAutoSummarize} />
            </div>

            <Separator />

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">AI Model Storage</span>
                <span className="text-sm text-muted-foreground">2.1 GB used</span>
              </div>
              <Progress value={65} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                Models are cached locally for offline processing
              </p>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone size={20} />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  Switch to dark theme for better visibility in low light
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Default Save Location
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted/50 rounded-lg p-3 font-mono text-sm">
                  {savePath}
                </div>
                <Button variant="outline" size="sm">
                  <FolderOpen size={16} className="mr-2" />
                  Browse
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download size={20} />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleExportSettings}>
                <Download size={16} className="mr-2" />
                Export Settings
              </Button>
              
              <Button variant="outline" onClick={handleBackupData}>
                <RotateCcw size={16} className="mr-2" />
                Backup Data
              </Button>
            </div>

            <Separator />

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">147 MB / 1 GB</span>
              </div>
              <Progress value={14.7} className="mb-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>48 transcripts stored locally</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-destructive">
                  Clear Cache
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-medium text-foreground">STT Voice Recorder</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">
                Built with Lovable • Powered by Whisper AI
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;