import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoinGeckoApiService } from './coin-gecko-api.service';
import { CoinMarkets } from './coin-markets.interface';
import { Coin } from './coin.interface';

describe('CoinGeckoApiService', () => {
  let service: CoinGeckoApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoinGeckoApiService],
    });
    service = TestBed.inject(CoinGeckoApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to fetch market data /coins/markets', (done) => {
    const data: CoinMarkets[] = [
      {
        id: 'bitcoin',
        image: 'http://example.com/img.jpg',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 123.4,
        high_24h: 142.4,
        low_24h: 112.4,
      },
    ];
    service.getMarketData().subscribe((marketData: CoinMarkets[]) => {
      expect(marketData.length).toBe(1);
      expect(marketData).toEqual(data);
      done();
    });

    const URL = `${service.COIN_GEKO_BASE_URL}/coins/markets`;
    const request = httpMock.expectOne((req) => {
      expect(req.url).toBe(URL);
      return true;
    });
    expect(request.request.method).toBe('GET');
    request.flush(data);
  });

  it('should be able to fetch coin data from /coins/:id', (done) => {
    const data: Coin = {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      hashing_algorithm: 'aes',
      description: {
        en: 'example',
      },
      links: {
        homepage: ['http://example.com'],
      },
      genesis_date: '03/10/2022',
      market_data: {
        market_cap: {
          eur: 123.0,
        },
      },
    };

    service.getCoinInfoById(data.id).subscribe((coinData: Coin) => {
      expect(coinData).toEqual(data);
      done();
    });

    const URL = `${service.COIN_GEKO_BASE_URL}/coins/${data.id}`;
    const request = httpMock.expectOne((req) => {
      expect(req.url).toBe(URL);
      return true;
    });
    expect(request.request.method).toBe('GET');
    request.flush(data);
  });
});
