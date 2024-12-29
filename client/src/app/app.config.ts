import { ApplicationConfig, provideZoneChangeDetection, Injectable, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const PYTHON_API_URL = new InjectionToken<string>('PYTHON_API_URL');
const providePythonApiUrl = function(){
    return {provide: PYTHON_API_URL, useValue: 'http://127.0.0.1:8080/api/'}
    }



export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync(),
        providePythonApiUrl()
    ]
};
