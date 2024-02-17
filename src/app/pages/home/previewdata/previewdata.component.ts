import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/proudctsModel';
// @ts-ignore
import c from 'src/assets/categories.json';

@Component({
  selector: 'app-previewdata',
  templateUrl: './previewdata.component.html',
  styleUrls: ['./previewdata.component.css'],
})
export class PreviewdataComponent implements OnInit{

  category!: Category | undefined;
  categories: Category[] = c;
  items!: Product[];
  filteredItems: Product[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.category = this.categories.find((x) => x.name === 'Food');

    this.firebase.getProductsList().subscribe((x) => {
      this.items = x;
      // console.log(this.items);
      this.filteredItems = this.items;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.items.filter((itemFiltered) =>
      itemFiltered?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
