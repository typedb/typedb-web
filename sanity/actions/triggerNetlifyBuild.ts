import { useCallback, useState } from "react"

const NETLIFY_BUILD_HOOK = import.meta.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK as string | undefined

export const isNetlifyBuildConfigured = !!NETLIFY_BUILD_HOOK

export type BuildStatus = "idle" | "building" | "success" | "error"

export function useTriggerNetlifyBuild() {
    const [status, setStatus] = useState<BuildStatus>("idle")

    const trigger = useCallback(async () => {
        if (!NETLIFY_BUILD_HOOK) return
        setStatus("building")
        try {
            await fetch(NETLIFY_BUILD_HOOK, { method: "POST" })
            setStatus("success")
            setTimeout(() => setStatus("idle"), 5000)
        } catch {
            setStatus("error")
            setTimeout(() => setStatus("idle"), 5000)
        }
    }, [])

    return { status, trigger }
}
