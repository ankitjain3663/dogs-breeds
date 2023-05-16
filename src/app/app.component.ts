import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'dogs-breeds';
  breeds: string[] = [];

  constructor(private apiService: ApiService){ }
  
  ngOnInit(): void {
    this.fetchDogBreeds();
  }

  fetchDogBreeds() {
    this.apiService.getDogBreeds().subscribe((breeds)=> {
      this.simplifyBreeds(breeds.message);
    });
  }

  simplifyBreeds(breedsList: any[]) {
    for (const breed in breedsList){
      if ( breedsList[breed].length === 0 ) {
        this.breeds.push(breed);
      } else if (breedsList[breed].length > 0 ) {
        breedsList[breed].forEach((sub_breed: string) => {
          this.breeds.push(`${breed} - ${sub_breed}`)
        })
      }
    }
  }

}
