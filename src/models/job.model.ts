import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedBuilder } from '../providers/shared/shared';
import { GameObject, GameObjectHelper } from './object.model';

export class Job {
  protected _objectId: SharedValue<string>;
  protected _object$: Observable<GameObject>;

  constructor(protected _node: SharedNode) {
    this._objectId = this._node.child('object').asValue<string>();
    this._object$ = GameObjectHelper.ref$(this._node, this._objectId.value$);
  }

  get object$(): Observable<GameObject> { return this._object$; }
}

export var JobHelper = SharedBuilder.single('jobs', Job);
