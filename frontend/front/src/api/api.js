const config = require('../config/config')
const fetch = require('fetch-retry')(global.fetch, {retryDelay: 100});

export const api = {

    getCurrentUserInfo: async () => {
        let res = await fetch(config.urls.get_current_user_data_url, {
            method: "POST",
            credentials: 'include',
            retryOn: function(attempt, error, response){
                if (attempt > 0){
                    return false
                }
                if (error !== null || response.status === 401) {
                    api.refreshToken()
                    return true
                }
            },
            retries: 1,
        })

        if (!res.ok){
            throw new Error("not authenticated")
        }
        return res.json()
    },

    getUserByLogin: async (login) => {
        let res = await fetch(config.urls.get_user_data_by_login_url + login, {
            method: "GET"
        })
        let data = await res.json()

        if (!res.ok){
            throw new Error(data['status'])
        }
        return data
    },


    deletePostById: async (id) => {
        let res = await fetch(config.urls.delete_post_url + id, {
            method: "DELETE",
            credentials: 'include',
            retryOn: function(attempt, error, response){
                if (attempt > 0){
                    return false
                }
                if (error !== null || response.status === 401) {
                    api.refreshToken()
                    return true
                }
            },
        })
    },

    getPostsFromUser: async (login) => {
        let res = await fetch(config.urls.get_posts_from_user_url + login + '/posts', {
            method: 'GET'
        })
        let data = await res.json()
        return data
    },

    refreshToken: async ()=>{
        let refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken){
            return
        }
        await fetch(config.urls.refresh_token_url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh_token: refreshToken})
        })
    }
}