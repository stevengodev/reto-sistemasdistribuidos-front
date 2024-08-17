import { Component } from '@angular/core';
import { InformacionProductoComponent } from "../../components/informacion-producto/informacion-producto.component";

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [InformacionProductoComponent],
  templateUrl: './ver-producto.component.html',
})
export class VerProductoComponent {

}
