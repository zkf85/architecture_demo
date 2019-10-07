// KF 
// 2019年 10月 02日 星期三 17:28:33 CST
//alert('[kf info] im here!!!')
var label_list = ['plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];


$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

// $(document).ready(function(){
//   $('#sum').click(function(){
//     var a = $('#a').val();
//     var b = $('#b').val();
//     $.ajax({
//       type: 'GET',
//       url: '/ajax/add/',
//       data: {'a':a, 'b':b},
//       data_type: 'json',
//       success: function(ret){
//         $('#result').html(ret.result)
//         }
//     })
//   });  
// });

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
