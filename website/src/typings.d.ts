interface Window {
    hbspt: {
        forms: {
            create: (options: {
                portalId: string | number;
                formId: string;
                region?: string;
                target?: string;
                redirectUrl?: string;
                inlineMessage?: string;
                pageId?: string | number;
                cssRequired?: string;
                cssClass?: string;
                css?: string;
                submitText?: string;
                submitButtonClass?: string;
                errorClass?: string;
                errorMessageClass?: string;
                locale?: string;
                translations?: unknown;
                manuallyBlockedEmailDomain?: string[];
                formInstanceId?: string;
                sfdcCampaignId?: string;
                goToLectureLectureKey?: string;
                onBeforeFormInit?: (ctx: string) => void;
                // HubSpot does not include this callback in its documentation
                onFormError?: (error: string, arg1: unknown, arg2: unknown) => void;
                onFormReady?: ($form: HTMLFormElement) => void;
                onFormSubmit?: ($form: HTMLFormElement) => void;
                onBeforeFormSubmit?: (
                    $form: HTMLFormElement,
                    submissionValues: { name: string; value: unknown }[],
                ) => void;
                onFormSubmitted?: (
                    $form: HTMLFormElement,
                    data: { redirectUrl?: string; submissionValues: Record<string, unknown> },
                ) => void;
            }) => void;
        };
    };

    _hsq: string[][];

    gtag: (arg0: string, arg1: string, arg2: object) => unknown;
}
