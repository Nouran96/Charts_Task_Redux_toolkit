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
          tooltip: {
            enabled: false,
          },
          dataLabels: {
            enabled: true,
            formatter: function (val: string) {
              return val + "°";
            },
            offsetX: 5,
            style: {
              colors: ["var(--secondary-color)"],
            },
          },
          colors: ["var(--secondary-color)"],
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "History",
            align: "left",
            style: {
              color: "var(--main-color)",
              fontSize: "18px",
              fontFamily: "var(--main-font), Helvetica, Arial, sans-serif",
              fontWeight: 600,
            },
          },
          subtitle: {
            text: "Weather data for last 24, 12 & 6 hours",
            style: {
              fontSize: "14px",
              fontFamily: "var(--main-font), Helvetica, Arial, sans-serif",
              fontWeight: 300,
            },
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          yaxis: {
            labels: {
              offsetX: -10,
              formatter: function (value) {
                return roundNumberToTwoDecimalPlaces(value) + "°";
              },
              align: "center",
              style: {
                fontFamily: "var(--main-font), Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "var(--main-color)",
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
              style: {
                fontFamily: "var(--main-font), Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                colors: "var(--main-color)",
              },
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
