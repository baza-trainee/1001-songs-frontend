import Iexpediton from "../shared/interfaces/expedition.interface";

export class SetExpeditions {
    static readonly type = '[Expeditions] Set';
  
    constructor(public expeditions: Iexpediton[]) {
    }
  }
  
//   export class EmptyTodo {
//     static readonly type = '[Todo] Empty';
//   }