import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, } from '@angular/common/http'; 
import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, Subject, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    //URL for CRUD operations
    private readonly PRODUCT_URL = environment.apiUrl+"/api/v1/product";
     //Create constructor to get Http instance
    constructor(private http:HttpClient) {
    }
    addHeaderAuth()
    {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer '+localStorage.getItem('access_token')
        });
        return headers;
    }
    getAllProducts():Observable<any>{
        return this.http
        .get(this.PRODUCT_URL, {headers: this.addHeaderAuth()})
        .pipe(
            map((res:any)=>{
              return res;
            }),
            retry(3),
            catchError( err => this.handleError(err))
        )
    }

    createProduct(postdata):Observable<any>{
        return this.http
        .post(this.PRODUCT_URL, postdata, {headers: this.addHeaderAuth()})
        .pipe(
            map((res:any)=>{
                return res;
            }),
            retry(3),
            catchError(err => this.handleError(err))
        )
    }
  
    deleteProduct(postdata):Observable<any>{
        return this.http
        .delete(this.PRODUCT_URL+"?id="+postdata, {headers: this.addHeaderAuth()})
        .pipe(
            map((res:any)=>{
                return res;
            }),
            retry(3),
            catchError(err => this.handleError(err))
        )
    }
    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          //return error.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.error(
          //   `Backend returned code ${error.status}, ` +
          //   `body was: ${error.error}`);
            return throwError(
                'Something bad happened; please try again later.');
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
    };
      
  
    
} 
