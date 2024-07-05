namespace service {
  export class Account {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(
      username: string, password: string, balance:number,
      firstname: string,
      lastname?: string,
      email?: string,
      address?: string,
      phoneNumber?: number,
      avatar?: string
    ){}
  }
  export const signUp = (account: Account): boolean => {

    
    return false;
  };
}




export default service