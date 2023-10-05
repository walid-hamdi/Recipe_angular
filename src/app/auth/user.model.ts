export class User {
  userId: string;
  email: string;
  private _tokenId: string;
  private _tokenExpirationDate: Date;

  constructor(
    userId: string,
    email: string,
    token: string,
    tokenExpirationDate: Date
  ) {
    this.userId = userId;
    this.email = email;
    this._tokenId = token;
    this._tokenExpirationDate = tokenExpirationDate;
  }
  get token() {
    if (!this._tokenId || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._tokenId;
  }
}
