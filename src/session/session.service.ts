import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import Session from "./session.entity";
import { EventEmitter } from "events";
import { Store } from 'express-session';

@Component()
export class SessionService extends Store {
  private static oneDay = 86400;
  
  constructor(@InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {
    super();
  }

  private getTTL(sess) {
    const maxAge = sess.cookie.maxAge;
    return (typeof maxAge === 'number'
      ? Math.floor(maxAge / 1000)
      : SessionService.oneDay);
  }

  public async all(cb) {
    try {
      const sessions = await this.sessionRepository.find();
      cb(null, sessions);
    } catch (err) {
      cb(err);
    }
  }

  public async destroy(sid, cb) {
    try {
      await this.sessionRepository.delete({ id: sid });
      cb();
    } catch (err) {
      cb(err);
    }
  }

  public async clear(cb) {
    try {
      await this.sessionRepository.clear();
      cb();
    } catch (err) {
      cb(err);
    }
  }

  public async length(cb) {
    try {
      const count = await this.sessionRepository.count();
      cb(null, count);
    } catch (err) {
      cb(err);
    }
  }

  public async get(sid, cb) {
    try {
      const session = await this.sessionRepository.findOneById(sid)
      if (session) {
        cb(null, JSON.parse(session.data));
      } else {
        cb('session not found');
      } 
    } catch (err) {
      cb(err);
    }
  }

  public async set(sid, session, cb) {
    try {
      await this.sessionRepository.save(<Session>{ 
        id: sid,
        data: JSON.stringify(session), 
        expires: this.getTTL(session) 
      });
      cb();
    } catch (err) {
      cb(err);
    }
  }
}