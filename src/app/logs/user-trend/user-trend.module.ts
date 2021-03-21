import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrendComponent } from './user-trend.component';



@NgModule({
    declarations: [
        UserTrendComponent
    ],
    exports: [
        UserTrendComponent
    ],
    imports: [
        CommonModule
    ],
})
export class UserTrendModule { }
