import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import QuestionCard from "./questionCard.tsx";
import MobileCheck from "../../helpers/mobileCheck.tsx";
import { interpolatedUITheme } from "../../theme/theme.tsx";
import { Plus } from "lucide-react";
import useDecimalHour from "../../hooks/dateHandler.tsx";
import { getQuestions, getComments, postQuestion, postComment } from "../../api.tsx";
import type { User, Question, Comment } from "../../api.tsx";
import useStore from "../../store.ts";

interface Props {
	currentUser: User | null;
}

// TODO make it into separate components
// I hate this file
export default function QuestionFeed({ currentUser }: Props) {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [comments, setComments] = useState<Record<number, Comment[]>>({});
	const [formOpen, setFormOpen] = useState(false);
	const [activeId, setActiveId] = useState<number | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [panelInput, setPanelInput] = useState("");
	const isMobile = MobileCheck();
	const decimalHour = useDecimalHour();
	const theme = interpolatedUITheme(decimalHour);
	const search = useStore(s => s.navbarCurrentSearch);
	
	const filteredQuestions = search.trim()
		 ? questions.filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
		 : questions;
	
	const activeQuestion = questions.find(q => q.id === activeId) ?? null;
	const activeComments = activeId != null ? (comments[activeId] ?? []) : [];
	
	// Load questions on mount
	useEffect(() => {
		getQuestions().then(setQuestions).catch(console.error);
	}, []);
	
	// Load comments when a question is opened
	useEffect(() => {
		if (activeId == null || comments[activeId]) return;
		getComments(activeId)
			 .then(data => setComments(prev => ({ ...prev, [activeId]: data })))
			 .catch(console.error);
	}, [activeId]);
	
	async function submit() {
		const t = title.trim();
		const d = description.trim();
		if (!t || !currentUser) return;
		try {
			const { id } = await postQuestion(currentUser.id, t, d);
			const newQ: Question = {
				id,
				title: t,
				description: d,
				created_at: new Date().toISOString(),
				username: currentUser.username,
			};
			setQuestions(prev => [newQ, ...prev]);
			setComments(prev => ({ ...prev, [id]: [] }));
			setTitle("");
			setDescription("");
			setFormOpen(false);
		} catch (e) {
			console.error("Failed to post question:", e);
		}
	}
	
	async function addComment() {
		const val = panelInput.trim();
		if (!val || activeId == null || !currentUser) return;
		try {
			await postComment(activeId, currentUser.username, val);
			const newComment: Comment = {
				id: Date.now(),
				question_id: activeId,
				username: currentUser.username,
				content: val,
				created_at: new Date().toISOString(),
			};
			setComments(prev => ({
				...prev,
				[activeId]: [...(prev[activeId] ?? []), newComment],
			}));
			setPanelInput("");
		} catch (e) {
			console.error("Failed to post comment:", e);
		}
	}
	
	return (
		 <div style={{ position: "relative", paddingTop: "5vh", height: "95vh", overflowY: "auto" }}>
			 <style>{`
				.qf-input::placeholder { color: ${theme.textColor}; opacity: 0.45; }
			`}</style>
			 
			 {/* Feed */}
			 <div
				  style={{
					  display: "grid",
					  gridTemplateColumns: "1fr",
					  gap: 12,
					  padding: "1.5rem",
					  width: "100%",
					  maxWidth: "850px",
					  margin: "0 auto",
					  boxSizing: "border-box",
				  }}
			 >
				 <AnimatePresence>
					 {filteredQuestions.map(q => (
							<motion.div
								 key={q.id}
								 initial={{ opacity: 0, y: 16 }}
								 animate={{ opacity: 1, y: 0 }}
								 exit={{ opacity: 0, y: -8 }}
								 transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
							>
								<QuestionCard
									 title={q.title}
									 description={q.description}
									 createdAt={new Date(q.created_at)}
									 commentCount={comments[q.id]?.length ?? 0}
									 active={activeId === q.id}
									 onOpen={() => setActiveId(prev => prev === q.id ? null : q.id)}
								/>
							</motion.div>
					 ))}
				 </AnimatePresence>
				 
				 {filteredQuestions.length === 0 && (
					  <div style={{ fontSize: 13, color: theme.textColor, opacity: 0.4, textAlign: "center", paddingTop: "3rem" }}>
						  {search.trim() ? "No questions match your search." : "No questions yet."}
					  </div>
				 )}
			 </div>
			 
			 {/* Comment panel */}
			 <AnimatePresence>
				 {activeQuestion && (
						<>
							<motion.div
								 key="panel-backdrop"
								 initial={{ opacity: 0 }}
								 animate={{ opacity: 1 }}
								 exit={{ opacity: 0 }}
								 onClick={() => setActiveId(null)}
								 style={{ position: "fixed", inset: 0, background: `${theme.backgroundColor}30`, zIndex: 20 }}
							/>
							<motion.div
								 key="panel"
								 initial={{ opacity: 0, y: 24 }}
								 animate={{ opacity: 1, y: 0 }}
								 exit={{ opacity: 0, y: 24 }}
								 transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
								 style={{
									 position: "fixed",
									 top: "50%",
									 left: "50%",
									 translateX: "-50%",
									 translateY: "-50%",
									 width: "min(90%, 600px)",
									 maxHeight: "70vh",
									 backgroundColor: theme.backgroundColor,
									 border: `0.5px solid ${theme.borderColor}`,
									 borderRadius: 14,
									 padding: "1.25rem",
									 backdropFilter: "blur(14px)",
									 zIndex: 21,
									 display: "flex",
									 flexDirection: "column",
									 overflow: "hidden",
									 gap: 10,
								 }}
							>
								<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
									<div style={{ fontSize: 13, fontWeight: 500, color: theme.textColor, lineHeight: 1.4, flex: 1 }}>
										{activeQuestion.title}
									</div>
									<button
										 onClick={() => setActiveId(null)}
										 style={{
											 background: "none", border: "none", cursor: "pointer",
											 color: theme.textColor, opacity: 0.45, fontSize: 18, lineHeight: 1,
											 padding: 0, flexShrink: 0,
										 }}
										 aria-label="Close"
									>×</button>
								</div>
								
								<div style={{ height: "0.5px", background: theme.borderColor }} />
								
								<div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
									{activeComments.length === 0 && (
										 <div style={{ fontSize: 12, color: theme.textColor, opacity: 0.45, padding: "0.5rem 0" }}>
											 No answers yet.
										 </div>
									)}
									<AnimatePresence initial={false}>
										{activeComments.map((c, i) => (
											 <motion.div
													key={c.id ?? i}
													initial={{ opacity: 0, y: 8 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.2 }}
													style={{
														overflow: "hidden",
														background: theme.backgroundColor,
														border: `0.5px solid ${theme.borderColor}`,
														borderRadius: 10,
														padding: "0.7rem 0.9rem",
														flexShrink: 0,
														overflowWrap: "break-word",
													}}
											 >
												 <div style={{ fontSize: 12, fontWeight: 500, color: theme.sunColor, marginBottom: 3 }}>{c.username}</div>
												 <div style={{ fontSize: 13, lineHeight: 1.55, color: theme.textColor }}>{c.content}</div>
											 </motion.div>
										))}
									</AnimatePresence>
								</div>
								
								{/* Reply input */}
								{currentUser ? (
									 <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
										 <input
												className="qf-input"
												value={panelInput}
												onChange={e => setPanelInput(e.target.value)}
												onKeyDown={e => e.key === "Enter" && addComment()}
												placeholder="Add an answer..."
												style={{
													flex: 1, fontSize: 13, padding: "8px 12px", borderRadius: 8,
													border: `0.5px solid ${theme.borderColor}`,
													background: theme.backgroundColor,
													outline: "none", color: theme.textColor, fontFamily: "inherit",
												}}
										 />
										 <button
												onClick={addComment}
												style={{
													padding: "8px 14px", fontSize: 13, borderRadius: 8,
													border: `0.5px solid ${theme.borderColor}`,
													background: theme.backgroundColor, color: theme.textColor,
													cursor: "pointer", fontFamily: "inherit",
												}}
										 >Reply</button>
									 </div>
								) : (
									 <div style={{ fontSize: 12, color: theme.textColor, opacity: 0.4, textAlign: "center" }}>
										 Log in to reply.
									 </div>
								)}
							</motion.div>
						</>
				 )}
			 </AnimatePresence>
			 
			 {/* Add question form */}
			 <AnimatePresence>
				 {formOpen && currentUser && (
						<>
							<motion.div
								 key="backdrop"
								 initial={{ opacity: 0 }}
								 animate={{ opacity: 1 }}
								 exit={{ opacity: 0 }}
								 onClick={() => setFormOpen(false)}
								 style={{ position: "fixed", inset: 0, background: `${theme.backgroundColor}99`, zIndex: 10 }}
							/>
							<motion.div
								 key="form"
								 initial={{ opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 24 : 0 }}
								 animate={{ opacity: 1, x: 0, y: 0 }}
								 exit={{ opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 24 : 0 }}
								 transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
								 style={{
									 position: "fixed",
									 ...(isMobile ? {
										 left: 0, right: 0, bottom: 0,
										 width: "100%",
										 borderRadius: "14px 14px 0 0",
									 } : {
										 right: "1.5rem", top: "50%",
										 transform: "translateY(-50%)",
										 width: 300,
										 borderRadius: 14,
									 }),
									 background: theme.backgroundColor,
									 border: `0.5px solid ${theme.borderColor}`,
									 padding: "1.25rem",
									 backdropFilter: "blur(12px)",
									 zIndex: 11,
									 display: "flex",
									 flexDirection: "column",
									 gap: 10,
								 }}
							>
								<div style={{ fontSize: 13, fontWeight: 500, color: theme.textColor, marginBottom: 2 }}>New question</div>
								
								<input
									 className="qf-input"
									 autoFocus
									 value={title}
									 onChange={e => setTitle(e.target.value)}
									 onKeyDown={e => e.key === "Enter" && submit()}
									 placeholder="Title"
									 style={{
										 fontSize: 13, padding: "8px 12px", borderRadius: 8,
										 border: `0.5px solid ${theme.borderColor}`,
										 background: theme.backgroundColor,
										 outline: "none", color: theme.textColor, fontFamily: "inherit",
									 }}
								/>
								
								<textarea
									 className="qf-input"
									 value={description}
									 onChange={e => setDescription(e.target.value)}
									 placeholder="Description"
									 rows={3}
									 style={{
										 fontSize: 13, padding: "8px 12px", borderRadius: 8,
										 border: `0.5px solid ${theme.borderColor}`,
										 background: theme.backgroundColor,
										 outline: "none", color: theme.textColor, fontFamily: "inherit",
										 resize: "vertical",
									 }}
								/>
								
								<div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
									<button
										 onClick={() => setFormOpen(false)}
										 style={{
											 padding: "7px 14px", fontSize: 13, borderRadius: 8,
											 border: `0.5px solid ${theme.borderColor}`,
											 background: "transparent", color: theme.textColor,
											 cursor: "pointer",
										 }}
									>Cancel</button>
									<button
										 onClick={submit}
										 style={{
											 padding: "7px 14px", fontSize: 13, borderRadius: 8,
											 border: `0.5px solid ${theme.borderColor}`,
											 background: theme.backgroundColor, color: theme.textColor,
											 cursor: "pointer",
										 }}
									>Add</button>
								</div>
							</motion.div>
						</>
				 )}
			 </AnimatePresence>
			 
			 {currentUser && (
					<motion.button
						 onClick={() => setFormOpen(o => !o)}
						 animate={{ rotate: formOpen ? 45 : 0 }}
						 transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
						 style={{
							 position: "fixed", right: "1.5rem", bottom: "1.5rem",
							 width: 50, height: 50, borderRadius: "50%",
							 border: "none",
							 background: theme.backgroundColor,
							 color: theme.textColor, fontSize: 24, lineHeight: 1,
							 cursor: "pointer",
							 display: "flex", alignItems: "center", justifyContent: "center",
							 zIndex: 12,
						 }}
					><Plus /></motion.button>
			 )}
		 </div>
	);
}