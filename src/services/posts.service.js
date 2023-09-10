import { addPostDB } from "../repositories/posts.repository.js";

export async function addPost(userId, photoBuffer, description) {
    await addPostDB(userId, photoBuffer, description);
}