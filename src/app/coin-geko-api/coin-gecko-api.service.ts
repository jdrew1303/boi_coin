import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CoinMarkets } from './coin-markets.interface';
import { Coin } from './coin.interface';

@Injectable()
export class CoinGeckoApiService {
  COIN_GEKO_BASE_URL = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  public getMarketData() {
    return this.http.get<CoinMarkets[]>(
      `${this.COIN_GEKO_BASE_URL}/coins/markets`,
      {
        params: new HttpParams()
          .set('vs_currency', 'eur')
          .set('order', 'market_cap_desc')
          .set('per_page', 10)
          .set('page', 1)
          .set('sparkline', 'false'),
      }
    );
  }

  public getCoinInfoById(id: string) {
    return this.http.get<Coin>(`${this.COIN_GEKO_BASE_URL}/coins/${id}`, {
      params: new HttpParams()
        .set('localization', 'false')
        .set('tickers', 'false')
        .set('market_data', 'true')
        .set('community_data', 'false')
        .set('developer_data', 'false')
        .set('sparkline', 'false'),
    });
  }
}
