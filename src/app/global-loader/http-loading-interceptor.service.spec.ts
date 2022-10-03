import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CovalentLoadingModule,
  TdLoadingService,
} from '@covalent/core/loading';
import { finalize } from 'rxjs';

import { HttpLoadingInterceptorService } from './http-loading-interceptor.service';

describe('HttpLoadingInterceptorService', () => {
  let loadingService: TdLoadingService;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CovalentLoadingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpLoadingInterceptorService,
          multi: true,
        },
      ],
    });
    loadingService = TestBed.inject(TdLoadingService);
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should call the loading service to notify of a request in process', (done) => {
    spyOn(loadingService, 'create').and.stub();
    spyOn(loadingService, 'register').and.stub();
    spyOn(loadingService, 'resolve').and.stub();

    client
      .get('/test')
      .pipe(finalize(() => expect(loadingService.resolve).toHaveBeenCalled()))
      .subscribe((response) => {
        expect(loadingService.create).toHaveBeenCalled();
        expect(loadingService.register).toHaveBeenCalled();
        done();
      });

    const request = controller.expectOne('/test');
    request.flush({});
  });
});
