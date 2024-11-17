import { useState, useEffect } from "react"
import Navbar from "../../components/navbar/Navbar"
import './Tasks.css'
import PopUp from "../../components/popup/Popup"
import CustomButton from "../../components/CustomButton/CustomButton"

import claimIMG from '../../assets/tasks/claim.svg'
import tapIMG from '../../assets/tasks/tap.svg'
import inviteIMG from '../../assets/tasks/invite.svg'

import { getTasks, updateUserTasks } from "../../utils/api"
import WebApp from '@twa-dev/sdk'


type Task = {
    name: string;
    reward: string;
    icon: string;
    id: number;
    setCurrentTask: any;
    url: string;
};

interface TaskProps {
    tasks: Task[];
}

function TasksList({ tasks, popupFunc, setCurrentTask, taskAction }: TaskProps) {

    return (
        <div className="activeTasks">
            <div className="activeTasks__items">
                {tasks.map((task, index) => (
                    <div key={task.id} className="activeTasks__item"
                    onClick={() => {
                        popupFunc({icon: task.icon, name: task.name, reward: task.reward})
                        setCurrentTask(task.id)
                        taskAction(task.url)}}>
                        <div className="activeTasks__img-wrapper">
                            <img src={task.icon} alt="" className="activeTasks__item-img" />
                        </div>
                        <div className="activeTasks__item-content">
                            <div className="activeTasks__item-text">{task.name}</div>
                            <div className="activeTasks__item-text">{Number(task.reward).toLocaleString('en-US')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Tasks() {
    const [taskType, setTaskType] = useState('active')
    const [popUpData, setPopUpData] = useState({})
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [activeTasks, setActiveTasks] = useState<Array<Task>>([])
    const [completedTasks, setCompletedTasks] = useState<Array<Task>>([])
    const [initData, setInitData] = useState<string>('')
    const [userID, setUserID] = useState<number>(0)
    const [currentTaskID, setCurrentTaskID] = useState<number>(0)
    const [taskURL, setTaskURL] = useState<string>('')
    
    
    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setUserID(WebApp.initDataUnsafe.user.id)
            setInitData(WebApp.initData)
        }
    }, [])

    useEffect(() => {
        if (initData && userID) {
            const tasks = async () => {
                const response = await getTasks(userID, initData)
                setActiveTasks(response.data.uncompleted_tasks)
                setCompletedTasks(response.data.completed_tasks)
            }
            tasks()
        }
    }, [initData, userID])

    useEffect(() => {
        if (!popUpVisible) {
            setPopUpData({})
            console.log('ok')
        }
    }, [popUpVisible])

    useEffect(() => {
        if (Object.keys(popUpData).length > 0) {
            setPopUpVisible(true)
            console.log(Object.keys(popUpData))
        }
    }, [popUpData])

    function handleTypeChange(type: string) {
        setTaskType(type)
    }

    async function doneTask() {
        window.open(taskURL, "_blank");
        const response = await updateUserTasks(userID, initData, currentTaskID)
        console.log(response)
    }

    return (
        <div className="container">
            <div className="projectname">NCC</div>
            <div className="blur__element"></div>
            <div className="content">
                    <h3 className="tasks__title">Tasks</h3>
                    <div className="tasks__type">
                        <div 
                            className={`tasks__type-item ${taskType === 'active' ? 'task__active': ''}`}
                            onClick={() => handleTypeChange('active')}
                            >Active</div>
                        
                        <div 
                            className={`tasks__type-item ${taskType === 'completed' ? 'task__active': ''}`}
                            onClick={() => handleTypeChange('completed')}
                            >Completed</div>
                    </div>
                    <div className="sub__content">
                        <div className="task__text">In-game</div>
                        {
                            taskType === 'active' ?
                            <TasksList taskAction={setTaskURL} setCurrentTask={setCurrentTaskID} popupFunc={setPopUpData} tasks={activeTasks}></TasksList> :
                            <TasksList setCurrentTask={setCurrentTaskID} popupFunc={setPopUpData} tasks={completedTasks}></TasksList>}
                    </div>
                </div>
            <Navbar></Navbar>
            {
            popUpVisible ?
            <PopUp setCloseState={setPopUpVisible}>
                <div className="popup__task">
                    <div className="popup__task-wrapper">
                        <img src={popUpData.icon} className="popup__task-img" />
                    </div>
                    <div className="popup__task-title">{popUpData.name}</div>
                    <div className="popup__task-text">Received</div>
                    <div className="popup__task-reward">+{Number(popUpData.reward).toLocaleString('en-US')}</div>
                    <div className="popup__button-wrapper">
                        <CustomButton onclickAction={doneTask} className="popup__task-button">Ok</CustomButton>
                    </div>
                </div>
            </PopUp>
            : null
            }
        </div>
    )
}

export default Tasks