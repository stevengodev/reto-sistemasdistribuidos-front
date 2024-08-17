import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './tabla-productos.component.html'
})

export class TablaProductosComponent implements OnInit {

  productos: Producto[] = []

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({

      next: (value: Producto[]) => {
        console.log("productos: ", value);
        this.productos = value;
      },
      error: err => {
        console.error('Error al obtener los productos', err);
      }

    })
  }

  eliminarProducto(id: string) {

    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({

        next: () => {
          this.productos = this.productos.filter(producto => producto.id !== id);
        },
        error: err => {
          console.error('Error al eliminar el producto', err);
        }
      });
    }
  }
}
