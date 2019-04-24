import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Recipe } from 'src/app/core/models/recipe';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ]
} )
export class RecipeListComponent implements OnInit {
  private isAdmin: boolean;
  private isAuthenticated: boolean;

  @Input() recipes$: Observable<Array<Recipe>>;
  @Input() title: string;

  constructor (
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();

  }
  backClicked() {
    this.location.back();
  }

}
