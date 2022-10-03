import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoinGeckoApiService } from '../coin-geko-api/coin-gecko-api.service';
import { Coin } from '../coin-geko-api/coin.interface';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PreloadCoinDataResolver } from './preload-coin-data.resolver';

describe('PreloadCoinDataResolver', () => {
  let resolver: PreloadCoinDataResolver;
  const coin: Coin = {
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

  const mockGeckoService = jasmine.createSpyObj(['getCoinInfoById']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PreloadCoinDataResolver, useClass: PreloadCoinDataResolver },
        { provide: CoinGeckoApiService, useValue: mockGeckoService },
      ],
    });
    resolver = TestBed.inject(PreloadCoinDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should call the geckoService to fetch coin details for the given id', (done) => {
    mockGeckoService.getCoinInfoById.and.returnValue(of(coin));
    const route = new ActivatedRouteSnapshot();
    spyOn(route.paramMap, 'get').and.returnValue(coin.id);

    resolver
      .resolve(route, <RouterStateSnapshot>{})
      .subscribe((returnedCoin) => {
        expect(mockGeckoService.getCoinInfoById).toHaveBeenCalledWith(coin.id);
        expect(returnedCoin).toBe(coin);
        done();
      });
  });
});
