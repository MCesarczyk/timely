import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'apps/records/src/environments/environment';

export const ApiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiUrl;
  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;
  const apiReq = req.clone({ url });
  return next(apiReq);
};
