import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedSingleBuilder } from '../providers/shared/shared';
import { GameObject, GameObjectHelper } from './object.model';
import { Event, EventHelper } from './event.model';

export class Game {
  protected _name: SharedValue<string>;
  protected _objects$: Observable<GameObject[]>;
  protected _events$: Observable<Event[]>;

  constructor(protected _node: SharedNode) {
    this._name = this._node.child('name').asValue<string>();
    this._objects$ = GameObjectHelper.items$(_node, _node.key$, 'game');
    this._events$ = EventHelper.items$(_node, _node.key$, 'game');
  }

  get name$(): Observable<string> { return this._name.value$; }
  get events$(): Observable<Event[]> { return this._events$; }
  get objects$(): Observable<GameObject[]> { return this._objects$; }
}

export var GameHelper = SharedSingleBuilder.single('games', Game);
