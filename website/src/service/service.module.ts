import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { WebinarService } from "./webinar.service";
import { ContentEndpointService } from "./content-endpoint.service";
import { ContentService } from "./content.service";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
    ],
    providers: [
        WebinarService,
        ContentEndpointService,
        ContentService,
    ],
})
export class ServiceModule { }
