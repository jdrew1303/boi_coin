import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoinMarkets } from '../coin-geko-api/coin-markets.interface';
import { CoinsMarketDataComponent } from './coins-market-data.component';

describe('CoinsMarketDataComponent', () => {
  let component: CoinsMarketDataComponent;
  let fixture: ComponentFixture<CoinsMarketDataComponent>;

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CoinsMarketDataComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { marketData },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinsMarketDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have market data available on init from the resolver', () => {
    expect(component.MARKET_DATA).toBe(marketData);
  });
});
