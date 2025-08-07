import { useState } from "react";
import { FolderOpen, Grid3X3, List, MoreVertical, Trash2, Edit3, Archive, Download, Tag, Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Library = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [filterTag, setFilterTag] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const mockTranscripts = [
    {
      id: "1",
      title: "Morning Team Meeting",
      date: "2024-01-15",
      duration: "12:34",
      size: "2.4 MB",
      tag: "Meeting",
      summary: "Discussed quarterly goals and project timelines",
      wordCount: 1250
    },
    {
      id: "2", 
      title: "AI Ethics Lecture",
      date: "2024-01-14",
      duration: "45:20",
      size: "8.1 MB",
      tag: "Lecture",
      summary: "Introduction to ethical considerations in AI",
      wordCount: 4800
    },
    {
      id: "3",
      title: "Client Interview - Sarah M.",
      date: "2024-01-13",
      duration: "28:15",
      size: "5.2 MB",
      tag: "Interview",
      summary: "Technical interview for senior developer role",
      wordCount: 2100
    },
    {
      id: "4",
      title: "Project Planning Session",
      date: "2024-01-12",
      duration: "35:42",
      size: "6.8 MB",
      tag: "Meeting",
      summary: "Q2 project roadmap and resource allocation",
      wordCount: 2800
    },
    {
      id: "5",
      title: "Voice Memo - Ideas",
      date: "2024-01-11",
      duration: "05:30",
      size: "1.1 MB",
      tag: "Note",
      summary: "Random thoughts and feature ideas",
      wordCount: 420
    },
    {
      id: "6",
      title: "Conference Call with Vendors",
      date: "2024-01-10",
      duration: "22:18",
      size: "4.3 MB",
      tag: "Call",
      summary: "Vendor selection for new infrastructure",
      wordCount: 1650
    }
  ];

  const tags = ["all", "Meeting", "Lecture", "Interview", "Note", "Call"];

  const getTagColor = (tag: string) => {
    const colors = {
      Meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Lecture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Note: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Call: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  const filteredTranscripts = mockTranscripts.filter(transcript => {
    const matchesSearch = !searchTerm || 
      transcript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === "all" || transcript.tag === filterTag;
    
    return matchesSearch && matchesTag;
  });

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `${action} completed`,
      description: `Applied to ${selectedItems.length} items`,
    });
    setSelectedItems([]);
  };

  const handleItemAction = (action: string, title: string) => {
    toast({
      title: `${action} completed`,
      description: `Applied to "${title}"`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-4">Transcript Library</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transcripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag === "all" ? "All Tags" : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List size={16} />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid3X3 size={16} />
              </Button>
              
              <span className="text-sm text-muted-foreground ml-4">
                {filteredTranscripts.length} transcripts
              </span>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("Export")}
                >
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("Archive")}
                >
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction("Delete")}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Results */}
        {filteredTranscripts.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <FolderOpen size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium text-foreground mb-2">No transcripts found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterTag !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Start recording to see your transcripts here"
                }
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "list" ? (
          
          /* List View */
          <div className="space-y-3">
            {filteredTranscripts.map((transcript) => (
              <Card key={transcript.id} className="border-0 shadow-sm hover:shadow-elegant transition-smooth">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedItems.includes(transcript.id)}
                      onCheckedChange={() => toggleItemSelection(transcript.id)}
                    />
                    
                    <Link to={`/transcript/${transcript.id}`} className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1 hover:text-primary transition-smooth">
                            {transcript.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                            {transcript.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(transcript.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              {transcript.duration}
                            </div>
                            <span>{transcript.size}</span>
                            <span>{transcript.wordCount} words</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={getTagColor(transcript.tag)}>
                            {transcript.tag}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleItemAction("Edit", transcript.title)}>
                          <Edit3 size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemAction("Download", transcript.title)}>
                          <Download size={14} className="mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemAction("Archive", transcript.title)}>
                          <Archive size={14} className="mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleItemAction("Delete", transcript.title)}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTranscripts.map((transcript) => (
              <Card key={transcript.id} className="border-0 shadow-sm hover:shadow-elegant transition-smooth group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Checkbox
                      checked={selectedItems.includes(transcript.id)}
                      onCheckedChange={() => toggleItemSelection(transcript.id)}
                    />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1 opacity-0 group-hover:opacity-100 transition-smooth">
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleItemAction("Edit", transcript.title)}>
                          <Edit3 size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemAction("Download", transcript.title)}>
                          <Download size={14} className="mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemAction("Archive", transcript.title)}>
                          <Archive size={14} className="mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleItemAction("Delete", transcript.title)}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Link to={`/transcript/${transcript.id}`}>
                    <div className="mb-3">
                      <Badge className={`${getTagColor(transcript.tag)} mb-2`}>
                        <Tag size={10} className="mr-1" />
                        {transcript.tag}
                      </Badge>
                      <h3 className="font-medium text-foreground mb-2 line-clamp-2 hover:text-primary transition-smooth">
                        {transcript.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {transcript.summary}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(transcript.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          {transcript.duration}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{transcript.size}</span>
                        <span>{transcript.wordCount} words</span>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Library;