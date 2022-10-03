import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { Coin } from '../coin-geko-api/coin.interface';
import { CoinGeckoApiService } from '../coin-geko-api/coin-gecko-api.service';

@Injectable()
export class PreloadCoinDataResolver implements Resolve<Observable<Coin>> {
  constructor(private coinGekoApi: CoinGeckoApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Coin> {
    // null isnt a viable state so let ts know
    const coinId = <string>route.paramMap.get('id');
    return this.coinGekoApi.getCoinInfoById(coinId);
  }
}
