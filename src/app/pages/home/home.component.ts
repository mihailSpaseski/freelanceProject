import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/proudctsModel';
// @ts-ignore
import c from '../../../assets/categories.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category!: Category | undefined;
  categories: Category[] = c;
  items!: Product[];

  constructor(private firebase: FirebaseService,) {

  }

  ngOnInit(): void {
    this.category = this.categories.find(x => x.name === 'Food');

    this.firebase.getProductsList().subscribe(x => {
      this.items = x;
      console.log(this.items);
    })
  }



}
