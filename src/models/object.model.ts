import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedBuilder } from '../providers/shared/shared';
import { Game, GameHelper } from './game.model';
import { Item, ItemHelper } from './item.model';
import _ from 'lodash';

export abstract class GameObject {
  protected _name: SharedValue<string>;
  protected _gameId: SharedValue<string>;
  protected _game$: Observable<Game>;
  protected _items$: Observable<Item[]>;

  constructor(protected _node: SharedNode) {
    this._name = this._node.child('name').asValue<string>();
    this._gameId = this._node.child('game').asValue<string>();
    this._game$ = GameHelper.ref$(this._node, this._gameId.value$);
    this._items$ = ItemHelper.items$(_node, _node.key$, 'object');

    console.log('Registering to', this._node.path);
  }

  get name$(): Observable<string> { return this._name.value$; }
  get game$(): Observable<Game> { return this._game$; }
  get items$(): Observable<Item[]> { return this._items$; }
}

export class Location extends GameObject {
  
}

export class User extends GameObject {
  protected _targetId: SharedValue<string>;
  protected _target$: Observable<GameObject>;

  constructor(_node: SharedNode) {
    super(_node);
    this._targetId = this._node.child('target').asValue<string>();
    this._target$ = GameObjectHelper.ref$(this._node, this._targetId.value$);
  }

  get target$(): Observable<GameObject> { return this._target$; }
}

export var GameObjectHelper = SharedBuilder.multiplex<GameObject>('objects', 'type', {
  user: User,
  location: Location
});
