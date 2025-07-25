import { Component, input } from '@angular/core';
import { Document } from '../../models/document';

@Component({
    selector: 'app-document-list',
    imports: [],
    templateUrl: './document-list.component.html',
    styleUrl: './document-list.component.scss',
})
export class DocumentListComponent {
    documents = input.required<Document[]>();
}
