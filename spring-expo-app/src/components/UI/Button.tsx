import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#4f46e5' : 'white'} 
          size="small" 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primary: {
    backgroundColor: '#4f46e5', // Indigo-600
  },
  primaryText: {
    color: 'white',
  },
  secondary: {
    backgroundColor: '#e5e7eb', // Gray-200
  },
  secondaryText: {
    color: '#1f2937', // Gray-800
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4f46e5', // Indigo-600
  },
  outlineText: {
    color: '#4f46e5', // Indigo-600
  },
  danger: {
    backgroundColor: '#ef4444', // Red-500
  },
  dangerText: {
    color: 'white',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
}); 