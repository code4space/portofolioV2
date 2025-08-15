import { useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import type { Engine } from '@tsparticles/engine'
import './App.css'

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {
    // Particles loaded callback
  }, [])

  return (
    <div id="root">
      <Particles
        id="tsparticles"
      />
      <div className="content">
        <h1 className="portfolio-title">PORTFOLIO</h1>
        <p className="portfolio-subtitle">Welcome to my digital space</p>
        <button onClick={() => console.log('Portfolio button clicked')}>
          Explore My Work
        </button>
      </div>
    </div>
  )
}

export default App
