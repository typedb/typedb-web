import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { ContentEndpointService } from "./content-endpoint.service";
import { ContentService } from "./content.service";

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [ContentEndpointService, ContentService],
})
export class ServiceModule {}
