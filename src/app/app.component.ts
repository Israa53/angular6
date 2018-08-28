import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { TooltipPosition } from "@angular/material";
import { Sort } from "@angular/material";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

 
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private _formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    this.sortedData = this.desserts.slice();
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  title = "Xteam";
  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + "k";
    }

    return value;
  }
  showFiller = false;
  panelOpenState = false;
  tiles: Tile[] = [
    { text: "One", cols: 3, rows: 1, color: "lightblue" },
    { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
    { text: "Three", cols: 1, rows: 1, color: "lightpink" },
    { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" }
  ];

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  positionOptions: TooltipPosition[] = [
    "after",
    "before",
    "above",
    "below",
    "left",
    "right"
  ];
  position = new FormControl(this.positionOptions[0]);

  desserts: Dessert[] = [
    { name: "Frozen yogurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4
    },
    { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: "Cupcake", calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 4 }
  ];
  sortedData: Dessert[];

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "calories":
          return compare(a.calories, b.calories, isAsc);
        case "fat":
          return compare(a.fat, b.fat, isAsc);
        case "carbs":
          return compare(a.carbs, b.carbs, isAsc);
        case "protein":
          return compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }
}

export interface Food {
  value: string;
  viewValue: string;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
