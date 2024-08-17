import { Component } from '@angular/core';
import { TablaProductosComponent } from "../../components/tabla-productos/tabla-productos.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [TablaProductosComponent, RouterLink],
  templateUrl: './listar-productos.component.html'
})
export class ListarProductosComponent {

}
