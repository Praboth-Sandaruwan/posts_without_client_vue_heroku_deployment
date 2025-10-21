import axios from 'axios'

const url = '/api/posts/'

class PostService {
  //Get all posts
  static async getPosts() {
    try {
      const res = await axios.get(url)
      const data = res.data
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }))
    } catch (e) {
      // statements
      console.dir(e)
      throw e
    }
  }

  //Create a post
  static async createPost(text) {
    try {
      const res = await axios.post(url, { text })
      console.log({ ...res, FeMessage: 'Post created Successfully !!!' })
      return res.data
    } catch (e) {
      // statements
      console.dir(e)
      throw e
    }
  }

  //Delete a Post by ID
  static async deleteById(id) {
    try {
      //console.log(`${url}${id}`)
      const res = await axios.delete(`${url}${id}`)
      console.log({ ...res, FeMessage: 'Post with ID : ' + id + ' deleted Successfully !!!' })
      return res.data
    } catch (e) {
      // statements
      console.dir(e)
      throw e
    }
  }
}

export default PostService
