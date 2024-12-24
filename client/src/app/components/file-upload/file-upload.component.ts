import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PythonApiService } from '../../services/python-api.service';
import { finalize, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';


@Component({
    selector: 'file-upload',
    imports: [MatIconModule, MatProgressBarModule],
    standalone: true,
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

    fileName = '';
    acceptedFileTypes = '.csv,.tsv';
    uploadProgress: number | null;
    uploadSub: Subscription | null

    constructor(private _pythonApi: PythonApiService) { }

    onFileSelected(event: any) {

        const file: File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);

            const upload$ = this._pythonApi.sendFileUpload(formData).pipe(
                finalize(() => this.reset())
            );

            this.uploadSub = upload$.subscribe(event => {
                if (event.type == HttpEventType.UploadProgress && event.total) {
                    this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                }

                if (event.type == HttpEventType.Response) {
                    console.log(event.body)
                }
            })
        }
    }



    cancelUpload() {
        this.uploadSub?.unsubscribe();
        this.fileName = '';
        this.reset();
    }

    private reset() {
        this.uploadProgress = null;
        this.uploadSub = null;
    }


}
