"use client"

import { useEffect, type RefObject } from "react"

export function useVideoInView(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Keep a disabled video fully paused until its parent explicitly enables it.
    if (!enabled) {
      video.pause()
      return
    }

    let isInView = false

    const syncPlayback = () => {
      if (document.hidden || !isInView) {
        video.pause()
        return
      }

      // Muted playback is required for reliable autoplay, especially on iOS.
      video.muted = true
      video.defaultMuted = true
      void video.play().catch(() => {
        // Some browsers can reject autoplay during a transient page state.
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        syncPlayback()
      },
      { threshold: 0.1 },
    )

    const { top, bottom } = video.getBoundingClientRect()
    isInView = top < window.innerHeight && bottom > 0
    syncPlayback()
    observer.observe(video)

    document.addEventListener("visibilitychange", syncPlayback)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
      video.pause()
    }
  }, [videoRef, enabled])
}
