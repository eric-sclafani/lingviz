import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FileDropDirective } from '../../directives/file-drop.directive';
import { MatInputModule } from '@angular/material/input';
import { Dataset } from '../../models/dataset';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DatasetForm } from '../../forms/datasetForm';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-file-upload',
    imports: [
        MatButtonModule,
        MatIconModule,
        FileDropDirective,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    selectedFile: File;
    datasetForm: FormGroup<DatasetForm>;

    outputDataset = output<Dataset>();

    // progressInfos and messages will be input into component
    // progressInfos: { value: number; fileName: string }[] = [];
    // messages: string[] = [];

    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onFileDrop(file: File) {
        this.selectedFile = file;
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            this.selectedFile = target.files[0];
        }
    }

    onSubmit() {
        const data: Dataset = {
            file: this.selectedFile,
            fileName: this.selectedFile.name,
            idColName: this.datasetForm.controls.idColName.value as string,
            textColName: this.datasetForm.controls.textColName.value as string,
        };
        this.outputDataset.emit(data);
    }

    private initForm() {
        this.datasetForm = new FormGroup<DatasetForm>({
            idColName: new FormControl('', [Validators.required]),
            textColName: new FormControl('', [Validators.required]),
        });
    }

    // private sendFiles(idx: number, file: File) {
    //     this.progressInfos[idx] = { value: 0, fileName: file.name };

    //     this.pythonApi.uploadFile(file).subscribe({
    //         next: (event: any) => {
    //             if (event.type === HttpEventType.UploadProgress) {
    //                 this.progressInfos[idx].value = Math.round(
    //                     (100 * event.loaded) / event.total
    //                 );
    //             } else if (event instanceof HttpResponse) {
    //                 const msg = 'Uploaded the file successfully: ' + file.name;
    //                 this.messages.push(msg);
    //             }
    //         },
    //         error: (err: any) => {
    //             this.progressInfos[idx].value = 0;
    //             const msg = 'Could not upload the file: ' + file.name;
    //             this.messages.push(msg);
    //         },
    //     });
    // }
}
