"use client"

export interface AuthState {
    token: string | null
    username: string | null
    role: string | null
}

export const saveAuth = (auth: AuthState) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("bocra_auth", JSON.stringify(auth))
    }
}

export const getAuth = (): AuthState => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("bocra_auth")
        if (saved) return JSON.parse(saved)
    }
    return { token: null, username: null, role: null }
}

export const clearAuth = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("bocra_auth")
    }
}

export const getAuthHeader = () => {
    const auth = getAuth()
    return auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
}
