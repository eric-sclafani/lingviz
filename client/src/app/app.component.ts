import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PythonApiService } from './services/python-api.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileUploadComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(private _pythonApi: PythonApiService) { }


}
