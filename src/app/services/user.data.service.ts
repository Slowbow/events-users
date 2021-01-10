import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserAdapter } from '../models/user.model';

@Injectable()
export class UserDataService {
  constructor(
    private http: HttpClient,
    private adapter: UserAdapter) { }

  get(): Observable<User[]> {
    console.log('get');
    return this.http
      .get<User[]>('users')
      .pipe(
        map((data: any[]) => data.map(item => this.adapter.adapt(item))),
        catchError(this.handleError),
      );
  }

  save(user: User): Observable<User> {
    console.log('save');
    return this.http
      .post('users',
        {
          id: user.id,
          name: user.name,
          username: user.username,         
          email: user.email,
        })
      .pipe(
        map(item => this.adapter.adapt(item)),
        catchError(this.handleError)
      );
  }

  update(user: User): Observable<any>{
    return this.http
      .put(`users/${user.id}`,
        {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        })
      .pipe(
        catchError(this.handleError)
      );
  }
// ///Dodao sam delete 
  delete (user: User): Observable<any>{
    console.log('delete');
    return this.http
      .delete(`users/${user.id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const customErrorMessage = 'An unknown error occurred!';
    return throwError(customErrorMessage);
  }
}
