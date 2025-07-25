import { Component, inject } from '@angular/core';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { Dataset } from '../../models/dataset';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { PythonApiService } from '../../services/python-api.service';
import { DocumentListComponent } from '../../components/document-list/document-list.component';
import { Document } from '../../models/document';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-home',
    imports: [
        FileUploadComponent,
        MatTabsModule,
        MatIconModule,
        DocumentListComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    private readonly pythonApi = inject(PythonApiService);

    selectedIndex = 0;

    fileUploaded = true;
    progressInfo = { value: 0, fileName: '' };
    fileUploadMsg = '';

    onDatasetClientUpload(dataset: Dataset) {
        this.pythonApi.uploadData(dataset).subscribe((resp) => {
            this.fileUploaded = true;
            // this.selectedIndex = 1;

            if (resp.type == HttpEventType.Response) {
                console.log(resp);
            }
        });
    }

    testDocs = (): Document[] => [
        {
            id: '582110448',
            text: 'this is my text lol. It is a nice text used for testing my components.',
        },
        {
            id: '047291233',
            text: 'Another testing sentence. This one is slightly longer than the first one. Cheers to that!',
        },
        {
            id: '201662277',
            text: 'I love programming because its fun to design systems and feels good when the pieces fall into place.',
        },
        {
            id: '301988873',
            text: 'Sometimes though, programming can be very tedious, especially when things break for unknown reasons.',
        },
        {
            id: '494830209',
            text: 'I feel like my programming skills have increased tenfold since starting this job, however. For that, I am very grateful.',
        },
    ];
}
