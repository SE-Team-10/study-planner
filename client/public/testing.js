
function img() {
	// create data
	var data = [{
		id: "1",
		name: "Development Life Cycle",
		actualStart: Date.UTC(2022, 1, 2),
		actualEnd: Date.UTC(2022, 6, 15),
		children: [{
			id: "1_1",
			name: "Planning",
			actualStart: Date.UTC(2022, 1, 2),
			actualEnd: Date.UTC(2022, 1, 22),
			connectTo: "1_2",
			connectorType: "finish-start",
			progressValue: "75%"
		},
			{
				id: "1_2",
				name: "Design and Prototyping",
				actualStart: Date.UTC(2022, 1, 23),
				actualEnd: Date.UTC(2022, 2, 20),
				connectTo: "1_3",
				connectorType: "start-start",
				progressValue: "60%"
			},
			{
				id: "1_3",
				name: "Evaluation Meeting",
				actualStart: Date.UTC(2022, 2, 23),
				actualEnd: Date.UTC(2022, 2, 23),
				connectTo: "1_4",
				connectorType: "start-start",
				progressValue: "80%"
			},
			{
				id: "1_4",
				name: "Application Development",
				actualStart: Date.UTC(2022, 2, 26),
				actualEnd: Date.UTC(2022, 4, 26),
				connectTo: "1_5",
				connectorType: "finish-finish",
				progressValue: "90%"
			},
			{
				id: "1_5",
				name: "Testing",
				actualStart: Date.UTC(2022, 4, 29),
				actualEnd: Date.UTC(2022, 5, 15),
				connectTo: "1_6",
				connectorType: "start-finish",
				progressValue: "60%"
			},
			{
				id: "1_6",
				name: "Deployment",
				actualStart: Date.UTC(2022, 5, 20),
				actualEnd: Date.UTC(2022, 5, 27),
				connectTo: "1_7",
				connectorType: "start-finish",
				progressValue: "100%"
			},
			{
				id: "1_7",
				name: "Maintenance",
				actualStart: Date.UTC(2022, 5, 30),
				actualEnd: Date.UTC(2022, 6, 11),
				progressValue: "40%"
			},

		]
	},
		{
			id: "2",
			name: "Software Engineering Project",
			actualStart: Date.UTC(2022, 2, 2),
			actualEnd: Date.UTC(2022, 3, 14),
			module: "Software Engineering",
			type:"Group Coursework",
			children: [{
				id: "1_1",
				name: "Planning",
				actualStart: Date.UTC(2022, 2, 3),
				actualEnd: Date.UTC(2022, 3, 13),
				connectTo: "1_2",
				connectorType: "finish-start",
				progressValue: "75%"
			}]
		}


	];
	// create a data tree
	var treeData = anychart.data.tree(data, "as-tree");

	// create a chart
	var chart = anychart.ganttProject();

	// set the data
	chart.data(treeData);
	// configure the scale
	chart.getTimeline().scale().maximum(Date.UTC(2022, 06, 30));
	// set the container id
	chart.container("container");
	// initiate drawing the chart
	chart.draw();
	// fit elements to the width of the timeline
	chart.fitAll();

	return data;
};