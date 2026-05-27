import { RocketIcon } from "@sanity/icons"
import { Button } from "@sanity/ui"
import { DocumentLayoutProps, useEditState } from "sanity"
import { isNetlifyBuildConfigured, useTriggerNetlifyBuild } from "../actions/triggerNetlifyBuild"

export function UpdateLiveSiteBanner(props: DocumentLayoutProps) {
    const { documentId, documentType, renderDefault } = props
    const { status, trigger } = useTriggerNetlifyBuild()
    const { draft, published } = useEditState(documentId, documentType)
    const hasUnpublishedChanges = !!draft
    const disabled = !isNetlifyBuildConfigured || status === "building" || hasUnpublishedChanges || !published

    const label =
        !isNetlifyBuildConfigured ? "Deploy live (not configured)"
        : status === "building" ? "Deploying…"
        : status === "success" ? "Deploy triggered!"
        : status === "error" ? "Deploy failed"
        : "Deploy live"

    const tone =
        status === "success" ? "positive" as const
        : status === "error" ? "critical" as const
        : "primary" as const

    return (
        <div style={{ display: "contents" }}>
            {renderDefault(props)}
            <div style={{ position: "fixed", bottom: 12, right: 140, zIndex: 30000 }}>
                <Button
                    icon={RocketIcon}
                    text={label}
                    tone={tone}
                    onClick={trigger}
                    disabled={disabled}
                    style={{ height: 25 }}
                />
            </div>
        </div>
    )
}
