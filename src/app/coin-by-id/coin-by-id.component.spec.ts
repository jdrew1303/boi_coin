import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Coin } from '../coin-geko-api/coin.interface';

import { CoinByIdComponent } from './coin-by-id.component';

describe('CoinByIdComponent', () => {
  let component: CoinByIdComponent;
  let fixture: ComponentFixture<CoinByIdComponent>;

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CoinByIdComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                coinData: coin,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have coin data available through route resolver', () => {
    expect(component.coin).toBe(coin);
  });
});
