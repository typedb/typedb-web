import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { WebinarService } from "./webinar.service";
import { ContentEndpointService } from "./content-endpoint.service";
import { ContentService } from "./content.service";

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [ContentEndpointService, ContentService, WebinarService],
})
export class ServiceModule {}
