function img(data) {
	// create data
	var tdata = [{
		id: "1",
		name: "VOIP Project",
		module: "Networks",
		type:"Group Coursework",
		actualStart: Date.UTC(2022, 1, 2),
		actualEnd: Date.UTC(2022, 6, 15),
		children: [{
			id: "1_1",
			name: "Initial Implementation",
			actualStart: Date.UTC(2022, 1, 2),
			actualEnd: Date.UTC(2022, 1, 22),
			connectTo: "1_2",
			connectorType: "finish-start",
			progressValue: "100%"
		},
			{
				id: "1_2",
				name: "Group Report",
				actualStart: Date.UTC(2022, 1, 23),
				actualEnd: Date.UTC(2022, 2, 20),
				connectTo: "1_3",
				connectorType: "start-start",
				progressValue: "60%"
			},
			{
				id: "1_3",
				name: "Individual Report",
				actualStart: Date.UTC(2022, 2, 23),
				actualEnd: Date.UTC(2022, 2, 23),
				connectTo: "1_4",
				connectorType: "start-start",
				progressValue: "80%"
			},
			{
				id: "1_4",
				name: "Revision",
				actualStart: Date.UTC(2022, 2, 30),
				actualEnd: Date.UTC(2022, 2, 30),
				progressValue: "80%"
			}

		]
	},
		{
			id: "2",
			name: "Software Engineering Project",
			actualStart: Date.UTC(2022, 2, 2),
			actualEnd: Date.UTC(2022, 3, 28),
			module: "Software Engineering",
			type:"Group Coursework",
			notes:"The goal of the project is to give you experience of a team-based development project in a\n" +
				"realistic setting such as you might encounter it in an industrial environment. In this project\n" +
				"you can apply the knowledge you learned during the lectures. The project involves analysing\n" +
				"a given project spec, planning and managing the project execution, designing, implementing\n" +
				"and testing system modules, integrating these systems modules with those programmed by\n" +
				"others, and presenting the final product.",
			children: [{
				id: "1_1",
				name: "Use cases",
				actualStart: Date.UTC(2022, 2, 3),
				actualEnd: Date.UTC(2022, 3, 13),
				connectTo: "1_2",
				connectorType: "finish-start",
				progressValue: "75%"
			},
				{
					id: "1_2",
					name: "Class diagrams",
					actualStart: Date.UTC(2022, 2, 6),
					actualEnd: Date.UTC(2022, 3, 21),
					connectTo: "1_2",
					connectorType: "finish-start",
					progressValue: "75%"
				}]
		},
		{
			id: "3",
			name: "Exam 1",
			actualStart: Date.UTC(2022, 2, 24),
			actualEnd: Date.UTC(2022, 2, 24),
			module: "Data Structures and Algorithms",
			type:"Online Exam",
			notes:"Here's some notes about this exam.",
			children: [{
				id: "3_1",
				name: "Use cases",
				actualStart: Date.UTC(2022, 2, 3),
				actualEnd: Date.UTC(2022, 3, 13),
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
	chart.getTimeline().scale().maximum(Date.UTC(2022, 6, 30));
	// set the container id
	chart.container("container");
	// initiate drawing the chart
	chart.draw();
	// fit elements to the width of the timeline
	chart.fitAll();

	return data;
}
