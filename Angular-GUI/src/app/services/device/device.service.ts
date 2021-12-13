import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL } from 'src/app/helper/url.const';
import { IDevice } from 'src/app/interfaces/IDevice';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private _devices: BehaviorSubject<IDevice[]> = new BehaviorSubject<IDevice[]>([]);
  public readonly devices: Observable<IDevice[]> = this._devices.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<IDevice[]>(URL.DEVICE.GET).subscribe(res => {
      this._devices.next(res.concat(res.concat(res.concat(res))));
    })
  }
  update(_id: string, name: string): void {
    this.httpClient.put<IDevice>(URL.DEVICE.UPDATE, {_id: _id, name: name}).subscribe(res => {
      this._devices.next(this._devices.value.map(device => {
        if (device._id == _id) {
          device = res;
        };
        return device;
      }));
    });
  }
}
