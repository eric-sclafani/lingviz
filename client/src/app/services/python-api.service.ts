import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import DynamicResult from '../models/dynamicResult';

@Injectable({
    providedIn: 'root'
})
export class PythonApiService {

    private readonly apiUrl = 'http://127.0.0.1:8080/api/';

    constructor(private _http: HttpClient) { }

    public sendFile(uploadedFile: FormData) {
        // Specifying reportProgress and observe receives event objects 
        // that report the progress of the HTTP request
        return this._http.post(this.apiUrl + 'file_upload/', uploadedFile, {
            reportProgress: true,
            observe: 'events'
        })
    }

    public sendTextColName(name: string) {
        return this._http.post<DynamicResult>(this.apiUrl + 'text_col_name/', { name })
    }


}
