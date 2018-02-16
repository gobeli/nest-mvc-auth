export interface IEntityName {
  name: string;
  plural: string;
}

export const ENTITIES = {
  todo: <IEntityName>{
    name: 'todo',
    plural: 'todos'
  },
  user: <IEntityName>{
    name: 'user',
    plural: 'users'
  }
}