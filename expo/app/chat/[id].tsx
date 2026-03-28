import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Send } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { TYPOGRAPHY } from '@/constants/typography';
import { Header } from '@/components/Header';
import { AIChatBubble } from '@/components/AIChatBubble';
import { UserChatBubble } from '@/components/UserChatBubble';
import { Button } from '@/components/Button';
import { MOCK_EVENTS } from '@/mocks/events';
import { useUserStore } from '@/store/userStore';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  
  const scrollViewRef = useRef<ScrollView>(null);
  
  const event = MOCK_EVENTS.find(e => e.id === id);
  
  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addMessage('ai', `Hi ${user?.name || 'there'}! I'm excited you're joining the ${event?.title || 'event'}. Let me help you prepare for a great experience.`);
      
      setTimeout(() => {
        addMessage('ai', 'First, do you have any dietary restrictions or preferences I should know about?');
        setOnboardingStep(1);
      }, 1000);
    }, 500);
  }, []);
  
  const addMessage = (sender: 'user' | 'ai', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    addMessage('user', userMessage);
    setMessage('');
    setIsTyping(true);
    
    // Process based on onboarding step
    setTimeout(() => {
      processUserResponse(userMessage);
    }, 1000);
  };
  
  const processUserResponse = (userMessage: string) => {
    switch (onboardingStep) {
      case 1: // Dietary preferences
        setPreferences(prev => ({ ...prev, dietary: userMessage }));
        setIsTyping(false);
        addMessage('ai', `Thanks for sharing! I'll make sure to note your dietary preferences: "${userMessage}".`);
        
        setTimeout(() => {
          addMessage('ai', 'What kind of social energy are you bringing to this event? Are you looking to be the life of the party, or more interested in deeper one-on-one conversations?');
          setOnboardingStep(2);
        }, 1000);
        break;
        
      case 2: // Social energy
        setPreferences(prev => ({ ...prev, socialEnergy: userMessage }));
        setIsTyping(false);
        addMessage('ai', `Got it! Your social style: "${userMessage}".`);
        
        setTimeout(() => {
          addMessage('ai', 'Last question: What topics are you most interested in discussing with other attendees?');
          setOnboardingStep(3);
        }, 1000);
        break;
        
      case 3: // Conversation topics
        setPreferences(prev => ({ ...prev, topics: userMessage }));
        setIsTyping(false);
        addMessage('ai', `Perfect! I'll remember that you're interested in discussing: "${userMessage}".`);
        
        setTimeout(() => {
          addMessage('ai', "Based on your preferences, I think you'll have a great time at this event! I've found several attendees who share your interests.");
          
          setTimeout(() => {
            addMessage('ai', "I've prepared everything for your arrival. You're all set to have a wonderful experience!");
            setOnboardingStep(4);
          }, 1500);
        }, 1500);
        break;
        
      default:
        setIsTyping(false);
        addMessage('ai', "I'm here to help if you have any other questions about the event!");
        break;
    }
  };
  
  const handleComplete = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Header title={event?.title || 'Event Chat'} showBack />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            msg.sender === 'user' ? (
              <UserChatBubble key={msg.id} message={msg.text} />
            ) : (
              <AIChatBubble key={msg.id} message={msg.text} />
            )
          ))}
          
          {isTyping && (
            <AIChatBubble message="" isTyping />
          )}
          
          {onboardingStep === 4 && (
            <View style={styles.completeContainer}>
              <Button 
                title="Complete Setup" 
                onPress={handleComplete} 
                variant="primary"
                style={styles.completeButton}
              />
            </View>
          )}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor={COLORS.mediumGray}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]} 
            onPress={handleSend}
            disabled={!message.trim() || isTyping}
          >
            <Send size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 48,
    maxHeight: 100,
    ...TYPOGRAPHY.body,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.mediumGray,
  },
  completeContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  completeButton: {
    paddingHorizontal: 32,
  },
});