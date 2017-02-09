import { Observable } from 'rxjs';
import { SharedNode, SharedValue, SharedBuilder } from '../providers/shared/shared';
import { Game, GAME_HELPER } from './game.model';
import { Ailment, AILMENT_HELPER } from './ailment.model';
import { Item, ITEM_HELPER } from './item.model';
import { Job, JOB_HELPER } from './job.model';

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
    this._game$ = GAME_HELPER.ref$(this._node, this._gameId.value$);
    this._ailments$ = AILMENT_HELPER.items$(_node, _node.key$, 'object');
    this._items$ = ITEM_HELPER.items$(_node, _node.key$, 'object');
    this._jobs$ = JOB_HELPER.items$(_node, _node.key$, 'object');
  }

  get id(): string { return this._node.key; }
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
    this._target$ = OBJECT_HELPER.ref$(this._node, this._targetId.value$);
  }

  get target$(): Observable<GameObject> { return this._target$; }

  setTarget(id: string) { return this._targetId.update(id); }
}

export const OBJECT_HELPER = SharedBuilder.multiplex<GameObject>('objects', 'type', {
  user: User,
  location: Location,
});
