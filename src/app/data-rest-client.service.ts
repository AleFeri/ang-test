import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from "./employee/employee";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class DataRestClientService {
    handleError: any;
    HttpOptions = {
        headers:new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
   public apiUrl = "http://localhost:8080/api/tutorial/1.0/employees";
    
    constructor(private http: HttpClient) {
    }

    getDataRows(apiURL:string): Observable<Employee> {
        return this.http.get<Employee>(apiURL)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }
    creteEmployee(apiURL:string, employee:Employee): Observable<Employee> {
        return this.http.post<Employee>(apiURL, JSON.stringify(employee), this.HttpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }
    deleteEmployee(apiURL:string, id: number): Observable<Employee> {
        return this.http.delete<Employee>(apiURL+'/'+id, this.HttpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

}