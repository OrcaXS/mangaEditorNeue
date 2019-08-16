class FetchError extends Error {
  public constructor(...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}

class ParamsError extends Error {
  public constructor(...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParamsError);
    }
  }
}

class InternalError extends Error {
  public constructor(...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalError);
    }
  }
}

class DbError extends Error {
  public constructor(...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DbError);
    }
  }
}

export {
  FetchError, ParamsError, InternalError, DbError,
};
