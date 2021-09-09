import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusinessModel } from 'src/app/shared/models/itauB.model';


@Injectable({ providedIn: 'root' })
export class CompaniesListService {
    /*Criando Variavel para armazenar o endereço dos dados externos*/
    private API_URL = 'https://60820a0e827b350017cfbaea.mockapi.io/api/v1/itau_teste';

    /*Declarando Http no contrutor */
    constructor(private http: HttpClient) {}

    /*Criando método que retorna os dados */
    get(): Observable<IBusinessModel[]> {
        return this.http.get<IBusinessModel[]>(this.API_URL);
    }

    /*Criando método que retorna os dados de acordo com ID */
    getById(id: number): Observable<IBusinessModel> {
        return this.http.get<IBusinessModel>(this.API_URL + `/${id}`);
    }

}
