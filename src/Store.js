import { extendObservable } from "mobx";

class Store {
  constructor() {
      extendObservable(this, {
        messages: []
      }
    )
  }
}
export default new Store()
