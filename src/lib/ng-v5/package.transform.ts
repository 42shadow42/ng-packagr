import { InjectionToken, FactoryProvider, ValueProvider } from 'injection-js';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap } from 'rxjs/operators';
import { BuildGraph } from '../brocc/build-graph';
import { Node } from '../brocc/node';
import { Transform } from '../brocc/transform';
import { discoverPackages } from '../steps/init';
import { rimraf } from '../util/rimraf';
import { ENTRY_POINT_TRANSFORM_TOKEN } from './entry-point.transform';

export const PROJECT_TOKEN = new InjectionToken<string>(`ng.v5.project`);

export const provideProject = (project: string): ValueProvider => ({
  provide: PROJECT_TOKEN,
  useValue: project
});

export const projectTransformFactory = (project: string, epTransform: Transform) =>
  (source$: Observable<BuildGraph>): Observable<BuildGraph> => {

    return source$.pipe(
      switchMap(graph => {
        const pkg = discoverPackages({ project });

        return fromPromise(pkg).pipe(
          switchMap(
            // clean the primary dest folder (should clean all secondary module directories as well)
            (value) => fromPromise(rimraf(value.dest)),
            (value, _) => value
          ),
          map((value) => {
            const ngPkg = new Node(`pkg://${project}`);
            ngPkg.type = 'application/ng-package';
            ngPkg.data = value;

            const entryPoints = [ value.primary, ...value.secondaries ]
              .map((ep) => {
                const node = new Node(`ep://${ep.moduleId}`);
                node.type = 'application/ng-entry-point';
                node.data = ep;

                return node;
              })

            return graph.set(ngPkg)
              .set(entryPoints);
          })
        );
      }),
      map((graph) => {
        const ngPkg = graph.find((value) => value.type === 'application/ng-package');

        console.log("Do something more...");


        return graph;
      })
    );
  };

export const PACKAGE_TRANSFORM_TOKEN = new InjectionToken<Transform>(`ng.v5.packageTransform`);

export const PACKAGE_TRANSFORM_PROVIDER: FactoryProvider = {
  provide: PACKAGE_TRANSFORM_TOKEN,
  deps: [ PROJECT_TOKEN, ENTRY_POINT_TRANSFORM_TOKEN ],
  useFactory: projectTransformFactory
};
