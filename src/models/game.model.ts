import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedBuilder } from '../providers/shared/shared';
import { GameObject, GameObjectHelper } from './object.model';

export class Game {
  protected _name: SharedValue<string>;
  protected _objects$: Observable<GameObject[]>;

  constructor(protected _node: SharedNode) {
    this._name = this._node.child('name').asValue<string>();
    this._objects$ = GameObjectHelper.items$(_node, _node.key$, 'game');
  }

  get name$(): Observable<string> { return this._name.value$; }
  get objects$(): Observable<GameObject[]> { return this._objects$; }
}

export var GameHelper = SharedBuilder.single('games', Game);
