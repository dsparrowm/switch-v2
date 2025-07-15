import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Hash,
  Lock,
  Users
} from 'lucide-react';
import { mockUsers } from '@/data/mockData';

const channels = [
  { id: 1, name: 'general', type: 'channel', members: 12, unread: 3 },
  { id: 2, name: 'development', type: 'channel', members: 8, unread: 0 },
  { id: 3, name: 'design', type: 'channel', members: 5, unread: 1 },
  { id: 4, name: 'marketing', type: 'channel', members: 6, unread: 0 },
  { id: 5, name: 'project-alpha', type: 'private', members: 4, unread: 2 },
];

const messages = [
  { id: 1, user: mockUsers[0], content: 'Hey everyone! Just wanted to share the latest updates on our project.', timestamp: '10:30 AM', type: 'text' },
  { id: 2, user: mockUsers[1], content: 'Great work on the dashboard! The new design looks amazing.', timestamp: '10:32 AM', type: 'text' },
  { id: 3, user: mockUsers[2], content: 'I\'ve uploaded the latest mockups to the shared drive.', timestamp: '10:35 AM', type: 'text' },
  { id: 4, user: mockUsers[0], content: 'Thanks! Let me know if you need any changes.', timestamp: '10:37 AM', type: 'text' },
  { id: 5, user: mockUsers[3], content: 'Can we schedule a meeting to discuss the next sprint?', timestamp: '10:40 AM', type: 'text' },
];

export default function Messages() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-1">
            <div className="text-sm font-medium text-muted-foreground mb-2">CHANNELS</div>
            {filteredChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full text-left p-2 rounded-md transition-colors flex items-center justify-between ${
                  selectedChannel.id === channel.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  {channel.type === 'channel' ? (
                    <Hash className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  <span className="text-sm">{channel.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{channel.members}</span>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedChannel.type === 'channel' ? (
              <Hash className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
            <div>
              <h3 className="font-semibold">{selectedChannel.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedChannel.members} members
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.user.avatar} alt={message.user.name} />
                  <AvatarFallback>
                    {message.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Input
                placeholder={`Message #${selectedChannel.name}`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}