/**
 * Input Component
 * Reusable input component với icon, error handling, và password toggle
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

import { BorderColors, Colors, NeutralColors, SecondaryColors, StatusColors } from '@shared/constants/colors';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: FieldError | undefined;
  control?: Control<any>;
  name?: string;
  showPasswordToggle?: boolean;
  containerStyle?: any;
  disabled?: boolean;
}

/**
 * Standalone Input (không dùng với react-hook-form)
 */
export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  showPasswordToggle = false,
  containerStyle,
  disabled = false,
  secureTextEntry,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry && showPasswordToggle;

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={NeutralColors.gray500}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={NeutralColors.gray400}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          editable={!disabled}
          {...textInputProps}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={NeutralColors.gray500}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

/**
 * Controlled Input với react-hook-form
 */
interface ControlledInputProps extends Omit<InputProps, 'control' | 'name' | 'value' | 'onChangeText' | 'onBlur'> {
  control: Control<any>;
  name: string;
}

export const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  ...inputProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          {...inputProps}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          error={error}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SecondaryColors.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BorderColors.border,
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: StatusColors.destructive,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.foreground,
    paddingVertical: 14,
    paddingRight: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: StatusColors.destructive,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});

