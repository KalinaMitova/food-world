import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5000/recipe/';
const CREATE_END_URL = "create";
const EDIT_END_URL = "edit/";
const DETAILS_END_URL = "details/";
const DELETE_END_URL = "delete/";
const ALL_END_URL = "all";
const USER_RECIPES_END_URL = "user";
const USER_FAVORITES_RECIPES_END_URL = "user/favorite";

@Injectable( {
  providedIn: 'root'
} )
export class RecipeService {

  constructor (
    private http: HttpClient
  ) { }

  getAll(): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>( BASE_URL + ALL_END_URL,
    );
  }

  getAllRecepiesByCategoryName( name: string ): Observable<Array<Recipe>> {
    return this.http.get<Array<Recipe>>( BASE_URL + name );
  }

  createRecipe( body: Recipe ) {
    return this.http.post( BASE_URL + CREATE_END_URL, body );
  }

  getDetails( id: string ): Observable<Recipe> {
    return this.http.get<Recipe>( BASE_URL + DETAILS_END_URL + `${id}` );
  }

  editRecipe( body: Recipe, id: string ) {
    return this.http.put( BASE_URL + EDIT_END_URL + `${id}`, body );
  }

  deleteRecipe( id: string ) {
    return this.http.delete( BASE_URL + DELETE_END_URL + `${id}`,
    );
  }

  getUserRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>( BASE_URL + USER_RECIPES_END_URL );
  }

  getUserFavoritesRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>( BASE_URL + USER_FAVORITES_RECIPES_END_URL );
  }

  postAddToFavorites( id: string ) {
    console.log( id );
    return this.http
      .post( BASE_URL + USER_FAVORITES_RECIPES_END_URL + `/add/${id}`, {} );
    //  "/recipe/user/favorites/add/{{recipe.id}}"
  }

  postRemoveFromFavorites( id: string ) {
    return this.http
      .post( BASE_URL + USER_FAVORITES_RECIPES_END_URL + `/remove/${id}`, {} );

  }
}
