import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {

items:any = []


  constructor(private firestore: AngularFirestore) {

  }


  ngOnInit(): void {
    this.firestore.collection('food_items').valueChanges().subscribe((data: any[]) => {
      this.items = data;
      console.log(this.items);
      console.log();
    });

    this.firestore.collection('food_items').valueChanges()
      console.log(this.items);
  }
}
