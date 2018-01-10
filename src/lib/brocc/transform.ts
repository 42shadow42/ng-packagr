import { Observable } from 'rxjs/Observable';
import { BuildGraph } from './build-graph';

export interface Transform {
  (source$: Observable<BuildGraph>): Observable<BuildGraph>;
}
