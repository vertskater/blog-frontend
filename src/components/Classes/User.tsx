import ApiKey from "./ApiKey.tsx";
import Post from "./Post.tsx";
import Comment from "./Comment.tsx";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class User {
  private _id: number;
  private _email: string;
  private _password: string;
  private _role: Role;
  private _posts: Post[] | [];
  private _comments?: Comment[] | [];
  private _createdAt: Date;
  private _updatedAt: Date | null;
  private _apiKeys: ApiKey[];

  constructor(
    id: number,
    email: string,
    password: string,
    role: Role = Role.USER,
    posts: Post[] | [],
    comments: Comment[] | [],
    createdAt: Date,
    updatedAt: Date | null,
    apiKeys: ApiKey[]
  ) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
    this._posts = posts;
    this._comments = comments;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._apiKeys = apiKeys;
  }
  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): Role {
    return this._role;
  }

  get posts(): Post[] | [] {
    return this._posts;
  }

  get comments(): Comment[] | [] {
    return this._comments || [];
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  get apiKeys(): ApiKey[] {
    return this._apiKeys;
  }
}
