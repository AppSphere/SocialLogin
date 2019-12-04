import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastService } from '../toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    public toast: ToastService,
  ) { }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error && error.error && error.error.errorMessage) {
        this.toast.presentToast(error.error.errorMessage, 'danger');
      } else {
        this.toast.presentToast(operation, 'danger');
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.error.errorMessage}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
