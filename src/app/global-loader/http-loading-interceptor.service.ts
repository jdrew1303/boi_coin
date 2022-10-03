import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  TdLoadingService,
  LoadingMode,
  LoadingType,
} from '@covalent/core/loading';

@Injectable()
export class HttpLoadingInterceptorService implements HttpInterceptor {
  HTTP_LOADING = 'httpLoading';

  constructor(private loadingService: TdLoadingService) {
    this.loadingService.create({
      name: this.HTTP_LOADING,
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.register(this.HTTP_LOADING);

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.resolve(this.HTTP_LOADING);
      })
    );
  }
}
