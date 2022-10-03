import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { HttpErrorMessageInterceptorService } from './http-error-message-interceptor.service';

describe('HttpErrorMessageInterceptorService', () => {
  let snackbar: MatSnackBar;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorMessageInterceptorService,
          multi: true,
        },
      ],
    });
    snackbar = TestBed.inject(MatSnackBar);
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('calls the snackbar on error', (done) => {
    spyOn(snackbar, 'open').and.callThrough();

    client
      .get('/test')
      .pipe(
        catchError((error) => {
          expect(snackbar.open).toHaveBeenCalled();
          done();
          return of();
        })
      )
      .subscribe((response) => {});

    const request = controller.expectOne('/test');
    request.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });
});
