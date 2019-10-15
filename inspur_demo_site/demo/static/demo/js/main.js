// KF 
// 2019年 10月 02日 星期三 17:28:33 CST
//alert('[kf info] im here!!!')
var label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

/* universal variable */
step = 0;
step_increment  = 10;

//max_step = 500;
//max_step = 32900;
max_step = 5000;
timer_interval = 10;
/* make a stop watch */
var start = document.getElementById('start'),
stop= document.getElementById('stop'),
reset = document.getElementById('reset'),
step_text = document.getElementById('step'),
t;
function add() {
  step += 1;
  step_text.textContent = step;
  if (step % step_increment == 0) {
      $.ajax({
        type: 'GET',
        url: '/ajax/update_all/',
        data: { 'step': step},
        data_type: 'json',
        success: function(ret) {
          for (i=0; i < label_list.length; i++) {
            //console.log('curent step is' + i)
            //console.log(ret['fpga'][label_list[i]][0])
            $(`#fpga${i+1}-bar1`).width(ret['fpga'][label_list[i]][0]*100 + '%')
            $(`#fpga${i+1}-label2`).text(label_list[ret['fpga'][label_list[i]][1]])
            $(`#fpga${i+1}-bar2`).width(ret['fpga'][label_list[i]][2]*100 + '%')
            $(`#fpga${i+1}-label3`).text(label_list[ret['fpga'][label_list[i]][3]])
            $(`#fpga${i+1}-bar3`).width(ret['fpga'][label_list[i]][4]*100 + '%')

            $(`#cpu${i+1}-bar1`).width(ret['cpu'][label_list[i]][0]*100 + '%')
            $(`#cpu${i+1}-label2`).text(label_list[ret['cpu'][label_list[i]][1]])
            $(`#cpu${i+1}-bar2`).width(ret['cpu'][label_list[i]][2]*100 + '%')
            $(`#cpu${i+1}-label3`).text(label_list[ret['cpu'][label_list[i]][3]])
            $(`#cpu${i+1}-bar3`).width(ret['cpu'][label_list[i]][4]*100 + '%')
          }
            lossChart.data.datasets[0].data.push(ret['loss_acc'][0]);
            lossChart.data.datasets[1].data.push(ret['loss_acc'][1]);
            lossChart.update();
            accChart.data.datasets[0].data.push(ret['loss_acc'][2]);
            accChart.data.datasets[1].data.push(ret['loss_acc'][3]);
            accChart.update();
        }      
      })
    }
  timer();
  if (step == max_step) {
    clearTimeout(t);
    step = 0;
    chart_3.data.datasets[0].data = chart_3_data;
    //chart_4.data.datasets[0].data = chart_4_data;
    chart_3.update();
    //chart_4.update();
    num1.innerHTML = '0.096';
    num2.innerHTML = '1510';
    num3.innerHTML = '33.556';

  }
}
function timer() {
  t = setTimeout(add, timer_interval);

}
/* Start button */
start.onclick = timer;
/* Stop button */
stop.onclick = function() {
  clearTimeout(t);
}
/* Clear button */
reset.onclick = function() {
  clearTimeout(t);
  step_text.textContent = '0'
  step = 0
  $('.green-bar').animate({width:'2px'}, 500)
  $('.red-bar').animate({width:'2px'}, 500)
  // clear loss chart
  lossChart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  lossChart.update();
  // clear acc chart
  accChart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  accChart.update();
  chart_3.data.datasets[0].data = [];
  //chart_4.data.datasets[0].data = [];
  chart_3.update();
  //chart_4.update();
  num1.innerHTML = '';
  num2.innerHTML = '';
  num3.innerHTML = '';

}

/* draw charts */
step_labels = new Array()
for(i=0; i<=max_step; i+=step_increment) {
  step_labels.push(i)
}
ctx_1 = document.getElementById('lossChart').getContext('2d');
lossChart = new Chart(ctx_1, {
    type: 'line',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //labels: [0,1,2,3,4,5,6,7,8,9,10],
        //labels:['0', '10', '20', '30', '40'],
        labels: step_labels,
        datasets: [
            {
                label: 'FPGA',
                fill: false,  //是否要显示数据部分阴影面积块  false:不显示
                borderColor: "rgba(200,187,205,1)",//数据曲线颜色
                pointBackgroundColor: "#fff", //数据点的颜色
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',

                borderWidth: 1
            },
            {
                label: 'CPU',
                fill: false,  //是否要显示数据部分阴影面积块  false:不显示
                borderColor: "rgba(75,192,192,1)",//数据曲线颜色
                pointBackgroundColor: "#f1f", //数据点的颜色
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',

                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio : false,
        title:{
            display:false,
            text:'训练loss曲线',
            fontSize : 20,
        },
        //不禁用动画
        animation:{
            duration:0,
        },

        //提示功能
        tooltips:{
          enable:true
        },
        //顶部的文字提示
        legend:{
          display:false,
        },
        scales: {
            xAxes: [{
                ticks: {
                  beginAtZero: true,
                    min: 0,
                    max: max_step,
                    stepSize: 100,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1.2,
                    min: 0,
                    stepSize: 0.3
                }
            }]
        }
    }
});

ctx_2 = document.getElementById('accChart').getContext('2d');
accChart = new Chart(ctx_2, {
    type: 'line',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //labels: [0,1,2,3,4,5,6,7,8,9,10],
        //labels:['0', '10', '20', '30', '40'],
        labels: step_labels,
        datasets: [
            {
                label: 'FPGA',
                fill: false,  //是否要显示数据部分阴影面积块  false:不显示
                borderColor: "rgba(200,187,205,1)",//数据曲线颜色
                pointBackgroundColor: "#fff", //数据点的颜色
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',

                borderWidth: 1
            },
            {
                label: 'CPU',
                fill: false,  //是否要显示数据部分阴影面积块  false:不显示
                borderColor: "rgba(75,192,192,1)",//数据曲线颜色
                pointBackgroundColor: "#f1f", //数据点的颜色
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',

                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio : false,
        title:{
            display:false,
            text:'训练Acc曲线',
            fontSize : 20,
        },
        //不禁用动画
        animation:{
            duration:0,
        },

        //提示功能
        tooltips:{
          enable:true
        },
        //顶部的文字提示
        legend:{
          display:false,
        },
        scales: {
            xAxes: [{
                ticks: {
                  beginAtZero: true,
                    min: 0,
                    max: max_step,
                    stepSize: 100,
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1,
                    min: 0,
                    stepSize: 0.25
                }
            }]
        }
    }
});

chart_3_data = [509, 58, 24, 113, 23263, 418];
var ctx_3 = document.getElementById('conv_steps').getContext('2d');
var chart_3 = new Chart(ctx_3, {
    type: 'horizontalBar',
    data: {
        labels: ['write to FPGA', 'input transform', 'filter transform', 'padding', 'kernel run', 'read from FPGA'],
        datasets: [
            {
                label: '每步所花时间',
                fill: true,  //是否要显示数据部分阴影面积块  false:不显示
                borderColor: [
                    "rgba(200,187,205,1)",
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],//数据曲线颜色
                pointBackgroundColor: "#fff", //数据点的颜色
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                barStrokeWidth: '4',

                borderWidth: 2
            },

        ]
    },
    options: {
        maintainAspectRatio : false,
        title:{
            display:true,
            text:'FPGA卷积花费时间',
            fontSize : 14,
        },
        //不禁用动画
        animation:{
            duration:5000,
        },
        //提示功能
        tooltips:{
            enable:true
        },
        //顶部的文字提示
        legend:{
            display:true,
        },
        scales: {
            xAxes:[{
                //轴标题
                scaleLabel:{
                    display:true,
                    labelString:'时间(us)',
                    fontColor:'#666'
                },
                //网格显示
                gridLines:{
                    display:true
                },
                ticks: {
                beginAtZero: true,
                max: 30000
                } 
            }],
            yAxes: [{
                scaleLabel:{
                    display:true,
                    labelString:'FPGA卷积步骤'
                },
                gridLines:{
                    display:true
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var num3 = document.getElementById('num3');


/*
chart_4_data = [2700, 27000];
ctx_4 = document.getElementById('conv_speed').getContext('2d');
chart_4 = new Chart(ctx_4, {
  type: 'bar',
  data: {
      labels: ['CPU', 'FPGA'],
      datasets: [
          {
              label: 'Conv Speed',
              fill: true,  //是否要显示数据部分阴影面积块  false:不显示
              borderColor: [
                  "rgba(200,187,205,1)",
                  'rgba(54, 162, 235, 1)',
              ],//数据曲线颜色
              pointBackgroundColor: "#fff", //数据点的颜色
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              barStrokeWidth: '4',

              borderWidth: 2
          },

      ]
  },
  options: {
      maintainAspectRatio : false,
      title:{
          display:true,
          text:'卷积运行时间 CPU VS FPGA',
          fontSize : 14,
      },
      //不禁用动画
      animation:{
          duration:5000,
      },
      hover:{
          animationDuration:1,
      },
      responsiveAnimationDuration: 1,
      //提示功能
      tooltips:{
        enable:true
      },
      //顶部的文字提示
      legend:{
        display:true,
      },
      scales: {
          xAxes:[{
              //轴标题
              scaleLabel:{
                  display:true,
                  labelString:'设备',
                  fontColor:'#666'
              },
              //网格显示
              gridLines:{
                  display:true
              },
          }],

          yAxes: [{
              scaleLabel:{
                  display:true,
                      labelString:'时间(us)'
              },
              gridLines:{
                  display:true
              },
              ticks: {
                beginAtZero: true,
                max: 30000
              }
          }]
      }
  }
});
*/
