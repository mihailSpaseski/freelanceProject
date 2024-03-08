import { Component, Input, OnInit } from '@angular/core';
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
export class PreviewdataComponent implements OnInit {
  status: boolean = false;

  category!: Category | undefined;
  categories: Category[] = c;
  items!: Product[];
  publishedBy: string | undefined;
  publisher: string | undefined;
  @Input() filteredItems: Product[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.category = this.categories.find((cat) => cat.name === 'Food');

    this.firebase.getProductsList().subscribe((foodItems) => {
      this.items = foodItems;
      this.filteredItems = this.items;
      // console.log(this.filteredItems);

      foodItems.find((pubedBy) => {
        this.publishedBy = pubedBy.publishedBy;
      });

      this.firebase.getUsersList().subscribe((users) => {
        // users.forEach(element => {
        //   if (element.key === this.publishedBy){
        //   }
        // });
        // if (userPub.key === this.publishedBy) {
        //   this.publisher = userPub.username;
        //   return;
        // }
        // });
      });
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

  readMore() {
    this.status = !this.status;
  }
}
