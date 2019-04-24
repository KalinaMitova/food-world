import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PostInfo } from '../models/post-info';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  private readonly BASE_URL = ``;
  private readonly ALL_POSTS = `${this.BASE_URL}/posts?query={}&sort={"_kmd.ect": -1}`;
  private readonly CREATE_POST = `${this.BASE_URL}/posts`;

  constructor (
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<PostInfo>> {
    return this.http.get<PostInfo[]>( this.ALL_POSTS,
    );
  }

  createPost( body: Object ) {
    return this.http.post( this.CREATE_POST, body,
    );
  }

  getById( id: string ): Observable<PostInfo> {
    return this.http.get<PostInfo>( this.CREATE_POST + `/${id}`,
    );
  }

  getDetails( id: string ): Observable<PostInfo> {
    return this.http.get<PostInfo>( this.CREATE_POST + `/${id}`,
    );
  }

  editPost( body: Object, id: string ) {
    return this.http.put( this.CREATE_POST + `/${id}`, body,
    );
  }

  deletePost( id: string ) {
    return this.http.delete( this.CREATE_POST + `/${id}`,
    );
  }

  getUserPosts(): Observable<PostInfo[]> {
    return this.http
      .get<PostInfo[]>( `${this.BASE_URL}/posts?query={"author":"${localStorage.getItem( 'username' )}"}&sort={"_kmd.ect": -1}`,
      );
  }
}
