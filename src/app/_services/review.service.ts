import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Review, ReviewUser, postReview } from '../payment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private url = 'http://localhost:8000/api/review';
  private reviews$: Subject<postReview[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshProducts() {
    this.httpClient.get<postReview[]>(`${this.url}`).subscribe((reviews) => {
      this.reviews$.next(reviews);
    });
  }

  getReviews(): Subject<postReview[]> {
    this.refreshProducts();
    return this.reviews$;
  }

  createReview(review: postReview): Observable<string> {
    return this.httpClient.post(`${this.url}`, review, {
      responseType: 'text',
    });
  }

  // getReviewByProductId(id: string): Observable<ReviewUser[]> {
  //   return this.httpClient.get<ReviewUser[]>(`${this.url}/product/${id}`);
  // }

  getReviewByProductId(productId: string): Observable<ReviewUser[]> {
    const url = `${this.url}/product/${productId}`;

    return this.httpClient.get<ReviewUser[]>(url).pipe(
      map((reviews: ReviewUser[]) => {
        return reviews.map(review => {
          const userData = Array.isArray(review.user) && review.user.length > 0 ? review.user[0] : null;          return {
            ...review,
            userData
          };
        });
      })
    );
  }
}
