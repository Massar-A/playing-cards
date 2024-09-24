import { Component, EventEmitter, input, InputSignal, model, ModelSignal, output, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  search: ModelSignal<string> = model<string>('');

  searchButtonClicked = output<string>({ alias: 'submit' })

  searchClick() {
    this.searchButtonClicked.emit(this.search());
  }
}
