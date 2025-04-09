
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      content: 'สวัสดีครับ มีอะไรให้ช่วยไหมครับ?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `ขอบคุณสำหรับคำถามเกี่ยวกับ "${input}" ทางเราจะช่วยตอบคำถามของท่านโดยเร็วที่สุด`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-wangsammo-blue/10 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-wangsammo-teal to-wangsammo-blue text-white">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <CardTitle className="text-lg">AI ผู้ช่วยอัจฉริยะ</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8">
                  {msg.role === 'user' ? (
                    <>
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback><User size={16} /></AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg" alt="AI Bot" />
                      <AvatarFallback><Bot size={16} /></AvatarFallback>
                    </>
                  )}
                </Avatar>
                
                <div
                  className={`rounded-lg p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-wangsammo-blue text-white'
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  {msg.content}
                  <div className={`text-xs mt-1 ${
                    msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={16} /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-white border shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-2 border-t bg-white">
        <div className="flex w-full gap-2">
          <Input
            placeholder="พิมพ์ข้อความ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-wangsammo-blue hover:bg-wangsammo-blue/90"
          >
            <Send size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatbot;
