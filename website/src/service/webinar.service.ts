import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { WebinarRegistrationForm } from "typedb-web-schema";

const apiURLs = {
    primary: `/api/webinars/primary`,
    register: `/api/webinars/register`,
};

@Injectable({
    providedIn: "root",
})
export class WebinarService {
    public data = new ReplaySubject<any>();

    constructor(private http: HttpClient) {
        // this.http.post("https://api-gateway-prod.us.airmeet.com/prod/auth", {}, { headers: { } }).subscribe(data => {
        //     this.data.next(data);
        // })
        this.http.get<{ result: any }>(apiURLs.primary).subscribe((data) => {
            this.data.next(data);
        });
    }

    register(props: WebinarRegistrationForm) {
        this.http.post(apiURLs.register, props).subscribe((resp) => {
            console.log(resp);
        });
    }
}
