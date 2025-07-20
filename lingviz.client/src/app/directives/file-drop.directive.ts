import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
    selector: '[appFileDrop]',
})
export class FileDropDirective {
    fileDropped = output<File>();

    constructor(private el: ElementRef) {}

    @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer!.dropEffect = 'copy';

        this.setDraggingState();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer!.dropEffect = 'none';

        this.setInitialState();
    }

    @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.setInitialState();

        const files = event.dataTransfer?.files[0];
        if (files) {
            this.fileDropped.emit(files);
        }
    }

    private setDraggingState() {
        this.changeBackground('white');
        this.changeOutlineOffset('-10px');
    }

    private setInitialState() {
        this.changeBackground('rgba(216, 222, 232, 0.65)');
        this.changeOutlineOffset('-20px');
    }

    private changeBackground(color: string) {
        this.el.nativeElement.style.background = color;
    }

    private changeOutlineOffset(offset: string) {
        this.el.nativeElement.style.outlineOffset = offset;
    }
}
