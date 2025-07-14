import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Plus,
  File,
  FileText,
  FileImage,
  FileVideo,
  Download,
  Share,
  MoreVertical,
  Folder,
  Upload,
  Grid3X3,
  List
} from 'lucide-react';

const documents = [
  { id: 1, name: 'Project Requirements.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago', owner: 'John Doe', folder: 'Projects' },
  { id: 2, name: 'Design Mockups.fig', type: 'figma', size: '15.6 MB', modified: '4 hours ago', owner: 'Jane Smith', folder: 'Design' },
  { id: 3, name: 'Meeting Notes.docx', type: 'doc', size: '1.2 MB', modified: '1 day ago', owner: 'Mike Johnson', folder: 'Meetings' },
  { id: 4, name: 'Budget Spreadsheet.xlsx', type: 'excel', size: '3.8 MB', modified: '2 days ago', owner: 'Sarah Wilson', folder: 'Finance' },
  { id: 5, name: 'Logo Assets.zip', type: 'zip', size: '12.3 MB', modified: '3 days ago', owner: 'Emily Davis', folder: 'Assets' },
  { id: 6, name: 'Presentation.pptx', type: 'ppt', size: '8.7 MB', modified: '1 week ago', owner: 'David Brown', folder: 'Presentations' },
];

const folders = [
  { id: 1, name: 'Projects', files: 12, modified: '2 hours ago' },
  { id: 2, name: 'Design', files: 8, modified: '4 hours ago' },
  { id: 3, name: 'Meetings', files: 15, modified: '1 day ago' },
  { id: 4, name: 'Finance', files: 6, modified: '2 days ago' },
  { id: 5, name: 'Assets', files: 24, modified: '3 days ago' },
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc': case 'docx': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'excel': case 'xlsx': return <FileText className="h-8 w-8 text-green-500" />;
      case 'ppt': case 'pptx': return <FileText className="h-8 w-8 text-orange-500" />;
      case 'figma': return <FileImage className="h-8 w-8 text-purple-500" />;
      case 'zip': return <File className="h-8 w-8 text-gray-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'destructive';
      case 'doc': case 'docx': return 'default';
      case 'excel': case 'xlsx': return 'secondary';
      case 'ppt': case 'pptx': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage and organize your team's documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button className="self-start sm:self-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">Documents</SelectItem>
              <SelectItem value="excel">Spreadsheets</SelectItem>
              <SelectItem value="ppt">Presentations</SelectItem>
              <SelectItem value="figma">Design Files</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Folders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Folder className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{folder.name}</p>
                    <p className="text-sm text-muted-foreground">{folder.files} files</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium line-clamp-1">{doc.name}</CardTitle>
                        <Badge variant={getFileTypeColor(doc.type)} className="text-xs mt-1">
                          {doc.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modified:</span>
                      <span>{doc.modified}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Owner:</span>
                      <span>{doc.owner}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <Badge variant={getFileTypeColor(doc.type)} className="text-xs mt-1">
                          {doc.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Size: {doc.size}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Modified: {doc.modified}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Owner: {doc.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}