import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedSingleBuilder } from '../providers/shared/shared';
import { GameObject, OBJECT_HELPER } from './object.model';

export class Job {
  protected _objectId: SharedValue<string>;
  protected _object$: Observable<GameObject>;

  constructor(protected _node: SharedNode) {
    this._objectId = this._node.child('object').asValue<string>();
    this._object$ = OBJECT_HELPER.ref$(this._node, this._objectId.value$);
  }

  get object$(): Observable<GameObject> { return this._object$; }
}

export const JOB_HELPER = SharedSingleBuilder.single('jobs', Job);
