import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 开发环境下使用模拟数据，避免网络请求错误
const isDevelopment = !supabaseUrl || supabaseUrl === 'https://demo.supabase.co';

let supabase: any;

if (isDevelopment) {
  // 创建一个模拟的Supabase客户端
  supabase = {
    from: (table: string) => {
      const resolved = Promise.resolve({ data: null, error: null });
      const listResolved = Promise.resolve({ data: [], error: null });

      const chainBuilder = () => ({
        order: () => chainBuilder(),
        limit: () => ({
          single: () => resolved,
          maybeSingle: () => resolved,
        }),
        eq: () => listResolved,
        single: () => resolved,
        maybeSingle: () => resolved,
      });

      return {
        select: () => chainBuilder(),
        insert: () => resolved,
        update: () => ({
          eq: () => resolved,
        }),
        delete: () => ({
          eq: () => resolved,
        }),
      };
    }
  };
} else {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
