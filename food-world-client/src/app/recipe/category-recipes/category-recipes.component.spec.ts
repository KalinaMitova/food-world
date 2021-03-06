import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRecipesComponent } from './category-recipes.component';

describe( 'UserRecipeComponent', () => {
  let component: CategoryRecipesComponent;
  let fixture: ComponentFixture<CategoryRecipesComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [ CategoryRecipesComponent ]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( CategoryRecipesComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
