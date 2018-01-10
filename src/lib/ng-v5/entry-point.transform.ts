import { InjectionToken, FactoryProvider, ValueProvider } from 'injection-js';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap } from 'rxjs/operators';
import { BuildGraph } from '../brocc/build-graph';
import { Node } from '../brocc/node';
import { Transform } from '../brocc/transform';

export const entryPointTransform =
  (source$: Observable<BuildGraph>): Observable<BuildGraph> => {

    // TODO: transformSources() re-written

    return source$.pipe();
  };

export const ENTRY_POINT_TRANSFORM_TOKEN =
  new InjectionToken<Transform>(`ng.v5.entryPointTransform`);

export const ENTRY_POINT_TRANSFORM_PROVIDER: ValueProvider = {
  provide: ENTRY_POINT_TRANSFORM_TOKEN,
  useValue: entryPointTransform
};
