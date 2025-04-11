
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/types/users';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface UserProfileEditProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

// Validation schema
const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3, {
    message: 'ชื่อต้องมีความยาวอย่างน้อย 3 ตัวอักษร',
  }).max(50, {
    message: 'ชื่อต้องมีความยาวไม่เกิน 50 ตัวอักษร',
  }),
  email: z.string().email({
    message: 'รูปแบบอีเมลไม่ถูกต้อง',
  }),
  role: z.string(),
});

type FormData = z.infer<typeof userSchema>;

const UserProfileEdit: React.FC<UserProfileEditProps> = ({ user, onSave, onCancel }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (data: FormData) => {
    try {
      onSave(data as User);
    } catch (err) {
      setError('ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้งในภายหลัง');
      console.error('Error saving user profile:', err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>แก้ไขข้อมูลผู้ใช้</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>บทบาท</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 pb-0 pt-6 flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                ยกเลิก
              </Button>
              <Button type="submit">บันทึกข้อมูล</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserProfileEdit;
