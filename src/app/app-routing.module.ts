import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [

  {
    path: 'mapas',
    loadChildren: () =>
      import('./modules/mapas/mapas.module').then(
        (module) => module.MapasModule
      )
  },
  {
    path:'**',
    redirectTo:'mapas'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
