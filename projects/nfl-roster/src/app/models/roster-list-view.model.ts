import { PlayerViewModel } from './player-view.model';

export interface RosterListViewModel {
  teamName: string;
  items?: PlayerViewModel[];
}
