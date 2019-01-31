import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-input',
  templateUrl: './star-input.component.html',
  styleUrls: ['./star-input.component.scss']
})
export class StarInputComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() maximum;
  @Input() value;
  stars: boolean[];

  ngOnInit() {
    console.log(this.maximum);
    console.log(this.value);
    this.stars = new Array(this.maximum);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = i < this.value;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.maximum);
    console.log(this.value);
    this.stars = new Array(this.maximum);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = i < this.value;
    }
  }

}
