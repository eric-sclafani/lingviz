import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import DynamicResult from '../models/dynamicResult';
import { PYTHON_API_URL } from '../app.config';

@Injectable({
    providedIn: 'root',
})
export class PythonApiService {
    constructor(
        private _http: HttpClient,
        @Inject(PYTHON_API_URL) public apiUrl: string
    ) {}

    public sendFileToPython(formData: FormData) {
        return this._http.post(this.apiUrl + 'file_upload/', formData, {
            reportProgress: true,
            observe: 'events',
        });
    }
}
