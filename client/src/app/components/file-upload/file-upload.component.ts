import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

import { PythonApiService } from '../../services/python-api.service';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import DynamicResult from '../../models/dynamicResult';


@Component({
    selector: 'file-upload',
    imports: [MatIconModule, FormsModule, ProgressSpinnerComponent],
    standalone: true,
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

    fileName = '';
    textColumnName = '';
    acceptedFileTypes = '.csv,.tsv';

    fileUploadResponse: DynamicResult;
    fileUploadProgress: number | null;
    fileUploadSub: Subscription | null;
    fileForm = new FormData();

    constructor(private _pythonApi: PythonApiService) { }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            this.fileForm.append('file', file);
        }
    }

    onSubmit(event: Event): void {
        if (this.fileName != '') {
            event.stopPropagation();
            this.initFormSubscriptions();
        }

    }

    cancelUpload(): void {
        this.fileUploadSub?.unsubscribe();
        this.fileName = '';
        this.reset();
    }

    private sendTextColName(): void {
        this._pythonApi.sendTextColName(this.textColumnName).subscribe((data) => {
            console.log(data)
        })
    }

    private initFormSubscriptions(): void {

        const upload$ = this._pythonApi.sendFile(this.fileForm).pipe(
            finalize(() => this.reset())
        );

        this.fileUploadSub = upload$.subscribe(event => {

            if (event.type == HttpEventType.UploadProgress && event.total) {
                this.fileUploadProgress = Math.round(100 * (event.loaded / event.total));
            }

            if (event.type == HttpEventType.Response) {
                this.fileUploadResponse = event.body as DynamicResult
                this.sendTextColName();
                console.log(this.fileUploadResponse)
            }
        })
    }

    private reset(): void {
        this.fileUploadProgress = null;
        this.fileUploadSub = null;
    }


}
