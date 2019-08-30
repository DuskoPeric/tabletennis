import { TestBed, ComponentFixture } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TableComponent } from "./table.component";



describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([])],
      declarations: [TableComponent],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.nativeElement;
  });
  it('should have a router outlet',()=>{
    let de=fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBeNull();
  })
});