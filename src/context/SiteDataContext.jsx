import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../api/client.js'

const SiteDataContext = createContext()

export function SiteDataProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const [s, c] = await Promise.all([api.getSettings(), api.getContent()])
      setSettings(s)
      const contentMap = {}
      c.forEach(section => { contentMap[section.section_key] = section })
      setContent(contentMap)
    } catch (err) {
      console.error('Failed to load site data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return (
    <SiteDataContext.Provider value={{ settings, content, loading, refresh }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  return useContext(SiteDataContext)
}
