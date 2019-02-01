import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star-input',
  templateUrl: './star-input.component.html',
  styleUrls: ['./star-input.component.scss']
})
export class StarInputComponent implements OnInit {

  constructor() { }

  private _value: number;
  @Input() maximum;
  @Input() readOnly = false;
  @Output() valueAssigned = new EventEmitter<number>();
  stars: boolean[];

  @Input()
  set value(value) {
    if (!value || value < 1) {
      this._value = 1;
    } else {
      this._value = value;
      this.updateStars();
      this.valueAssigned.emit(this._value);
    }
  }

  get value() {
    return this._value;
  }

  ngOnInit() {
    if (!this.value || this.value < 1) {
      this.value = 1;
    }
    this.updateStars();
  }

  select(index: number) {
    if (!this.readOnly) {
      this.value = index + 1;
      this.updateStars();
    }
  }

  private updateStars() {
    this.stars = new Array(this.maximum);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = i < this.value;
    }
  }

}
