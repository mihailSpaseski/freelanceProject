import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../../../../services/firebase.service";

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css']
})
export class CreateProductFormComponent implements OnInit{

  constructor(private fb: FormBuilder,
              private firebaseService: FirebaseService) {
  }

  ngOnInit() {

  }


}
