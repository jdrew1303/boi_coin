import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { CoinMarkets } from '../coin-geko-api/coin-markets.interface';

@Component({
  selector: 'app-coins-market-data',
  templateUrl: './coins-market-data.component.html',
  styleUrls: ['./coins-market-data.component.scss'],
})
export class CoinsMarketDataComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  MARKET_DATA: CoinMarkets[] = this.activatedRoute.snapshot.data['marketData'];
  displayedColumns: string[] = [
    'image',
    'name',
    'symbol',
    'current_price',
    'high_24h',
    'low_24h',
  ];
  public dataSource = new MatTableDataSource<CoinMarkets>(this.MARKET_DATA);
}
