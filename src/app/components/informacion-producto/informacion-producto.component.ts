import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-informacion-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './informacion-producto.component.html',
})
export class InformacionProductoComponent implements OnInit{

  producto! : Producto;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.getProducto(id).subscribe(
        (data: Producto) => {
          this.producto = data;
        },
        error => {
          console.error('Error al obtener el producto', error);
        }
      );
    }
  }

  volver(){
    this.router.navigate(['/']);
  }

}
