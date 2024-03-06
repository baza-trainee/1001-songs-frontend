import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {CacheService} from "../services/сache/сache.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    let clonedReq = req;
    const eTag = this.cacheService.getEtag(req.urlWithParams);

    if (eTag) {
      clonedReq = req.clone({ setHeaders: { 'If-None-Match': eTag } });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 304) {
          const cachedResponse = this.cacheService.get(req.urlWithParams);
          if (cachedResponse) {
            return of(new HttpResponse<object>({ body: cachedResponse, status: 200 }));
          }
        }
        return throwError(error);
      }),
      tap(event => {
        if (event instanceof HttpResponse && event.headers.has('ETag')) {
          const etag = event.headers.get('ETag');
          if (etag && event.body) {
            this.cacheService.set(req.urlWithParams, etag, event.body);
          }
        }
      })
    );
  }
}
