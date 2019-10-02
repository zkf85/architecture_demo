// KF 
// 2019年 10月 02日 星期三 17:28:33 CST
//alert('[kf info] im here!!!')

$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

$(document).ready(function(){
  $('#sum').click(function(){
    var a = $('#a').val();
    var b = $('#b').val();
    $.ajax({
      type: 'GET',
      url: '/ajax/add/',
      data: {'a':a, 'b':b},
      data_type: 'json',
      success: function(ret){
        $('#result').html(ret.result)
        }
    })
  });  
});

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
