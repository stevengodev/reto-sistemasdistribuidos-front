import { Component } from '@angular/core';
import { ProductoFormularioComponent } from "../../components/formulario-producto/formulario-producto.component";

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [ProductoFormularioComponent],
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent {

}
