import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphViewComponent } from './component/graph-view/graph-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { UserFormComponent } from './component/user-form/user-form.component';
import { DetailViewComponent } from './component/detail-view/detail-view.component';
import { ResultViewComponent } from './component/result-view/result-view.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphViewComponent,
    UserFormComponent,
    DetailViewComponent,
    ResultViewComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
