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
export class ProductoFormularioComponent implements OnInit {

  productoForm: FormGroup;
  @Input() esEditar!: boolean;
  txtId! : string;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      // id: [{ value: '', disabled: true}],  // Asegúrate de deshabilitarlo si no quieres que se edite
      id: null,
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [0, Validators.required],
      stock: [0, Validators.required],
      marca: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    
    // Obtiene el parámetro 'id' de la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.txtId = id;
      this.productosService.getProducto(id).subscribe({
        next: (data: Producto) => {
          this.productoForm.patchValue({
            id : data.id,
            nombre: data.nombre,
            categoria: data.categoria,
            precio: data.precio,
            stock: data.stock,
            marca: data.marca
          });
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
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
        this.actualizar(producto);
      } else {
        this.crear(producto);
      }
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  actualizar(producto: Producto) {
    this.productosService.actualizarProducto(producto).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error al actualizar el producto', err)
      });
  }

  crear(producto: Producto) {
    this.productosService.crearProducto(producto).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error al crear el producto', err)
    });
  }

}
