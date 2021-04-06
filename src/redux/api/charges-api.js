import defaultAxios from 'axios'

const axios = defaultAxios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {'Content-Type': 'application/json'}
});

// Get All Todos
export const getAllPosts = async () => {
    try {
        const todos = await axios.get('posts')

        return todos.data
    } catch(err) {
        return console.error(err)
    }
}
export const getAllComments = async (id) => {
    try {
        const comments = await axios.get( `comments?postId=${id}`)

        return comments.data
    } catch(err) {
        return console.error(err)
    }
}
// Create New Todo
export const createNewComment = async (title) => {
    try {
        const todo = await axios.post('todos', {
            title
        })

        return todo.data.title
    } catch(err) {
        return console.error(err)
    }
}

