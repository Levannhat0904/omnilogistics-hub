# Hướng dẫn sử dụng React Hook Form với Zod

## Tổng quan

Dự án sử dụng **react-hook-form** kết hợp với **zod** để quản lý form và validation. Tất cả các schema validation được đặt trong thư mục `@shared/schemas`.

## Cài đặt

Các package đã được cài đặt:
- `react-hook-form`: Quản lý form state và validation
- `@hookform/resolvers`: Resolver để tích hợp zod với react-hook-form
- `zod`: Schema validation library

## Cấu trúc Schema

Các schema được tổ chức theo feature/module:
- `auth.schema.ts`: Schema cho authentication (login, register)
- `shipment.schema.ts`: Schema cho quản lý đơn hàng
- `index.ts`: Export tất cả schema

## Cách sử dụng

### 1. Import các dependencies cần thiết

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@shared/schemas';
```

### 2. Khởi tạo form với useForm

```typescript
const {
  control,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: '',
    password: '',
  },
});
```

### 3. Xử lý submit form

```typescript
const onSubmit = async (data: LoginFormData) => {
  try {
    // Xử lý logic submit
    console.log('Form data:', data);
    // await loginAPI(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 4. Render form với Controller

```typescript
import { Controller } from 'react-hook-form';
import { TextInput, Text, View } from 'react-native';

<Controller
  control={control}
  name="email"
  render={({ field: { onChange, onBlur, value } }) => (
    <View>
      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <Text style={{ color: 'red' }}>{errors.email.message}</Text>
      )}
    </View>
  )}
/>
```

### 5. Ví dụ hoàn chỉnh

```typescript
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { loginSchema, type LoginFormData } from '@shared/schemas';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data);
      // await loginAPI(data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Mật khẩu"
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Button
        title={isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
```

## Tạo Schema mới

Khi cần tạo schema mới:

1. Tạo file mới trong `shared/schemas/` (ví dụ: `order.schema.ts`)
2. Import `z` từ `zod`
3. Định nghĩa schema với `z.object()`
4. Export schema và type:

```typescript
import { z } from 'zod';

export const orderSchema = z.object({
  // Định nghĩa các field
});

export type OrderFormData = z.infer<typeof orderSchema>;
```

5. Export từ `index.ts`:

```typescript
export * from './order.schema';
```

## Các tính năng chính

### Validation Rules

Zod cung cấp nhiều validation rules:
- `.min()`, `.max()`: Giới hạn độ dài
- `.email()`: Validate email
- `.regex()`: Pattern matching
- `.refine()`: Custom validation logic

### Type Safety

TypeScript types được tự động generate từ schema:
```typescript
type LoginFormData = z.infer<typeof loginSchema>;
```

### Error Messages

Error messages được định nghĩa trong schema và tự động hiển thị qua `errors` object.

## Best Practices

1. **Đặt tên rõ ràng**: Schema và type nên có tên mô tả rõ ràng
2. **Tái sử dụng**: Tạo các schema base và extend khi cần
3. **Validation sớm**: Validate ngay khi user nhập (onBlur) hoặc khi submit
4. **Error messages**: Sử dụng tiếng Việt cho error messages phù hợp với UX
5. **Type safety**: Luôn sử dụng type inference từ schema

## Tài liệu tham khảo

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Hookform Resolvers](https://github.com/react-hook-form/resolvers)

