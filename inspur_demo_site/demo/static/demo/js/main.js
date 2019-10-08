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
max_step = 500;
timer_interval = 50;
/* make a stop watch */
var start = document.getElementById('start'),
stop= document.getElementById('stop'),
reset = document.getElementById('reset'),
step_text = document.getElementById('step'),
t;
function add() {
  step += 1;
  step_text.textContent = step;
  if (step % 10 == 0) {
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
            // $('#fpga1-bar1').width(ret.label_list[[0]*100 + '%')
            // $('#fpga1-label2').text(label_list[ret.plane[1]])
            // $('#fpga1-bar2').width(ret.plane[2]*100 + '%')
            // $('#fpga1-label3').text(label_list[ret.plane[3]])
            // $('#fpga1-bar3').width(ret.plane[4]*100 + '%')
        }      
      })
    }
  timer();
  if (step == max_step) {
    clearTimeout(t)
    step = 0
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
}


/* update column2-row-1 */
$(document).ready(function() {
  $('#sum').click(function() {
    var step = $('#a').val();
    $.ajax({
      type: 'GET',
      url: '/ajax/update_all/',
      data: { 'step': step},
      data_type: 'json',
      success: function(ret) {
          $('#result').html(ret.plane)
          $('#fpga1-bar1').width(ret.plane[0]*100 + '%')
          $('#fpga1-label2').text(label_list[ret.plane[1]])
          $('#fpga1-bar2').width(ret.plane[2]*100 + '%')
          $('#fpga1-label3').text(label_list[ret.plane[3]])
          $('#fpga1-bar3').width(ret.plane[4]*100 + '%')
        // for (i=0; i < label_list.length; i++) {
        //   l = label_list[i]
        //   ret_list = ret.'${l}'
        //   alert(ret_list)
          // $('#fpga1-bar1').width(ret.l[0])

          // $('#result').html(ret)
           // $('#a1-bar1').width(ret.l.get(0)*100 + '%')
          // $('#a1-label2').text(label_list[ret.label_list[i][1]])
          // $('#a1-bar2').width(ret[label_list[i]][2]*100 + '%')
          // $('#a1-label3').text(label_list[ret.label_list[i][3]])
          // $('#a1-bar3').width(ret.label_list[i][4]*100 + '%')
        // }
      }      
    })
  })
})

$(document).ready(function(){
  $('#refresh_chart').click(function(){
    $.ajax({
      type: 'GET',
      url: '/ajax/refresh_chart/',
      //data: {'a':a, 'b':b},
      //data_type: 'json',
      success: function(ret){
        myChart.data.datasets[0].data = ret.list
        myChart.update()
        }
    })
  });
});

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
        }]
      }
    }
});
