import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentRoute?: string;
  @Input() filteredItems: Product[] = [];

  constructor(private firebase: FirebaseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path) {
      this.currentRoute = this.route.snapshot.url[0].path;
    } 

    this.category = this.categories.find((cat) => cat.name === 'Food');

    this.firebase.getProductsList().subscribe((foodItems) => {
      this.items = foodItems;
      this.filteredItems = this.items;

      foodItems.find((pubedBy) => {
        this.publishedBy = pubedBy.publishedBy;
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
