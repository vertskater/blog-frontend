export default class ApiKey {
  private _clientName: string;
  private _createdAt: string;
  private _expiresAt: string | null;
  private _id: number;
  private _key: string;
  private _maxRequests: number;
  private _ownerId: number;
  private _status: string;
  private _usageCount: number;
  constructor(
    clientName: string,
    createdAt: string,
    expiresAt: string | null,
    id: number,
    key: string,
    maxRequests: number,
    ownerId: number,
    status: string,
    usageCount: number
  ) {
    this._clientName = clientName;
    this._createdAt = createdAt;
    this._expiresAt = expiresAt;
    this._id = id;
    this._key = key;
    this._maxRequests = maxRequests;
    this._ownerId = ownerId;
    this._status = status;
    this._usageCount = usageCount;
  }
  get clientName(): string {
    return this._clientName;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get expiresAt(): string | null {
    return this._expiresAt;
  }

  get id(): number {
    return this._id;
  }

  get key(): string {
    return this._key;
  }

  get maxRequests(): number {
    return this._maxRequests;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  get status(): string {
    return this._status;
  }

  get usageCount(): number {
    return this._usageCount;
  }
}
