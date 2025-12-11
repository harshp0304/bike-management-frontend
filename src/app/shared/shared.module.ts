import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SanitizerPipe } from "../pipes/sanitize.pipe";


@NgModule({
  imports: [CommonModule, RouterLink, MatIconModule, MatCheckboxModule, FormsModule, SanitizerPipe,MatTooltipModule],
  exports: [CommonModule, RouterLink, MatIconModule, MatCheckboxModule, FormsModule, SanitizerPipe, MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatPaginatorModule,MatTooltipModule],
})
export class SharedModule {}
