import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FileDropDirective } from '../../directives/file-drop.directive';
import { PythonApiService } from '../../services/python-api.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-file-upload',
    imports: [
        MatButtonModule,
        MatIconModule,
        FileDropDirective,
        MatProgressSpinnerModule,
    ],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
    private readonly pythonApi = inject(PythonApiService);
    private selectedFiles: File[] = [];

    progressInfos: { value: number; fileName: string }[] = [];
    messages: string[] = [];

    // https://css-tricks.com/drag-and-drop-file-uploading/
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }

    ngOnInit(): void {}

    onFileDrop(files: FileList) {
        this.selectedFiles.push(...files);
        this.uploadFiles();
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const files: FileList = target.files;
            this.selectedFiles.push(...files);
        }
        this.uploadFiles();
    }

    private uploadFiles() {
        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.sendFiles(i, this.selectedFiles[i]);
        }
    }

    private sendFiles(idx: number, file: File) {
        this.progressInfos[idx] = { value: 0, fileName: file.name };

        this.pythonApi.uploadFile(file).subscribe({
            next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progressInfos[idx].value = Math.round(
                        (100 * event.loaded) / event.total,
                    );
                } else if (event instanceof HttpResponse) {
                    const msg = 'Uploaded the file successfully: ' + file.name;
                    this.messages.push(msg);
                }
            },
            error: (err: any) => {
                this.progressInfos[idx].value = 0;
                const msg = 'Could not upload the file: ' + file.name;
                this.messages.push(msg);
            },
        });
    }
}
