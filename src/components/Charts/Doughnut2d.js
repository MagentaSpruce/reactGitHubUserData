// Step 1 - Include react
import React from "react";

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars per language",
        //Set the chart subcaption
        // subCaption: "per repo",
        // //Set the x-axis name
        // xAxisName: "Language",
        // //Set the y-axis name
        // yAxisName: "Repos",
        // numberSuffix: "",
        //Set the theme for your chart
        theme: "candy",
        decimals: 0,
        doughnutRadius: "35%",
        showPercentValues: 0,
        // palleteColors: "#f0db4f, #b3f5, #f4cc,#33cc",
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
