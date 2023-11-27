import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { ContentService } from "./content.service";

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [ContentService],
})
export class ServiceModule {}
