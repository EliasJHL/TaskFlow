"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
      },
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
      },
      color: {
        value: ["#22C55E9C", "#1097B994", "#D3343491", "#C7E76E91"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 2, max: 4 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#A8A8A8B7",
        opacity: 0.5,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },
    },
    detectRetina: true,
  }

  if (!init) return null

  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ 
        zIndex: 0
      }}
    >
      <Particles
        id="tsparticles"
        options={options}
      />
    </div>
  )
}
