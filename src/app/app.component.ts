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
  breedImage: string = '';
  breedType: string = '';

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

  setBreedType(event: any){
    this.breedType = event.target.value;
  }

  fetch(breed: string) {
    let image_api_url = '';
    if (breed.indexOf('-') === -1) {
      image_api_url = `https://dog.ceo/api/breed/${breed}/images/random`;
    } else {
      const breed_types = breed.split('-');
      image_api_url = `https://dog.ceo/api/breed/${breed_types[0].trim()}/${breed_types[1].trim()}/images/random`;
    }

    this.apiService.getBreedImage(image_api_url).subscribe((resp) => {
      if(resp.status === 'success') {
        this.breedImage = resp.message;
      }
    })
  }
}
