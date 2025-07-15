import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DynamicResult } from '../models/dynamicResult';

@Injectable({
    providedIn: 'root',
})
export class PythonApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://127.0.0.1:8000/api/';

    // private handleError(error: HttpErrorResponse) {
    //     return throwError(() => error);
    // }

    // private get<T>(url: string): Observable<DynamicResult<T>> {
    //     return this.http.get<DynamicResult<T>>(this.baseUrl + url);
    // }

    // private post<T>(url: string, data: any): Observable<DynamicResult<T>> {
    //     return this.http
    //         .post<DynamicResult<T>>(this.baseUrl + url, data)
    //         .pipe(catchError(this.handleError));
    // }

    public uploadFile(file: File) {
        const fileFormData = new FormData();
        fileFormData.append('file', file);
        return this.http.post<HttpEvent<any>>(
            this.baseUrl + 'fileupload/',
            fileFormData,
            {
                observe: 'events',
                reportProgress: true,
                responseType: 'json',
            },
        );
    }
}
