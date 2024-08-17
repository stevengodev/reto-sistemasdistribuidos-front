import { Routes } from '@angular/router';
import { ListarProductosComponent } from './pages/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { VerProductoComponent } from './pages/ver-producto/ver-producto.component';

export const routes: Routes = [
    {
        path: '',
        component: ListarProductosComponent,
        title: 'Productos',
        pathMatch: 'full'
    },
    {
        path: 'crear',
        component: CrearProductoComponent,
        title: 'Crear producto'
    },
    {
        path: 'editar/:id',
        component: EditarProductoComponent,
        title: 'Editar'
    },
    {
        path: 'ver/:id',
        component: VerProductoComponent,
        title: 'Ver'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
