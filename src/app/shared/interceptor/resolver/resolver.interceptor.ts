import { HttpInterceptorFn } from '@angular/common/http';

export const resolverInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
