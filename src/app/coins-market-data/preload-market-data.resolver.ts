import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { CoinMarkets } from '../coin-geko-api/coin-markets.interface';
import { CoinGeckoApiService } from '../coin-geko-api/coin-gecko-api.service';

@Injectable()
export class PreloadMarketDataResolver
  implements Resolve<Observable<CoinMarkets[]>>
{
  constructor(private coinGekoApi: CoinGeckoApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CoinMarkets[]> {
    return this.coinGekoApi.getMarketData();
  }
}
