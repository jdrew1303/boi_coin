import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { CoinGeckoApiService } from '../coin-geko-api/coin-gecko-api.service';
import { CoinMarkets } from '../coin-geko-api/coin-markets.interface';

import { PreloadMarketDataResolver } from './preload-market-data.resolver';

describe('PreloadMarketDataResolver', () => {
  let resolver: PreloadMarketDataResolver;

  const marketData: CoinMarkets[] = [
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

  const mockGeckoService = jasmine.createSpyObj(['getMarketData']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PreloadMarketDataResolver,
          useClass: PreloadMarketDataResolver,
        },
        { provide: CoinGeckoApiService, useValue: mockGeckoService },
      ],
    });
    resolver = TestBed.inject(PreloadMarketDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should fetch the mcoin market data', (done) => {
    mockGeckoService.getMarketData.and.returnValue(of(marketData));

    resolver
      .resolve(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})
      .subscribe((data) => {
        expect(data).toBe(marketData);
        done();
      });
  });
});
