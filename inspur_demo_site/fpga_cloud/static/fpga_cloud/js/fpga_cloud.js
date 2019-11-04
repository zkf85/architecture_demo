$(window).load(function() {
    $('.preload').attr('src', function(i,a){
        $(this).attr('src','')
            .removeClass('preload')
            .attr('src',a);
    });
});

var num = document.getElementById('num');
var watt = document.getElementById('watt');

step.innerHTML = '0';
watt.innerHTML = '2.34';

/* universal variable */
step = 0;
step_increment  = 1;

//max_step = 500;
//max_step = 32900;
max_step = 50;
timer_interval = 20;
/* make a stop watch */
var start = document.getElementById('start'),
stop= document.getElementById('stop'),
reset = document.getElementById('reset'),
t;
function add() {
	$.ajax({
		async: false,
		type: 'get',
		url: '/ajax/update_img',
		data: { 'step': step},
		data_type: 'json',
		success: function(ret) {
			console.log(ret['top_1'])
			console.log(ret['top_2'])
			console.log(ret['top_3'])
			$('#png_image').attr('src', ret['png_src']);
		  	$('#top_1_label').text(ret['top_1'][0]);
		  	$('#top_1_bar').width(ret['top_1'][1]*100 + '%');
		  	$('#top_2_label').text(ret['top_2'][0]);
		  	$('#top_2_bar').width(ret['top_2'][1]*100+ '%');
		  	$('#top_3_label').text(ret['top_3'][0]);
		  	$('#top_3_bar').width(ret['top_3'][1]*100+ '%');

		  	$('#step').text(step);

		}      
	})
  step += 1;
  if (step == max_step) {
  	timer_reset()
  }
  timer();
}

function timer_reset() {
  clearTimeout(t);
  $('#step').text('0');
  step = 0
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
reset.onclick = function () {
	timer_reset();
	clearTimeout(t);
	$('#top_1_label').text('n/a');
	$('#top_2_label').text('n/a');
	$('#top_3_label').text('n/a');
	$('#top_1_bar').animate({width:'10px'}, 200)
	$('#top_2_bar').animate({width:'10px'}, 200)
	$('#top_3_bar').animate({width:'10px'}, 200)
}


