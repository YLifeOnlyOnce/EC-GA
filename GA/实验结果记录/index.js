/*
 * @Author: yaoyaoyu
 * @Date: 2021-10-16 16:56:45
 */


// 任务个数

var chartDom = document.getElementById('result-chart');
var myChart = echarts.init(chartDom);
var option;

option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['任务个数', 'MEA', 'MEA-NS', 'GA','GA-NS'],
      ['10', 461, 573, 1476, 1273],
      ['15', 1332, 1458, 2289, 2450],
      ['20', 1506, 2445, 2857, 2953],
      ['25', 1904, 2550, 3189, 3542]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};

option && myChart.setOption(option);



var sizedom = document.getElementById('result-size-chart');
var sizeChart = echarts.init(sizedom);
var size_option;

size_option = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['MEA', 'MEA-NS', 'GA', 'GA-NS']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2000', '3000', '4000', '5000', '6000', '7000', '8000','9000','10000']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'MEA',
      type: 'line',
      // stack: 'Total',
      data: [102, 167, 252, 273, 300, 433, 396, 400, 673]
    },
    {
      name: 'MEA-NS',
      type: 'line',
      // stack: 'Total',
      data: [234, 271, 353, 460, 595, 721, 700, 772, 1087]
    },
    {
      name: 'GA',
      type: 'line',
      // stack: 'Total',
      data: [219, 458, 670, 818, 965, 1200, 1425, 1452, 1592]
    },
    {
      name: 'GA-NS',
      type: 'line',
      // stack: 'Total',
      data: [320, 666, 898, 995, 1403, 1468, 1594, 1595,1920]
    },
  ]
};

sizeChart && sizeChart.setOption(size_option);





// 卸载成功率
var timedom = document.getElementById('time-chart');
var timeChart = echarts.init(timedom);
var time_option;

time_option = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['MEA', 'GA']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2000', '3000', '4000', '5000', '6000', '7000', '8000','9000','10000']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'MEA',
      type: 'line',
      // stack: 'Total',
      data: [0.66, 1.13, 1.28, 1.67, 2.28, 2.32, 3.2, 4.2, 4.6]
    },
    {
      name: 'GA',
      type: 'line',
      // stack: 'Total',
      data: [1.50, 1.95, 2.74, 2.83, 3.38, 4.31, 6.2, 6.1, 6.7]
    },
   
  ]
};

timeChart && timeChart.setOption(time_option);



// 卸载成功率
var timetaskdom = document.getElementById('time-task-chart');
var timetaskChart = echarts.init(timetaskdom);
var time_task_option;

time_task_option = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['MEA', 'GA']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['10', '15', '20', '25',]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'MEA',
      type: 'line',
      // stack: 'Total',
      data: [0.84, 0.95, 1.86, 2.89]
    },
    {
      name: 'GA',
      type: 'line',
      // stack: 'Total',
      data: [1.72, 1.74, 2.81, 11.65]
    },
   
  ]
};

timetaskChart && timetaskChart.setOption(time_task_option);



// 卸载成功率
var ctocdom = document.getElementById('c-c');
var c2cChart = echarts.init(ctocdom);
var c2c_option;

c2c_option = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['MEA', 'GA']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0', '20', '40', '60', '80',]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'MEA',
      type: 'line',
      // stack: 'Total',
      data: [81, 83, 85, 87,89]
    },
   
  ]
};

c2cChart && c2cChart.setOption(c2c_option);



// 卸载成功率
var iteratespeeddom = document.getElementById('iteratespeed');
var iteratespeedChart = echarts.init(iteratespeeddom);
var iteratespeed_option;

iteratespeed_option = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['MEA', 'GA']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0', '100', '200', '300', '400','500','600','700','800','900','1000']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'MEA',
      type: 'line',
      // stack: 'Total',
      data: [14869,5452, 3431, 2341, 1894,1394,952,862,830,824,815]
    },
    {
      name: 'GA',
      type: 'line',
      // stack: 'Total',
      data: [14869, 7528, 5547, 3236, 2893,2422,1653,1463,1243,1210,1188]
    },
   
  ]
};

iteratespeedChart && iteratespeedChart.setOption(iteratespeed_option);