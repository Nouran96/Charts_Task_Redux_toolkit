import { ApexOptions } from "apexcharts";
import * as React from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { useAppSelector } from "../../types/Redux";

type LineChartOptions = {
  options: ApexOptions;
  series: Array<{ name: string; data: Array<number> }>;
};

type LineChartProps = {
  data: Array<{ dt: number; temp: number }> | null;
};

const LineChart = ({ data }: LineChartProps) => {
  const { requestedParams } = useAppSelector((state) => state.weather);

  React.useEffect(() => {
    if (data) {
      setChartOptions({
        series: [
          {
            name: "Temp",
            data: data.map((record) =>
              roundNumberToTwoDecimalPlaces(record.temp)
            ),
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "History",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return roundNumberToTwoDecimalPlaces(value) + "°";
              },
            },
          },
          xaxis: {
            categories: data.map((record) => [
              moment.unix(record.dt).format("ddd D"),
              moment.unix(record.dt).format("hh:mm A"),
            ]),
            labels: {
              rotate: 0,
            },
          },
        },
      });
    }
  }, [requestedParams, data]);

  const [chartOptions, setChartOptions] = React.useState<LineChartOptions>(
    {} as LineChartOptions
  );

  const roundNumberToTwoDecimalPlaces = (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  return (
    <div id="chart">
      {chartOptions.options && (
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="line"
          height={350}
        />
      )}
    </div>
  );
};

export default LineChart;
