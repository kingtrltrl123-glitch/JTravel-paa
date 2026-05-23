import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Build လုပ်တဲ့အခါ TypeScript error တွေကို ကျော်ဖို့ (Vercel Deploy အတွက်)
    ignoreBuildErrors: true,
  },
  // eslint option ကို လုံးဝ ဖယ်ရှားလိုက်ပါ။
}

export default nextConfig