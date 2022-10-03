import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Coin } from '../coin-geko-api/coin.interface';

@Component({
  selector: 'app-coin-by-id',
  templateUrl: './coin-by-id.component.html',
  styleUrls: ['./coin-by-id.component.scss'],
})
export class CoinByIdComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  coin: Coin = this.activatedRoute.snapshot.data['coinData'];
}
