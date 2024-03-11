import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { newsModel } from 'src/app/shared/models/newsModel';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsForm: FormGroup;
  categoryForm!: FormGroup;
  newsImage: any;
  newsCategorySelected!: string;
  uploadProgress!: number;
  news!: newsModel[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firebaseSer: FirebaseService
  ) {
    this.newsForm = this.fb.group({
      newsTitle: ['', Validators.required],
      newsDescription: ['', Validators.required],
      newsURL: ['', Validators.required],
      newsImage: [''],
      newsCategory: [''],
      publishedBy: [''],
      username: [''],
      newsPublishedOn: [''],
    });
  }
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      newsCat: ['', Validators.required], // Initialize with an empty value
    });

    this.firebaseSer.getNewsList().subscribe((newsArticles) => {
      this.news = newsArticles;
    });
  }

  public newsImageSelected($event: any) {
    this.newsImage = $event.target.files.item(0);
  }

  isNewsPage(): boolean {
    return this.route.snapshot.url[0]?.path === 'news'; // Check if the path is empty (i.e., the home page)
  }

  addNews() {
    if (this.newsForm.valid && this.categoryForm.valid) {
      this.newsForm.patchValue({ publishedBy: 'USER ID' });
      this.newsForm.patchValue({ username: 'USER username' });
      this.newsForm.patchValue({ newsPublishedOn: 'date.now()' });
      this.newsForm.patchValue({
        newsCat: this.categoryForm.get('newsCat')!.value,
      });

      this.firebaseSer
        .pushNewsToStorage(this.newsImage, this.newsForm.value)
        .subscribe((result) => {
          if (result) {
            this.uploadProgress = result;
            console.log(this.uploadProgress);
          }
        });
      this.clearForm();
    } else {
      window.alert('Not Valid');
      console.log('Not Valid');
    }
  }

  clearForm() {
    this.categoryForm.get('newsCat')!.reset();
    this.newsForm.get('newsTitle')!.reset();
    this.newsForm.get('newsDescription')!.reset();
    this.newsForm.get('newsCategory')!.reset();
    this.newsForm.get('newsURL')!.reset();
    this.newsForm.get('publishedBy')!.reset();
    this.newsForm.get('username')!.reset();
    this.newsForm.get('newsPublishedOn')!.reset();
  }
}
