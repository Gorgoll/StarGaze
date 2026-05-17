const API_URL = import.meta.env.VITE_CLOUDFLARE_API;

export interface User {
	id: number;
	email: string;
	username: string;
}

export interface Question {
	id: number;
	title: string;
	description: string;
	created_at: string;
	username: string;
}

export interface Comment {
	id: number;
	question_id: number;
	username: string;
	content: string;
	created_at: string;
}

async function req<T>(path: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error ?? "Request failed");
	return data as T;
}

export const getQuestions = () =>
	 req<Question[]>("/questions");

export const getComments = (question_id: number) =>
	 req<Comment[]>(`/comments?question_id=${question_id}`);

export const postQuestion = (user_id: number, title: string, description: string) =>
	 req<{ success: boolean; id: number }>("/questions", {
		 method: "POST",
		 body: JSON.stringify({ user_id, title, description }),
	 });

export const postComment = (question_id: number, username: string, content: string) =>
	 req<{ success: boolean; id: number }>("/comments", {
		 method: "POST",
		 body: JSON.stringify({ question_id, username, content }),
	 });

export const login = (email: string, password: string) =>
	 req<{ success: boolean; user: User }>("/login", {
		 method: "POST",
		 body: JSON.stringify({ email, password }),
	 });

export const register = (email: string, username: string, password: string) =>
	 req<{ success: boolean; user_id: number }>("/register", {
		 method: "POST",
		 body: JSON.stringify({ email, username, password }),
	 });