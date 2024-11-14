import { HttpInterceptorFn } from '@angular/common/http';
import { UserStorage } from '@/core/utils/user-storage.utils';

export const authInterceptor: HttpInterceptorFn = ( req, next ) => {
  const authToken = UserStorage.getToken();
  const authReq = req.clone( {
    setHeaders: { Authorization: `Bearer ${authToken}` }
  } );
  return next( authReq );
};
