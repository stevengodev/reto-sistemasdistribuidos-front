import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-producto.component.html'
})
export class ProductoFormularioComponent implements OnInit{

  productoForm: FormGroup;
  @Input() esEditar!: boolean;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      // id: [{ value: '', disabled: true}],  // Asegúrate de deshabilitarlo si no quieres que se edite
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required],
      marca: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.productosService.getProducto(id).subscribe(
        (data: Producto) => {
          this.productoForm.patchValue({
            nombre: data.nombre,
            categoria: data.categoria,
            precio: data.precio,
            stock: data.stock,
            marca: data.marca
          });
        },
        error => {
          console.error('Error al obtener el producto', error);
        }
      );
    }
    
    console.log(this.esEditar)
  
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      // const producto: Producto = this.productoForm.getRawValue();

      const producto: Producto = this.productoForm.value;
      if (this.esEditar) {
        this.productosService.actualizarProducto(producto).subscribe(
          () => this.router.navigate(['/']),
          error => console.error('Error al actualizar el producto', error)
        );
      } else {
        this.productosService.crearProducto(producto).subscribe(
          () => this.router.navigate(['/']),
          error => console.error('Error al crear el producto', error)
        );
      }
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
  
}
