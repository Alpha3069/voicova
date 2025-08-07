import { useState } from "react";
import { Search as SearchIcon, Filter, Calendar, Tag, Clock, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const availableTags = ["Meeting", "Lecture", "Interview", "Note", "Memo", "Call"];
  
  const mockResults = [
    {
      id: "1",
      title: "Morning Team Meeting",
      snippet: "Discussed quarterly goals and project timelines. The development team has made significant progress...",
      date: "2024-01-15",
      duration: "12:34",
      tag: "Meeting",
      matchCount: 3
    },
    {
      id: "2",
      title: "AI Ethics Lecture",
      snippet: "Introduction to ethical considerations in artificial intelligence and machine learning applications...",
      date: "2024-01-14",
      duration: "45:20",
      tag: "Lecture",
      matchCount: 2
    },
    {
      id: "3",
      title: "Client Call - Project Updates",
      snippet: "Reviewed project milestones with the client and discussed upcoming deliverables for next quarter...",
      date: "2024-01-13",
      duration: "28:15",
      tag: "Call",
      matchCount: 1
    },
    {
      id: "4",
      title: "Interview - Senior Developer",
      snippet: "Technical interview focusing on system design and problem-solving capabilities. Candidate showed...",
      date: "2024-01-12",
      duration: "35:42",
      tag: "Interview",
      matchCount: 2
    }
  ];

  const getTagColor = (tag: string) => {
    const colors = {
      Meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Lecture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Note: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Memo: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Call: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    };
    return colors[tag as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  };

  const filteredResults = mockResults.filter(result => {
    const matchesSearch = !searchTerm || 
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || selectedTags.includes(result.tag);
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card shadow-elegant p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-4">Search Transcripts</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search across all transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Tag Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Tag size={14} />
                  Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Filter by tags</h4>
                  {availableTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <label htmlFor={tag} className="text-sm font-medium cursor-pointer">
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar size={14} />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateFrom,
                    to: dateTo
                  }}
                  onSelect={(range) => {
                    setDateFrom(range?.from);
                    setDateTo(range?.to);
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="relevance">Relevance</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2"
              >
                <ArrowUpDown size={14} />
              </Button>
            </div>

            {/* Clear Filters */}
            {(selectedTags.length > 0 || dateFrom || dateTo) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedTags([]);
                  setDateFrom(undefined);
                  setDateTo(undefined);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Search Results ({filteredResults.length})
            </h2>
          </div>

          {filteredResults.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <SearchIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Link key={result.id} to={`/transcript/${result.id}`}>
                  <Card className="border-0 shadow-sm hover:shadow-elegant transition-smooth hover:scale-[1.01] active:scale-95">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 
                            className="font-semibold text-foreground mb-2 leading-tight"
                            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result.title) }}
                          />
                          <p 
                            className="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(result.snippet) }}
                          />
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <Badge className={getTagColor(result.tag)}>
                            {result.tag}
                          </Badge>
                          {searchTerm && (
                            <Badge variant="outline" className="text-xs">
                              {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {result.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Search;