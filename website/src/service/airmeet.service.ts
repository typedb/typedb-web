import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AirmeetRegistrationForm } from "typedb-web-schema";

const apiURLs = {
    register: `/api/airmeet/register`,
};

@Injectable({
    providedIn: "root",
})
export class AirmeetService {
    constructor(private http: HttpClient) {}

    register(props: AirmeetRegistrationForm) {
        this.http.post(apiURLs.register, props).subscribe((resp) => {
            console.log(resp);
        });
    }
}
