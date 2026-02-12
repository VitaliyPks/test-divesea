import { useEffect, useState } from 'react'

const useWindowSize = (): {
  windowSize: { innerWidth: number; innerHeight: number }
  desktop: boolean
} => {
  const [windowSize, setWindowSize] = useState(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }))
  const [desktop, setDesktop] = useState(windowSize.innerWidth >= 1024)

  useEffect(() => {
    const resize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      })

      setDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', resize)

    return () => window.removeEventListener('resize', resize)
  }, [])

  return { windowSize, desktop }
}

export default useWindowSize
