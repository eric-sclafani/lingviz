import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import DynamicResult from '../../models/dynamicResult';
import { PythonApiService } from '../../services/python-api.service';

@Component({
    selector: 'file-upload',
    imports: [MatIconModule, FormsModule, ProgressSpinnerComponent],
    standalone: true,
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
    fileName = '';
    textFieldName = 'user_review';

    // TODO: add tsv and json(lines) support
    acceptedFileTypes = '.csv';

    file:File;
    fileForm = new FormData();
    fileUploadResponse: DynamicResult;
    fileUploadProgress: number | null;
    fileUploadSub: Subscription | null;

    constructor(private _pythonApi: PythonApiService) { }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        this.file = file;
        this.fileName = file.name;
    }

    // TODO: move file validation to backend (reason: FileReader file size limit)
    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();
        try {
            this.setFormData();
            this.initFormSubscriptions();

        } catch (error) {
            // TODO: make a snackbar service to show thsis to user
            throw Error(`Validation error: ${error}`);
        }
    }

    // TODO: add remove file button

    cancelUpload(): void {
        this.fileUploadSub?.unsubscribe();
        this.fileName = '';
        this.resetUpload();
    }

    formIsValid(): boolean {
        return this.fileName != '' && this.textFieldName != '';
    }


    private initFormSubscriptions(): void {
        const upload$ = this._pythonApi
            .sendFileToPython(this.fileForm)
            .pipe(finalize(() => this.resetUpload()));

        this.fileUploadSub = upload$.subscribe((event) => {
            if (event.type == HttpEventType.UploadProgress && event.total) {
                this.fileUploadProgress = Math.round(
                    100 * (event.loaded / event.total)
                );
            }

            if (event.type == HttpEventType.Response) {
                this.fileUploadResponse = event.body as DynamicResult;
                console.log(this.fileUploadResponse);
            }
        });
    }

    private setFormData():void {
        this.fileForm = new FormData();
        this.fileForm.append('file', this.file);
        this.fileForm.append('text_field_name', this.textFieldName);
    }

    private resetUpload(): void {
        this.fileUploadProgress = null;
        this.fileUploadSub = null;
    }

    // private async validateFile(file: File): Promise<string> {
    //     return new Promise<string>((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = (event) => {
    //             const csvContent = event.target?.result as string;
    //             const lines = csvContent?.split('\n');

    //             if (lines.length === 0) {
    //                 reject('CSV file is empty');
    //             }

    //             const headers = lines[0].trim().split(',');
    //             if (headers.includes(this.textFieldName)) {
    //                 resolve(
    //                     `Text field '${this.textFieldName}' successfully found.`
    //                 );
    //             } else {
    //                 reject(
    //                     `Text field '${this.textFieldName}' not found in uploaded dataset.`
    //                 );
    //             }
    //         };


    //         reader.onerror = () => reject(reader.error);

            
    //         reader.readAsText(file);
    //     });
    // }
}
