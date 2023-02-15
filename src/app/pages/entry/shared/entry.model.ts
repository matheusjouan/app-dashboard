import { Category } from './../../category/shared/category.model';

export class Entry {
  // constructor(
  //   public id: number,
  //   public name: string,
  //   public description: string,
  //   public type: string,
  //   public amount: string,
  //   public date: string,
  //   public isPaid: boolean,
  //   public categoryId: number,
  //   public category: Category
  //   ) {}

  public id!: number;
  public name!: string;
  public description!: string;
  public type!: string;
  public amount!: string;
  public date!: string;
  public isPaid!: boolean;
  public categoryId!: number;
  public category!: Category;

  constructor() {}

    static types = {
      expense: 'Despesa',
      renevue: 'Receita',
    }

    get paidText(): string {
      return this.isPaid ? 'Pago' : ' Pendente';
    }
}
