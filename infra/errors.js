export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno inesperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action =
      "Tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível.", {
      cause,
    });
    this.name = "ServiceError";
    this.action =
      "Verifque se o serviço está disponível. Se o problema persistir, entre em contato com o suporte.";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("O método HTTP utilizado não é permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método HTTP utilizado está correto. Se o problema persistir, entre em contato com o suporte.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
