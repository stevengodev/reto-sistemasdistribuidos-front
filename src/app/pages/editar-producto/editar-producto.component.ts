import { Component } from '@angular/core';
import { ProductoFormularioComponent } from "../../components/formulario-producto/formulario-producto.component";

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ProductoFormularioComponent],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {

}
