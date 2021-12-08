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
            style: {
              colors: ["var(--secondary-color)"],
            },
          },
          colors: ["var(--secondary-color)"],
          stroke: {
            curve: "smooth",
            // colors: ["var(--secondary-color)"],
          },
          title: {
            text: "History",
            align: "left",
            style: {
              color: "var(--main-color)",
              fontSize: "18px",
              fontFamily: "Oswald, Helvetica, Arial, sans-serif",
              fontWeight: 400,
            },
          },
          subtitle: {
            text: "Weather data for last 24, 12 & 6 hours",
            style: {
              fontSize: "14px",
              fontFamily: "Oswald, Helvetica, Arial, sans-serif",
              fontWeight: 200,
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
              formatter: function (value) {
                return roundNumberToTwoDecimalPlaces(value) + "°";
              },
              align: "center",
              style: {
                fontFamily: "Oswald, Helvetica, Arial, sans-serif",
                fontWeight: 300,
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
                fontFamily: "Oswald, Helvetica, Arial, sans-serif",
                fontWeight: 300,
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
