import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedBuilder } from '../providers/shared/shared';
import { Game, GameHelper } from './game.model';
import { Ailment, AilmentHelper } from './ailment.model';
import { Item, ItemHelper } from './item.model';
import { Job, JobHelper } from './job.model';

export abstract class GameObject {
  protected _name: SharedValue<string>;
  protected _gameId: SharedValue<string>;
  protected _game$: Observable<Game>;
  protected _ailments$: Observable<Ailment[]>;
  protected _items$: Observable<Item[]>;
  protected _jobs$: Observable<Job[]>;

  constructor(protected _node: SharedNode) {
    this._name = this._node.child('name').asValue<string>();
    this._gameId = this._node.child('game').asValue<string>();
    this._game$ = GameHelper.ref$(this._node, this._gameId.value$);
    this._ailments$ = AilmentHelper.items$(_node, _node.key$, 'object');
    this._items$ = ItemHelper.items$(_node, _node.key$, 'object');
    this._jobs$ = JobHelper.items$(_node, _node.key$, 'object');
  }

  get name$(): Observable<string> { return this._name.value$; }
  get game$(): Observable<Game> { return this._game$; }
  get ailments$(): Observable<Ailment[]> { return this._ailments$; }
  get items$(): Observable<Item[]> { return this._items$; }
  get jobs$(): Observable<Job[]> { return this._jobs$; }

  setGame(id: string) { return this._gameId.update(id); }
  setName(name: string) { return this._name.update(name); }
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
