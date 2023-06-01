import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

const apiURLs = {
    primary: `https://development.dev.typedb.com/api/webinars/primary`,
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
        this.http.get<{ result: any }>(apiURLs.primary).subscribe(data => {
            this.data.next(data);
        });
    }
}
