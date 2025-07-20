import { FormControl } from '@angular/forms';

export interface DatasetForm {
    textColName: FormControl<string | null>;
    idColName: FormControl<string | null>;
}
