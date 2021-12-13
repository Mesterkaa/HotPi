import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SETTING } from 'src/app/helper/setting.const';
import { IDevice } from 'src/app/interfaces/IDevice';
import { DeviceService } from 'src/app/services/device/device.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { EditdialogComponent } from './editdialog/editdialog.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  public devices: IDevice[] = [];
  private subscriptions: Subscription[] = [];
  selectedDevices: string[] = [];
  constructor(private deviceService: DeviceService, private settingsService: SettingsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.deviceService.devices.subscribe(devices => {
      this.devices = devices;
    }));
    this.subscriptions.push(this.settingsService.settings.subscribe(settings => {
      this.selectedDevices = settings[SETTING.DEVICES];
    }))
  }
  ngOnDestroy(): void {
      this.subscriptions.forEach(element => {
        element.unsubscribe();
      });
  }

  change(event: MatCheckboxChange, device: IDevice) {
    if (event.checked) {
      this.selectedDevices.push(device._id);
    } else {
      this.selectedDevices.forEach((value, index) => {
        if (value == device._id) this.selectedDevices.splice(index, 1);
      })
    }
    this.settingsService.save([{name: SETTING.DEVICES, value: this.selectedDevices}])
  }

  startEdit(device: IDevice) {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '600px',
      data: {device: device}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deviceService.update(device._id, result);
    })
  }

  checked(_id: string): boolean {
    if (this.selectedDevices) {
      return this.selectedDevices.includes(_id);
    } else {
      return false;
    }
  }

}
