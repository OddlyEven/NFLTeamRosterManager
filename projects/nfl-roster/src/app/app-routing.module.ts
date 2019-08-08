import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teams/:teamId/players/:playerName',
    loadChildren: () => import('./players/players.module').then(lazyMod => lazyMod.PlayersModule)
  },
  {
    path: 'teams/:teamId',
    loadChildren: () => import('./roster/roster.module').then(lazyMod => lazyMod.RosterModule)
  },
  {
    path: '',
    redirectTo: 'teams',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(lazyMod => lazyMod.PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
