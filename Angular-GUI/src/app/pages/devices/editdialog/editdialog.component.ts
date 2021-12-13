import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IDevice } from 'src/app/interfaces/IDevice';

@Component({
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent {

  public newName: string = "";
  public device: IDevice | undefined;
  constructor(public dialogRef: MatDialogRef<EditdialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {device: IDevice}) {
    this.device = data.device
    this.newName = this.device.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
