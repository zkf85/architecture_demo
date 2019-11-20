$(function() {
	var option = {
		title: {
			right: 0,
			text: 'nodes: 100\nedges: 1002',
			textStyle: {
				// color: ,
				// fontSize: ,
				// fontWeight: 
			}
		},
		tooltip: {},
		series: [{
			name: 'weibo',
			type: 'graph',
			layout: 'circular',
			circular: {
				rotateLabel: true
			},
			data: [{
				name: '王思聪',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 100,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '王健林',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '朱博士',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '何炅',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '谢娜',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '刘工',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '谢广坤',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}, {
				name: '梅老板',
				value: 100,
				symbolSize: Math.random() * 100 % 20 + 10,
				label: {
					normal: {
						show: (Math.random() * 100 % 20 + 10) > 20
					}
				},
				itemStyle: {
					color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'][Number((Math.random() * 100).toFixed(0)) % 12]
				}
			}],
			links: [{
				source: '王思聪',
				target: '王健林'
			}, {
				source: '王健林',
				target: '朱博士'
			}, {
				source: '王思聪',
				target: '朱博士'
			}, {
				source: '刘工',
				target: '朱博士'
			}, {
				source: '朱博士',
				target: '谢娜'
			}, {
				source: '谢广坤',
				target: '王思聪'
			}, {
				source: '何炅',
				target: 'n9'
			}, {
				source: '梅老板',
				target: '王健林'
			}, {
				source: '刘工',
				target: '何炅'
			}, {
				source: '王思聪',
				target: '刘工'
			}],
			// roam: true,
			// draggable: true,
			focusNodeAdjacency: true,
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 5,
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.3)'
				}
			},
			label: {
				position: 'right',
				formatter: '{b}'
			},
			lineStyle: {
				color: 'source',
				curveness: 0.3
			},
			emphasis: {
				lineStyle: {
					width: 15
				}
			}
		}]
	}
	
	var forceChart = echarts.init(document.getElementById('force-chart'));
	forceChart.setOption(option);	
});