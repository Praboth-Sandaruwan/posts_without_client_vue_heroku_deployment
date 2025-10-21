<script>
import PostService from '../services/PostService.js'

export default {
  data() {
    return {
      posts: [],
      err: '',
      text: '',
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts()
    } catch (err) {
      this.err = err.message
      console.log(err)
    }
  },
  methods: {
    async createPost() {
      try {
        await PostService.createPost(this.text)
        this.posts = await PostService.getPosts()
      } catch (err) {
        this.err = err.message
        console.log(err)
      } finally {
        this.text = ''
      }
    },
    async deletePost(id) {
      if (!confirm('Are you sure you want to delete this post?')) return
      try {
        await PostService.deleteById(id)
        this.posts = await PostService.getPosts()
      } catch (err) {
        this.err = err.message
        console.log(err)
      }
    },
  },
}
</script>

<template>
  <div class="container container-fluid">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post" class="create-post-label"> Create a Post </label>
      <input
        type="text"
        class="create-post-input"
        id="create-post-field"
        v-model="text"
        placeholder="Type the text here ..."
      />
      <button class="create-post-btn" id="create-post-btn" @click="createPost">Post!</button>
    </div>
    <hr />
    <p class="error" v-if="err">{{ err }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        @dblclick="deletePost(post._id)"
      >
        <p class="post-date">
          {{
            `${post.createdAt.getDate()} / ${post.createdAt.getMonth()} / ${post.createdAt.getFullYear()}`
          }}
        </p>
        <h3 class="post-body">{{ post.text }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container spacing */
.container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* Error message */
.error {
  color: #dc3545; /* Bootstrap danger red */
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Posts container layout */
.posts-container {
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  scroll-behavior: smooth;
}

/* Custom scrollbar styling for dark theme */
.posts-container::-webkit-scrollbar {
  width: 8px;
}

.posts-container::-webkit-scrollbar-track {
  background: #2c2c2c;
}

.posts-container::-webkit-scrollbar-thumb {
  background-color: rgb(65.151, 174.32, 48.809);
  border-radius: 4px;
}

/* Individual post card */
.post {
  background-color: #1c1c1c;
  border: 1px solid #444;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.post:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 12px rgb(65.151, 174.32, 48.809); /* Bootstrap warning glow var(--color-text) */
}

/* Post date */
.post-date {
  font-size: 0.85rem;
  color: #adb5bd; /* Bootstrap muted text */
  margin-bottom: 0.5rem;
}

/* Post body */
.post-body {
  font-size: 1.1rem;
  color: #f8f9fa; /* Light text */
  font-weight: 500;
  line-height: 1.4;
}

.create-post {
  margin-bottom: 2rem;
  background-color: #2c2c2c;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.create-post-label {
  display: block;
  font-weight: 600;
  color: #f8f9fa;
  margin-bottom: 0.5rem;
}

.create-post-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #555;
  border-radius: 0.25rem;
  background-color: #1c1c1c;
  color: #f8f9fa;
  margin-bottom: 0.75rem;
}

.create-post-btn {
  background-color: rgb(65.151, 174.32, 48.809);
  color: #1c1c1c;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.create-post-btn:hover {
  background-color: rgb(65.151, 174.32, 48.809);
}
</style>
