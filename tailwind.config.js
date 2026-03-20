/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 黑色高级感
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-card': '#1a1a24',
        'bg-hover': '#252532',
        
        // 强调色 - 科技感
        'accent': {
          primary: '#00d4ff',
          secondary: '#7c3aed',
          success: '#10b981',
          warning: '#f59e0b',
        },
        
        // 文字
        'text-primary': '#ffffff',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-accent': '0 0 30px rgba(0, 212, 255, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}