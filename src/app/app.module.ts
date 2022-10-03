import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';

import { AppComponent } from './app.component';
import { CoinsMarketDataComponent } from './coins-market-data/coins-market-data.component';
import { CoinByIdComponent } from './coin-by-id/coin-by-id.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HttpLoadingInterceptorService } from './global-loader/http-loading-interceptor.service';
import { HttpErrorMessageInterceptorService } from './global-loader/http-error-message-interceptor.service';

import { CoinGeckoApiService } from './coin-geko-api/coin-gecko-api.service';

import { PreloadMarketDataResolver } from './coins-market-data/preload-market-data.resolver';
import { PreloadCoinDataResolver } from './coin-by-id/preload-coin-data.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'markets' },
  { path: 'coins', pathMatch: 'full', redirectTo: 'markets' },

  {
    path: 'markets',
    component: CoinsMarketDataComponent,
    title: 'Markets',
    resolve: { marketData: PreloadMarketDataResolver },
  },
  {
    path: 'coins/:id',
    component: CoinByIdComponent,
    title: 'Coin Detail',
    resolve: { coinData: PreloadCoinDataResolver },
  },

  { path: '404', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CoinsMarketDataComponent,
    CoinByIdComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    RouterModule.forRoot(routes),

    // ui components
    BrowserAnimationsModule,

    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,

    CovalentLayoutModule,
    CovalentLoadingModule,
    CovalentBreadcrumbsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptorService,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorMessageInterceptorService,
      multi: true,
    },

    { provide: CoinGeckoApiService, useClass: CoinGeckoApiService },
    { provide: PreloadMarketDataResolver, useClass: PreloadMarketDataResolver },
    { provide: PreloadCoinDataResolver, useClass: PreloadCoinDataResolver },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
