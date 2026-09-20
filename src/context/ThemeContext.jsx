import { createContext, useContext, useState, useEffect } from 'react'
import { LuWaves, LuBot, LuLeaf } from 'react-icons/lu'
import { TbOm } from 'react-icons/tb'

export const THEMES = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    shortName: 'Ocean',
    icon: <LuWaves />,
    color: '#38bdf8',
    description: 'Deep ocean diving with sharks, starfish & marine life',
  },
  {
    id: 'baba',
    name: 'Karma Coder',
    shortName: 'Karma Coder',
    icon: <TbOm />,
    color: '#ff7700',
    description: 'What you deploy comes back to you',
  },
  {
    id: 'robotic',
    name: 'Robotic',
    shortName: 'Robotic',
    icon: <LuBot />,
    color: '#00ffaa',
    description: 'Cyber-mech with floating robotic & circuit elements',
  },
  {
    id: 'emerald',
    name: 'Emerald Classic',
    shortName: 'Emerald',
    icon: <LuLeaf />,
    color: '#00d68f',
    description: 'Original lush emerald green aesthetic',
  },
]

const ThemeContext = createContext({
  theme: 'blue',
  setTheme: () => {},
  themes: THEMES,
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('rahul-portfolio-theme')
      return saved && THEMES.some(t => t.id === saved) ? saved : 'blue'
    } catch {
      return 'blue'
    }
  })

  const setTheme = (newTheme) => {
    setThemeState(newTheme)
    try {
      localStorage.setItem('rahul-portfolio-theme', newTheme)
    } catch {
      // ignore storage errors
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
