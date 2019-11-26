$(function() {
	var nodes = [];
	var edges = [];
	
	var palette = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
	
	for(var i = 0; i < 50; i++) {
		nodes.push({
			name: i,
			symbolSize: Math.random() * 40 + 5,
			itemStyle: {
				color: palette[Math.floor(Math.random() * 12)]
			}
		});
		
		var nedges = Math.ceil(Math.random() * 5);
		
		for(var j = 0; j < nedges; j++) {
			edges.push({
				source: i,
				target: Math.floor(Math.random() * 50),
				lineStyle: {
					width: 1
				}
			});
		}
	}
	
	var option = {
		series: [{
			type: 'graph',
			layout: 'circular',
			nodes: nodes,
			edges: edges,
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 1,
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.3)'
				}
			},
			lineStyle: {
				color: 'source',
				curveness: 0.3
			}
		}]
	}
	
	var forceChart = echarts.init(document.getElementById('force-chart'));
	forceChart.setOption(option);
	
	var eid = 0;
	var nid = 0;
	
	setInterval(function() {
		edges[eid].lineStyle.width = 1;
		
		eid = Math.floor(Math.random() * edges.length);
		nid = edges[eid].target;
		
		edges[eid].lineStyle.width = 10;
		nodes[nid].symbolSize = Math.random() * 40 + 5;
		
		forceChart.setOption({
			series: [{
				nodes: nodes,
				edges: edges
			}]
		});
	}, 50);
});