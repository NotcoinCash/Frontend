import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import './Tasks.css'

function CompletedTasks() {
    return (
        <>
            <h1>CompletedTasks</h1>
        </>
    )
}

function ActiveTasks() {
    return (
        <>
            <h1>Active Tasks</h1>
        </>
    )
}

function Tasks() {
    const [taskType, setTaskType] = useState('active')

    return (
        <div className="container">
            <div className="projectname">NCC</div>
            <div className="blur__element">
                <div className="content">
                    <h3 className="tasks__title">Tasks</h3>
                    <div className="tasks__type">
                        <div className="tasks__active task__active">Active</div>
                        <div className="tasks__completed task__active">Complted</div>
                    </div>
                    {/* <div className="sub__content">
                        {taskType === 'active' ? <ActiveTasks></ActiveTasks> : <CompletedTasks></CompletedTasks>}
                    </div> */}
                </div>
            </div>
            <Navbar></Navbar>
        </div>
    )
}

export default Tasks