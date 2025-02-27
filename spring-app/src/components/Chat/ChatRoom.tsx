import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/store/useUserStore';
import { Message } from '@/lib/supabaseClient';
import { formatRelativeTime } from '@/lib/utils';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatRoomProps {
  activityId: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ activityId }) => {
  const { user } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom of the chat whenever messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Load initial messages and subscribe to new ones
  useEffect(() => {
    setLoading(true);
    
    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('activity_id', activityId)
          .order('created_at', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    // Real-time subscription
    const subscription = supabase
      .channel(`messages:activity_id=eq.${activityId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `activity_id=eq.${activityId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((current) => [...current, newMessage]);
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [activityId]);
  
  // Send a new message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !newMessage.trim()) {
      return;
    }
    
    setSending(true);
    
    try {
      const { error } = await supabase.from('messages').insert({
        content: newMessage.trim(),
        activity_id: activityId,
        sender_id: user.id,
        created_at: new Date().toISOString(),
      });
      
      if (error) {
        throw error;
      }
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };
  
  // Group messages by date for easier reading
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach((message) => {
      const date = new Date(message.created_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate(messages);
  
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(messageGroups).map(([date, messages]) => (
          <div key={date} className="space-y-4">
            <div className="sticky top-0 z-10 flex justify-center">
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                {date}
              </span>
            </div>
            
            {messages.map((message) => {
              const isCurrentUser = message.sender_id === user?.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
                      }`}
                    >
                      {formatRelativeTime(message.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
            <p>No messages yet</p>
            <p className="mt-2">Start the conversation!</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form
        onSubmit={sendMessage}
        className="border-t border-gray-200 bg-white p-4"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            disabled={sending || !user}
          />
          <button
            type="submit"
            className="flex h-full items-center rounded-r-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-400"
            disabled={sending || !newMessage.trim() || !user}
          >
            {sending ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 