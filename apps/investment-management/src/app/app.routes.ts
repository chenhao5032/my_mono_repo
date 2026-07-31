import { Route } from '@angular/router';
import { DemoComponent } from './demo/demo.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/demo',
        pathMatch: 'full',
    },
    {
        path: 'demo',
        component: DemoComponent,
    }
];
