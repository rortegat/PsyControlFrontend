import { MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatTooltipModule, MatTabsModule, MatPaginatorModule, MatListModule, MatDividerModule, MatBadgeModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTabsModule,
        MatPaginatorModule,
        MatListModule,
        MatDividerModule,
        MatBadgeModule,
        MatProgressBarModule

    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatGridListModule,
        MatCheckboxModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTabsModule,
        MatPaginatorModule,
        MatListModule,
        MatDividerModule,
        MatBadgeModule,
        MatProgressBarModule
    ],
})
export class MaterialModule { }