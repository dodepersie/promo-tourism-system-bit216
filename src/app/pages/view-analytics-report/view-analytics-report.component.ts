import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { lastValueFrom } from 'rxjs';
import { MerchantService } from 'src/app/_services/merchant.service';
import { SwalService } from 'src/app/_services/swal.service';
import { getTopProduct } from 'src/app/merchant';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-view-analytics-report',
  templateUrl: './view-analytics-report.component.html',
  styleUrls: ['./view-analytics-report.component.css'],
})
export class ViewAnalyticsReportComponent implements OnInit {
  constructor(
    private merchantService: MerchantService,
    private swalService: SwalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  topProducts: getTopProduct[] | undefined;
  isFetching = false;
  async getData() {
    this.isFetching = true;
    try {
      const userId = localStorage.getItem('user_id');
      if (userId !== null) {
        const res = await lastValueFrom(
          this.merchantService.getProductAnalytics(userId)
        );
        this.topProducts = res;

        this.chartOptions.series = [
          {
            name: 'Total Sold',
            data: res.map((product) => product.product_sold),
          },
        ];

        this.chartOptions.xaxis = {
          categories: this.topProducts.map((product) => product.name),
        };
      } else {
        console.log('User ID not found in localStorage');
      }
    } catch (error) {
      console.log(error);
      this.swalService.errorSwal('Failed to fetch data');
    }
    this.isFetching = false;
  }

  sortByForm: FormGroup = this.fb.group({
    ascending: ["asc", [Validators.required]],
    sort_by: ["-1", [Validators.required]],
  })
  sortTopProducts() {
    const sortingFunction = this.getSortingFunction()
    return this.topProducts ? this.topProducts.sort(sortingFunction) : false
  }

  getSortingFunction() {
    const option = this.sortByForm.controls["sort_by"].value
    const ascending = this.sortByForm.controls["ascending"].value
    switch (option) {
      case "name":
        return (a: { name: string }, b: { name: any }) =>
          ascending === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
      case "sales":
        return (a: { product_sold: number }, b: { product_sold: number }) =>
          ascending === "asc"
            ? a.product_sold - b.product_sold
            : b.product_sold - a.product_sold
      case "price":
        return (a: getTopProduct, b: getTopProduct) => {
          const buyingPowerDiff =
            this.calculateBuyingPower(a) - this.calculateBuyingPower(b)
          return ascending === "asc" ? buyingPowerDiff : -buyingPowerDiff
        }
      case "total_sold":
        return (a: { total_sold: number }, b: { total_sold: number }) =>
          ascending === "asc"
            ? a.total_sold - b.total_sold
            : b.total_sold - a.total_sold
      default:
        return (a: { product_sold: number }, b: { product_sold: number }) =>
          b.product_sold - a.product_sold
    }
  }

  calculateBuyingPower(product: getTopProduct): number {
    const price = product.price
    const productSold = product.product_sold

    if (productSold > 0) {
      return price * productSold
    } else {
      return 0
    }
  }

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        data: [],
      },
    ],
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#000'],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
      },
      offsetX: 0,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: 'Product Sold',
      align: 'center',
      floating: true,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
  };
}
