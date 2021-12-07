import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrafService {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get_data() {
    return this.http.get<Object[]>("/data/get_data");
  }

}
