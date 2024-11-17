import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export async function createUser(userID: number, userName: string, initData: string, referalID: number, photoURL: string) {
    const body = {
        id: userID,
        username: userName,
        photo: photoURL,
        referrer_id: referalID
    }
    const response = await axios.post(baseURL + '/users', body, {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })

    return response.data
}

export async function getUser(userID: number, initData: string) {
    const response = await axios.get(baseURL + '/users/' + userID, {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}

export async function getFriends(userID: number, initData: string) {
    const response = await axios.get(baseURL + '/users/' + userID + '/friends', {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}

export async function getTasks(userID: number, initData: string) {
    const response = await axios.get(baseURL + '/users/' + userID + '/tasks', {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}

export async function getBoosts(userID: number, initData: string) {
    const response = await axios.get(baseURL + '/users/' + userID + '/boosts', {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}

export async function updateBoostsInfo(
    userID: number,
    initData: string,
    boostID: number,
    boostLVL: number) {
    
    const data = {
        user_id: userID,
        boost_id: boostID,
        boost_level: boostLVL
    }
    const response = await axios.patch(baseURL + '/users' + '/update-boosts-info', data, {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })

    return response.data
}

export async function updateUserTasks(userID: number, initData: string, taskID: number) {
    const data = {
        user_id: userID,
        task_id: taskID
    }
    const response = await axios.patch(baseURL + '/users' + '/update-user-tasks', data, {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}

export async function getTokenInfo() {
    const response = await axios.get(baseURL + '/token')
    return response.data
}

export async function updateBalance(userID: number, initData: string, tokens: number) {
    const data = {
        user_id: userID,
        tokens: tokens
    }

    const response = await axios.patch(baseURL + '/users' + '/update-user-balance', data, {
        headers: {
            'Authentication': 'initData ' + initData
        }
    })
    return response.data
}