import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'progress-spinner',
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: './progress-spinner.component.html',
    styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {

    progressValue = input.required<number | null>();

}
