import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataPruebaService {

  //Sé muy bien que con la simple petición "Post" bastaba, no obstante decidí crear el resto de peticiones si se necesitaba hacer alguna validación extra.

  private URL = 'http://localhost:8081'

  constructor(private http: HttpClient) { }

  getCostumers() {
    return this.http.get(`${this.URL}/costumers`)
  }

  getCostumer(id: string | number) {
    return this.http.get(`${this.URL}/costumers/${id}` )
  }

  createCostumer(costumer: any) {
    return this.http.post(`${this.URL}/costumers`, costumer)
  }

  deleteCostumer(id: string) {
    return this.http.delete(`${this.URL}/constumers/${id}`)
  }

}
