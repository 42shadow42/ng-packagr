import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { BuildGraph } from './build-graph';
import { Node } from './node';

const project = new Node('project://<a-path>/to/foo.json');
project.type = 'application/ng-package';
const set = new BuildGraph();
set.set(project);

const buildNgPackage = (source$: Observable<BuildGraph>): Observable<BuildGraph> => {

  return source$.pipe(
    // the magic transform?!?
  );
};

buildNgPackage(observableOf(set));


/*

ts:///Users/david/<path>/lib/bar.componenent.ts
 |--> ts.SourceFile
 |--> path

file:///Users/david/<path>/lib/bar.componenent.scss
 |--> Buffer
 |--> path

*/
