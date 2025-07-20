import { Component } from '@angular/core';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { Dataset } from '../../models/dataset';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-home',
    imports: [FileUploadComponent, MatTabsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    private dataset: Dataset;

    onDatasetUpload(dataset: Dataset) {
        this.dataset = dataset;
    }
}
