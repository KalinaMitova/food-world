import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentInfo } from '../models/comment-info';


@Injectable( {
  providedIn: 'root'
} )
export class CommentService {
  private readonly BASE_URL = ``;
  private readonly CREATE_COMMENT = `${this.BASE_URL}/comments`;

  constructor (
    private http: HttpClient
  ) { }

  getAllForPost( postId: string ): Observable<Array<CommentInfo>> {
    return this.http.get<Array<CommentInfo>>( `${this.CREATE_COMMENT}?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}` );
  }

  postComment( body: Object ) {
    return this.http.post( this.CREATE_COMMENT, body,
    );
  }

  deleteComment( id: string ) {
    return this.http.delete( `${this.CREATE_COMMENT}/${id}`,
    );
  }
}
