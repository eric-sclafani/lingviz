import { Component, inject, OnInit } from '@angular/core';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@Component({
    selector: 'app-root',
    imports: [FileUploadComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
