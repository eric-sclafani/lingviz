import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PythonApiService } from '../../services/python-api.service';
import { finalize, Observable, Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import DynamicResult from '../../models/dynamicResult';


@Component({
    selector: 'file-upload',
    imports: [MatIconModule, MatProgressSpinnerModule, FormsModule],
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

    onSubmit(): void {
        this.initUploadSubscription()
        this.sendTextColName();

    }

    private sendTextColName(): void {
        this._pythonApi.sendTextColName(this.textColumnName).subscribe((data) => {
            console.log(data)
        })
    }

    private initUploadSubscription(): void {

        const upload$ = this._pythonApi.sendFile(this.fileForm).pipe(
            finalize(() => this.reset())
        );

        this.fileUploadSub = upload$.subscribe(event => {

            if (event.type == HttpEventType.UploadProgress && event.total) {
                this.fileUploadProgress = Math.round(100 * (event.loaded / event.total));
            }

            if (event.type == HttpEventType.Response) {
                this.fileUploadResponse = event.body as DynamicResult
                console.log(this.fileUploadResponse)
            }
        })
    }



    cancelUpload(): void {
        this.fileUploadSub?.unsubscribe();
        this.fileName = '';
        this.reset();
    }

    private reset(): void {
        this.fileUploadProgress = null;
        this.fileUploadSub = null;
    }


}
