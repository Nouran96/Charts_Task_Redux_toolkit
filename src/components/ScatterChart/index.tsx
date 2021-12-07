import { ApexOptions } from "apexcharts";
import * as React from "react";
import Chart from "react-apexcharts";
import { useAppSelector } from "../../types/Redux";

type ScatterChartOptions = {
  options: ApexOptions;
  series: Array<{ name: string; data: Array<Array<number | string>> }>;
};

type ScatterChartProps = {
  data: Array<{ node: { name: string; population: number } }> | null;
};

const ScatterChart = ({ data }: ScatterChartProps) => {
  React.useEffect(() => {
    if (data && data.length > 0) {
      setChartOptions({
        series: [
          {
            name: "Population",
            data: data.map((city: any, index: number) => [
              index + 1, // The country index on x axis the same as its index in array
              city.node.population,
            ]),
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "scatter",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "Highest Populated Cities",
            align: "center",
          },
          xaxis: {
            type: "category",
            categories: data.map((city: any) => city.node.name),
            labels: {
              rotate: 0,
              trim: true,
              hideOverlappingLabels: false,
            },
          },
        },
      });
    }
  }, [data]);

  const [chartOptions, setChartOptions] = React.useState<ScatterChartOptions>(
    {} as ScatterChartOptions
  );

  return (
    <div id="chart">
      {chartOptions.options && (
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="scatter"
          height={350}
        />
      )}
    </div>
  );
};

export default ScatterChart;
