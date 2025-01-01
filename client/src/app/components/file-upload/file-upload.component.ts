import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import DynamicResult from '../../models/dynamicResult';
import { PythonApiService } from '../../services/python-api.service';
import { SnackbarService } from '../../services/snackbar.service';

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

    file: File;
    fileForm = new FormData();
    fileUploadProgress: number | null;
    fileUploadSub: Subscription | null;

    constructor(
        private _pythonApi: PythonApiService,
        private _snackBar: SnackbarService
    ) {}

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        this.file = file;
        this.fileName = file.name;
    }

    async onSubmit(event: Event): Promise<void> {
        event.preventDefault();

        this.setFormData();
        const result = await this.initUploadSubscription();

        if (result.succeed) {
            this._snackBar.success(result.message);
        } else {
            this._snackBar.error(result.message);
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

    private initUploadSubscription() {
        return new Promise<DynamicResult>((resolve) => {
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
                    const response = event.body as DynamicResult;
                    resolve(response);
                    console.log(response);
                }
            });
        });
    }
    private setFormData(): void {
        this.fileForm = new FormData();
        this.fileForm.append('file', this.file);
        this.fileForm.append('text_field_name', this.textFieldName);
    }

    private resetUpload(): void {
        this.fileUploadProgress = null;
        this.fileUploadSub = null;
    }
}
