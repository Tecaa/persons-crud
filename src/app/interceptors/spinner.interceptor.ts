import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor{

  count = 0;

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinner.show();
      this.count++;

      return next.handle(req)
          .pipe (finalize(() => {

                  this.count--;

                  if ( this.count === 0 ) {
                    this.spinner.hide();
                  }
              })
          );
  }

}
