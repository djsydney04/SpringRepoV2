import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  TouchableOpacity 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase';
import { useUserStore } from '../../store/userStore';
import { Button } from '../UI/Button';

type AuthMode = 'signin' | 'signup';

const authSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthForm: React.FC = () => {
  const { setLoading } = useUserStore();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: AuthFormValues) => {
    setIsSubmitting(true);
    setLoading(true);
    
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        Alert.alert(
          'Check your email', 
          'We sent you an email with a verification link'
        );
        setMode('signin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred during authentication');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <TouchableOpacity
            onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          >
            <Text style={styles.switchAction}>
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title={mode === 'signin' ? 'Sign in' : 'Sign up'}
            loading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.socialButtonContainer}>
          <Button
            title="Continue with Google"
            variant="outline"
            onPress={() => Alert.alert('Info', 'OAuth requires additional setup in Expo')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchText: {
    color: '#6b7280',
    fontSize: 14,
  },
  switchAction: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    color: '#ef4444',
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#6b7280',
    fontSize: 14,
  },
  socialButtonContainer: {
    marginTop: 8,
  },
}); 