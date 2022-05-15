import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import AddNew from "./AddNew";
import FullList from "./FullList";

class StudyActivity extends Component{
  constructor() {
    super();
  }


render()
{
  return (
      <div className="container">
        <Tabs>
          <TabList className="tabs">
            <Tab key={1}><a>Add New</a></Tab>
            <Tab key={2}><a>View All</a></Tab>
          </TabList>

          <TabPanel key={1}>
            <AddNew/>
          </TabPanel>
          <TabPanel key={2}>
            <FullList/>
          </TabPanel>

        </Tabs>


      </div>
  )
}

}

export default StudyActivity;
