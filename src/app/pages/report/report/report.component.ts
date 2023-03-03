import { CategoryService } from './../../category/shared/category.service';
import { EntryService } from './../../entry/shared/entry.service';
import { Category } from './../../category/shared/category.model';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/interfaces/breadcrumb-item';

import * as currencyFormatter from 'currency-formatter';
import { ChartOptions } from 'chart.js';
import { Entry } from '../../entry/shared/entry.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  // Referencia o select que contem informação do mês e ano
  @ViewChild('month') month!: ElementRef;
  @ViewChild('year') year!: ElementRef;

  breadcrumbList: BreadcrumbItem[] = [
    { text: 'Relatório de Receitas e Despesas' }
  ]

  // Valor total
  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  // Dados referente ao gráfico de expense
  expenseChartData: any;

  // Dados referente ao gráfico de receitas
  revenueChartData: any;

  categories: Category[] = [];
  entries: Entry[] = [];

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.loadAllCategories();
  }

  private loadAllCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res
    });
  }

  public generateReport() {
    // Pega o valor do campo selecionado no select
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year)
      alert('Necessário selecionar o mês eo ano para gerar o relatório')
    else {
      this.entryService.getEntriesByMonthAndYear(month, year).subscribe({
        next: (res) => this.setValues(res)
      });
    }
  }

  // Isso é para o backend não implementou uma rota que faz isso, o front esta fazendo tudo
  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChardData();
  }

  // Calcular os valores da somatória do resumo
  private calculateBalance() {
    let expensiveTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type === 'revenue')
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' })
      else
        expensiveTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' })
    });

    this.expenseTotal = currencyFormatter.format(expensiveTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format((revenueTotal - expensiveTotal), { code: 'BRL' });
  }

  // Configurar os dados que serão colocados no gráfico para as propriedades expenseChartData e revenueChartData
  private setChardData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData: any[] = [];

    this.categories.forEach(category => {
      // Filtrando lançamentos por categoria e tipos no caso será Receita
      const filteredEntries = this.entries.filter(entry => {
        return entry.categoryId === category.id && entry.type === entryType
      });

      // Se forem encontradado lançamentos, soma esses lançamentos e adicione e mostra no gráfico chartData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => {
          return total + currencyFormatter.unformat(entry.amount, { code: 'BRL' })
        }, 0)

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    });

    return {
      // Retornar os label dinamicamente do objeto que vem os dados
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}

/**
 * Importa o módulo import { ChartModule } from 'primeng/chart';
 * para o módulo que for utilizar
 *
 * [data]: os dados do gráficos
 * type: o tipo do gráfico
 * [options]: definir opções personalizadas no gráfico (ver doc)
 *
 *
 *
 */
