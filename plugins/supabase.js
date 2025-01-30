import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig(); // Access the runtimeConfig

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

  return {
    provide: {
      supabase, // Provide supabase to the app globally
    },
  };
});
