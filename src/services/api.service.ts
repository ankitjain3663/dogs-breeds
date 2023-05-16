import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    api_url = 'https://dog.ceo/api/breeds/list/all';

    constructor(private httpClient: HttpClient) { }

    public getDogBreeds() {
        return this.httpClient.get<any>(this.api_url);
    }

    public getBreedImage(imageURL:string) {
        return this.httpClient.get<any>(imageURL);
    }
}