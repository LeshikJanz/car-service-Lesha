export interface IItemState {
  itemId: number,
  isOrderConfirmed: boolean;
  isOrderDeclined: boolean;
  isOrderHaveQuestion: boolean;
  comment: string
}

export interface IState {
  items: Array<IItemState>;
}