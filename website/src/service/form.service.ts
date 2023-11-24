import { Injectable, NgZone } from "@angular/core";

import { isScullyRunning } from "@scullyio/ng-lib";
import { map, ReplaySubject, shareReplay } from "rxjs";
import { FormID, formsSchemaName, SanityHubspotForms } from "typedb-web-schema";

import { ContentService } from "./content.service";
import { HUBSPOT_PORTAL_ID, HUBSPOT_REGION } from "./marketing-tech-constants";

@Injectable({
    providedIn: "root",
})
export class FormService {
    readonly forms = new ReplaySubject<SanityHubspotForms>();
    private formScriptLoadedState = new ReplaySubject<true>();

    constructor(
        contentService: ContentService,
        private ngZone: NgZone,
    ) {
        contentService.data
            .pipe(
                map((data) => data.getDocumentByID(formsSchemaName) as SanityHubspotForms),
                shareReplay(1),
            )
            .subscribe((data) => {
                this.forms.next(data);
            });
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
            disableUntouched,
            onLoadingChange,
            onSuccess,
        }: {
            disableUntouched?: boolean;
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
                    formInstanceId: placeholderElementID,
                    target: `#${placeholderElementID}`,
                    onFormReady: (form) => {
                        if (!disableUntouched) {
                            return;
                        }
                        const submitButton = form.querySelector<HTMLInputElement>(`[type="submit"]`);
                        if (submitButton) {
                            submitButton.disabled = true;
                            submitButton.classList.add("td-button-disabled");
                            const enableButton = () => {
                                submitButton.disabled = false;
                                submitButton.classList.remove("td-button-disabled");
                                form.removeEventListener("change", enableButton);
                            };
                            form.addEventListener("change", enableButton);
                        }
                    },
                    onFormError: () => this.ngZone.run(() => onLoadingChange?.(false)),
                    onFormSubmit: () => this.ngZone.run(() => onLoadingChange?.(true)),
                    onFormSubmitted: (formEl, { submissionValues }) => {
                        this.ngZone.run(() => {
                            onLoadingChange?.(false);
                            onSuccess?.(formEl, submissionValues);
                        });
                    },
                });
            });
        });
    }
}
