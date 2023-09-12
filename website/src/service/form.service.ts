import { Injectable } from "@angular/core";
import { Observable, map, shareReplay, ReplaySubject } from "rxjs";
import { FormID, formsSchemaName, SanityHubspotForms } from "typedb-web-schema";
import { ContentService } from "./content.service";
import { HUBSPOT_PORTAL_ID, HUBSPOT_REGION } from "./analytics.service";
import { isScullyRunning } from "@scullyio/ng-lib";

@Injectable({
    providedIn: "root",
})
export class FormService {
    private readonly forms: Observable<SanityHubspotForms>;
    private formScriptLoadedState = new ReplaySubject<true>();

    constructor(contentService: ContentService) {
        this.forms = contentService.data.pipe(
            map((data) => data.getDocumentByID(formsSchemaName) as SanityHubspotForms),
            shareReplay(1),
        );
        this.loadHubspotFormsScriptTag();
    }

    private loadHubspotFormsScriptTag() {
        if (isScullyRunning()) return;

        const scriptEl = document.createElement("script");
        scriptEl.src = "//js.hsforms.net/forms/embed/v2.js";
        document.head.appendChild(scriptEl);
        scriptEl.addEventListener("load", () => {
            this.formScriptLoadedState.next(true);
        });
    }

    embedHubspotForm(
        form: FormID | string,
        placeholderElementID: string,
        {
            onLoadingChange,
            onSuccess,
        }: {
            onLoadingChange?: (val: boolean) => void;
            onSuccess?: (formEl: HTMLFormElement, submissionValues: Record<string, unknown>) => void;
        } = {},
    ) {
        this.forms.subscribe((data) => {
            const hubspotFormID = data[form as FormID] || form;
            this.formScriptLoadedState.subscribe((_) => {
                window.hbspt.forms.create({
                    region: HUBSPOT_REGION,
                    portalId: HUBSPOT_PORTAL_ID,
                    formId: hubspotFormID,
                    target: `#${placeholderElementID}`,
                    onFormError: () => onLoadingChange?.(false),
                    onFormSubmit: () => onLoadingChange?.(true),
                    onFormSubmitted: (formEl, { submissionValues }) => {
                        onLoadingChange?.(false);
                        onSuccess?.(formEl, submissionValues);
                    },
                });
            });
        });
    }
}
