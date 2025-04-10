
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthState } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const initialState: AuthState = {
  isLoading: true,
  session: null,
  user: null,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const { toast } = useToast();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState(prevState => ({
          ...prevState,
          session,
          user: session?.user ?? null,
          isLoading: false
        }));

        // Use setTimeout to prevent potential deadlocks
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            toast({
              title: "ลงชื่อเข้าใช้สำเร็จ",
              description: `ยินดีต้อนรับ ${session.user.email}`
            });
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prevState => ({
        ...prevState,
        session,
        user: session?.user ?? null,
        isLoading: false
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "ลงทะเบียนสำเร็จ",
        description: "ระบบได้ส่งอีเมลยืนยันไปที่อีเมลของท่านแล้ว"
      });
      
    } catch (error: any) {
      setAuthState(prevState => ({ 
        ...prevState, 
        error: error.message || "เกิดข้อผิดพลาดในการลงทะเบียน" 
      }));
      
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      setAuthState(prevState => ({ 
        ...prevState, 
        error: error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" 
      }));
      
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        variant: "destructive"
      });
    } finally {
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prevState => ({ ...prevState, isLoading: true }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "ออกจากระบบสำเร็จ",
        description: "ขอบคุณที่ใช้บริการ"
      });
      
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถออกจากระบบได้",
        variant: "destructive"
      });
    } finally {
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const getUserData = async () => {
    try {
      if (!authState.user) {
        return null;
      }
      
      const { data, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || data.user.email?.split('@')[0]
      };
      
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถดึงข้อมูลผู้ใช้ได้",
        variant: "destructive"
      });
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signUp,
        signIn,
        signOut,
        getUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
