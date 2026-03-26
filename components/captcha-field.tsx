"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: "light" | "dark" | "auto"
          callback?: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface CaptchaFieldProps {
  value: string
  onChange: (value: string) => void
  refreshKey?: number
}

const TURNSTILE_SCRIPT_ID = "bocra-turnstile-script"
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

export function CaptchaField({
  value,
  onChange,
  refreshKey = 0,
}: CaptchaFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onChangeRef = useRef(onChange)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!siteKey) {
      onChangeRef.current("dev-bypass")
      return
    }

    const markReady = () => setIsReady(true)

    if (window.turnstile) {
      markReady()
      return
    }

    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID,
    ) as HTMLScriptElement | null

    if (existingScript) {
      existingScript.addEventListener("load", markReady)
      return () => existingScript.removeEventListener("load", markReady)
    }

    const script = document.createElement("script")
    script.id = TURNSTILE_SCRIPT_ID
    script.src = TURNSTILE_SCRIPT_URL
    script.async = true
    script.defer = true
    script.addEventListener("load", markReady)
    document.head.appendChild(script)

    return () => script.removeEventListener("load", markReady)
  }, [siteKey])

  useEffect(() => {
    if (!siteKey || !isReady || !containerRef.current || !window.turnstile) {
      return
    }

    if (widgetIdRef.current) {
      return
    }

    onChangeRef.current("")
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      callback: (token) => onChangeRef.current(token),
      "expired-callback": () => onChangeRef.current(""),
      "error-callback": () => onChangeRef.current(""),
    })

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [isReady, siteKey])

  useEffect(() => {
    if (!siteKey || !widgetIdRef.current || !window.turnstile) {
      return
    }

    window.turnstile.reset(widgetIdRef.current)
    onChangeRef.current("")
  }, [refreshKey, siteKey])

  if (!siteKey) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-700">
        CAPTCHA is running in local bypass mode. Set{" "}
        <code className="font-mono">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> for
        production verification.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Security Check</label>
      <div ref={containerRef} />
      {!value && (
        <p className="text-xs text-muted-foreground">
          Complete CAPTCHA to submit this form.
        </p>
      )}
    </div>
  )
}

