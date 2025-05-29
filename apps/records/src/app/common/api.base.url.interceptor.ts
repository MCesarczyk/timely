import { HttpInterceptorFn } from '@angular/common/http';

export const ApiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:4000';
  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;
  const apiReq = req.clone({ url });
  return next(apiReq);
};
