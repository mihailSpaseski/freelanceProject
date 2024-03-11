import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/shared/models/proudctsModel';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css'],
})
export class ViewdetailsComponent implements OnInit {
  product!: Product;
  currentRoute?: string;
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[0].path;
    
    this.route.paramMap.subscribe((product) => {
      const key = product.get('id');
      if (key) {
        this.firebase.getProductsList().subscribe((x) => {
          const product = x.find((x) => x.key === key);
          if (product) {
            this.product = product;
          }
        });
      }
    });
  }
}
