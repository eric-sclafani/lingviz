import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private _snackBar: MatSnackBar) {}

    success(message: string) {
        this.openSnackBar(message, 3000, 'snackbar-success');
    }

    error(message: string) {
        this.openSnackBar(message, 6000, 'snackbar-error');
    }

    private openSnackBar(
        message: string,
        duration: number,
        snackbarClass: string
    ) {
        const config = new MatSnackBarConfig();
        config.duration = duration;
        config.panelClass = [snackbarClass];
        config.verticalPosition = 'top';

        this._snackBar.open(message, 'Close', config);
    }
}
