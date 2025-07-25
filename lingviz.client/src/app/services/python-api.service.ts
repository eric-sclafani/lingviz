import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DynamicResult } from '../models/dynamicResult';
import { Dataset } from '../models/dataset';

@Injectable({
    providedIn: 'root',
})
export class PythonApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://127.0.0.1:8000/api/';

    selectedTab = 0;

    public uploadData(dataset: Dataset) {
        const form = new FormData();
        form.append('file', dataset.file);

        return this.http.post<HttpEvent<any>>(
            this.baseUrl +
                `dataUpload/?textColName=${dataset.textColName}&idColName=${dataset.idColName}`,
            form,
            {
                observe: 'events',
                reportProgress: true,
                responseType: 'json',
            },
        );
    }
}
