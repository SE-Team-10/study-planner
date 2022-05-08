import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import "../../styles/Modal.scss"
import ReactDom from "react-dom";
import SubTask from "../SubTask";
import RadialProgress from "../RadialProgress";



function Task(props) {


    useEffect(() => {
        document.body.classList.add("active-modal");
        document.title = `${task.name} - Study Planner`;

        return () => {
            document.body.classList.remove("active-modal");
            document.title = `Study Planner`;
        }
    });




    let task = [];


    let UTCstart = new Date(task.actualStart);

    let UTCend = new Date(task.actualEnd);

    const taskChildren = task.children;

    let tProgress = 0;
    for(let x in taskChildren){
        tProgress += parseInt(taskChildren[x].progressValue);
    }

    tProgress = tProgress/taskChildren.length;



    return ReactDom.createPortal (
      <>
        <div className="overlay"/>
        <div className="modal">
            <Link to="/" className="close"><span className="close-text">Close</span><span className="material-icons md-24">close</span></Link>
            <div className="hero">
                <div className="hero-content">
                    <RadialProgress percentage={tProgress}/>
                    <div className="task-info">
                        <h2>{task.name}</h2>
                        <div className="info-line">
                            <span className="attr">Assigned: </span>
                            <span className="value">{UTCstart.getDate()+"/"+UTCstart.getMonth()+"/"+UTCstart.getFullYear()}</span>
                        </div>

                        <div className="info-line">
                            <span className="attr">Due: </span>
                            <span className="value">{UTCend.getDate()+"/"+UTCend.getMonth()+"/"+UTCend.getFullYear()}</span>
                        </div>
                        <div className="info-line">
                            <span className="attr">Module: </span>
                            <span className="value">{task.module}</span>
                        </div>

                        <div className="info-line">
                            <span className="attr">Type: </span>
                            <span className="value">{task.type}</span>
                        </div>

                    </div>

                </div>
            </div>
          <div className="content">

              <h3>Notes</h3>
              <p>{task.notes}</p>

              <h3>Tasks</h3>
              {taskChildren.map((item, idx) => (
                  <SubTask key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
              )).flat()}

          </div>
            <div className="modal-footer">
                <div className="modal-footer-content">
                    <div className="footer-buttons">
                        <button>Discard</button>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </div>

      </>,
      document.getElementById('portal')
  );
}

export default withRouter(Task);
