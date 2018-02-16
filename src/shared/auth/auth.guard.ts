import { Guard, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Guard()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  async canActivate(req, context: ExecutionContext) {
    const { parent, handler } = context;
    const requiresAdmin = this.reflector.get<boolean>('admin', handler);
    return (!requiresAdmin || req.session.isAdmin) && req.session && req.session.userId;
  }
}
