import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    LeafletMarkerClusterModule,
    provideRouter(routes)]
};
