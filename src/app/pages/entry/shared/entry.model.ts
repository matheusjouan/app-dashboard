import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from './../../category/shared/category.model';

export class Entry extends BaseResourceModel {
  public name!: string;
  public description!: string;
  public type!: string;
  public amount!: string;
  public date!: string;
  public isPaid!: boolean;
  public categoryId!: number;
  public category!: Category;

  constructor() {
    super();
  }

    static types = {
      expense: 'Despesa',
      renevue: 'Receita',
    }

    static fromJson(jsonData: any): Entry {
      return Object.assign(new Entry(), jsonData);
    }

    get paidText(): string {
      return this.isPaid ? 'Pago' : ' Pendente';
    }
}
