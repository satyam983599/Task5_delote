document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("barChart").getContext("2d");

  var initialData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Data",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  var lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Data",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  var initialOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Month: ${tooltipItem.label}\nSales: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
  };

  var colorOptions = [
    "rgba(54, 162, 235, 0.6)", // Blue
    "rgba(255, 99, 132, 0.6)", // Red
    "rgba(255, 159, 64, 0.6)", // Orange
    "rgba(75, 192, 192, 0.6)", // Teal
    "rgba(153, 102, 255, 0.6)", // Purple
    "rgba(255, 206, 86, 0.6)", // Yellow
  ];

  var colorIndex = 0;
  var chartType = "bar"; // Default chart type

  var barChart = new Chart(ctx, {
    type: chartType,
    data: initialData,
    options: initialOptions,
  });

  // Event listeners
  document
    .getElementById("updateDataButton")
    .addEventListener("click", function () {
      const dataInput = document.getElementById("dataInput").value;
      try {
        const newData = JSON.parse(dataInput);
        updateChartData(barChart, newData);
      } catch (e) {
        alert("Invalid data format. Please enter a valid JSON array.");
      }
    });

  document
    .getElementById("updateChartTypeButton")
    .addEventListener("click", function () {
      const newType = document.getElementById("chartTypeSelect").value;
      updateChartType(barChart, newType);
    });

  document
    .getElementById("changeColorButton")
    .addEventListener("click", function () {
      updateChartColor(barChart);
    });

  document
    .getElementById("resetChartButton")
    .addEventListener("click", function () {
      resetChart(barChart);
    });

  document
    .getElementById("toggleThemeButton")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });

  document
    .getElementById("exportDataButton")
    .addEventListener("click", function () {
      const dataStr = JSON.stringify(barChart.data.datasets[0].data);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart-data.json";
      a.click();
      URL.revokeObjectURL(url);
    });

  function updateChartData(chart, newData) {
    if (chartType === "bar") {
      chart.data.datasets[0].data = newData;
    } else if (chartType === "line") {
      chart.data.datasets[0].data = newData;
    }
    chart.update();
  }

  function updateChartType(chart, newType) {
    chartType = newType; // Update the global chart type
    chart.destroy(); // Destroy the existing chart instance

    var newData = newType === "line" ? lineData : initialData;
    var newOptions = Object.assign({}, initialOptions, {
      elements: {
        line: {
          borderWidth: 2,
          tension: 0.1,
        },
        bar: {
          borderRadius: 8,
          barThickness: 30,
        },
      },
    });

    barChart = new Chart(ctx, {
      type: chartType,
      data: newData,
      options: newOptions,
    });
  }

  function updateChartColor(chart) {
    colorIndex = (colorIndex + 1) % colorOptions.length;
    if (chartType === "bar") {
      chart.data.datasets[0].backgroundColor = colorOptions[colorIndex];
    } else if (chartType === "line") {
      chart.data.datasets[0].backgroundColor = colorOptions[colorIndex];
      chart.data.datasets[0].borderColor = colorOptions[colorIndex];
    }
    chart.update();
  }

  function resetChart(chart) {
    chart.destroy();
    var initialDataForType = chartType === "line" ? lineData : initialData;
    barChart = new Chart(ctx, {
      type: chartType, // Keep the current type
      data: initialDataForType,
      options: initialOptions,
    });
  }
});
