import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { WebinarRegistrationForm } from "typedb-web-schema";

const apiURLs = {
    register: `/api/webinars/register`,
};

@Injectable({
    providedIn: "root",
})
export class WebinarService {
    public data = new ReplaySubject<any>();

    constructor(private http: HttpClient) {}

    register(props: WebinarRegistrationForm) {
        this.http.post(apiURLs.register, props).subscribe((resp) => {
            console.log(resp);
        });
    }
}
