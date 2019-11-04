$(window).load(function() {
    $('.preload').attr('src', function(i,a){
        $(this).attr('src','')
            .removeClass('preload')
            .attr('src',a);
    });
});

var num = document.getElementById('num');
var fps = document.getElementById('fps');
var watt = document.getElementById('watt');

step.innerHTML = '12';
fps.innerHTML = '100';
watt.innerHTML = '10.24';

/* universal variable */
step = 0;
step_increment  = 1;

//max_step = 500;
//max_step = 32900;
max_step = 500;
timer_interval = 20;
/* make a stop watch */
var start = document.getElementById('start'),
stop= document.getElementById('stop'),
reset = document.getElementById('reset'),
step_text = document.getElementById('step'),
top_1 = document.getElementById('top_1'),
t;
frame = 0
function add() {
  step += 1;
  if (step % step_increment == 0) {
	$.ajax({
		async: false,
		type: 'GET',
		url: '/ajax/update_small',
		data: { 'step': step},
		data_type: 'json',
		success: function(ret) {
			console.log(ret['cls'])
			$('#img_flow').attr('src', ret['src']);
		  	top_1.textContent = ret['cls'];
			frame += 1;
		  	step_text.textContent = frame;

		}      
	})
  }
  timer();
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
reset.onclick = reset()


 function reset() {
  clearTimeout(t);
  step_text.textContent = '0'
  step = 0
  i = 0
}