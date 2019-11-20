function clear_data() {
	for (i=0; i < list_length; i++) {
	    $(`#f-id-${i+1}`).text('')
	    $(`#f-pr-${i+1}`).text('')
	    $(`#c-id-${i+1}`).text('')
	    $(`#c-pr-${i+1}`).text('')
	}
	$('#dataset').text('')
	$('#f-counter').text('')
	$('#c-counter').text('')
	$('#f-time-per-loop').text('')
	$('#c-time-per-loop').text('')
	$('#f-mteps').text('')
	$('#c-mteps').text('')

}
/* Single Processing */
list_length=10

$("#dataset1-reset").click(function () {
	clear_data()	
	$('#dataset').text('数据集一')
});
$("#dataset2-reset").click(function () {
	clear_data()	
	$('#dataset').text('数据集二')
	
});

$("#dataset1-run").click(function () {
	$.ajax({
		async: false,
		type: 'get',
		url: '/ajax/cpu',
		data: { 'dataset': 1},
		data_type: 'json',
		success: function(ret) {
			for (i=0; i < ret['id_list'].length; i++) {
		        $(`#c-id-${i+1}`).text(ret['id_list'][i])
		        $(`#c-pr-${i+1}`).text(ret['pr_list'][i])
        	}
        	$('#dataset').text('数据集一')
        	$('#c-counter').text(ret['edges'])
        	$('#c-time-per-loop').text(ret['time'])
        	$('#c-mteps').text(ret['mteps'])
		}      
	})
});

$("#dataset2-run").click(function () {
	$.ajax({
		async: false,
		type: 'get',
		url: '/ajax/cpu',
		data: { 'dataset': 2},
		data_type: 'json',
		success: function(ret) {
			for (i=0; i < ret['id_list'].length; i++) {
		        $(`#c-id-${i+1}`).text(ret['id_list'][i])
		        $(`#c-pr-${i+1}`).text(ret['pr_list'][i])
        	}
        	$('#dataset').text('数据集二')
        	$('#c-counter').text(ret['edges'])
        	$('#c-time-per-loop').text(ret['time'])
        	$('#c-mteps').text(ret['mteps'])
		}      
	})

});


/* Loop Processing */

f_total_edges = 0		// total edges fpga
c_total_edges = 0		// total edges cpu
option = 1			// dataset switch variable, either 1 or 2
stop_flag = false

/* make a stop watch */
timer_interval = 50

var start = document.getElementById('loop-run'),
stop= document.getElementById('loop-stop'),
reset = document.getElementById('loop-reset'),
t_fpga, t_cpu;

function timer_fpga() {
	if (!stop_flag)
		t_fpga = setTimeout(add_fpga, timer_interval);
}
function timer_cpu() {
	if (!stop_flag)
		t_cpu = setTimeout(add_cpu, timer_interval);
}

function add_fpga() {
	/* switch the dataset option flag to the opposite */
	if (option == 1)
		tmp = 2
	else
		tmp = 1
	console.log('fpga')
	$.ajax({
		//async: false,
		type: 'get',
		url: '/ajax/fpga',
		data: { 'dataset': tmp},
		data_type: 'json',
		success: function(ret) {
			f_total_edges += ret['edges']
			for (i=0; i < ret['id_list'].length; i++) {
		        $(`#f-id-${i+1}`).text(ret['id_list'][i])
		        $(`#f-pr-${i+1}`).text(ret['pr_list'][i])
        	}

        	$('#f-counter').text(f_total_edges)
        	$('#f-time-per-loop').text(ret['time'])
        	$('#f-mteps').text(ret['mteps'])

			timer_fpga();
		}      
	})
}

function add_cpu() {
	console.log('cpu')
	$.ajax({
		//async: false,
		type: 'get',
		url: '/ajax/cpu',
		data: { 'dataset': option},
		data_type: 'json',
		success: function(ret) {
			c_total_edges += ret['edges']
			for (i=0; i < ret['id_list'].length; i++) {
		        $(`#c-id-${i+1}`).text(ret['id_list'][i])
		        $(`#c-pr-${i+1}`).text(ret['pr_list'][i])
        	}

        	$('#c-counter').text(c_total_edges)
        	$('#c-time-per-loop').text(ret['time'])
        	$('#c-mteps').text(ret['mteps'])
        	/* switch dataset using option */
        	if (option == 1) {
	        	$('#dataset').text('数据集一')
        		option = 2
	        }
        	else {
	        	$('#dataset').text('数据集二')
        		option =1
	        }

			timer_cpu();
		}      
	})

}

/* Start button */
start.onclick = function() {
	stop_flag = false
	timer_fpga();
	timer_cpu();
}
/* Stop button */
stop.onclick = function() {
	stop_flag = true
	clearTimeout(t_fpga);
	clearTimeout(t_cpu);
}
/* Clear button */
reset.onclick = function() {
	stop_flag = true
	clearTimeout(t_fpga);
	clearTimeout(t_cpu);
	clear_data();
	f_total_edges = 0;
	c_total_edges = 0;
	option = 1;
}







































