import { motion } from "motion/react";
import { getPeriodName, interpolatedUITheme } from "../../theme/theme.tsx";

// this should be moved to dateHandler.tsx
function formatTime(timeStr: string) {
	const [h, m] = timeStr.split(":");
	const hour = parseInt(h, 10);
	// 10:29 PM / 8:23 AM looks better than 17:23 / 10:29
	const ampm = hour >= 12 ? "PM" : "AM";
	const display = hour % 12 || 12;
	return `${display}:${m} ${ampm}`;
}

interface QuestionCardProps {
	title: string;
	description: string;
	createdAt?: Date | string;
	commentCount?: number;
	active?: boolean;
	onOpen?: () => void;
}

interface CardUIProps {
	title: string;
	description: string;
	timeStr: string;
	decimalHour: number;
	commentCount?: number;
	active?: boolean;
	onOpen?: () => void;
}

function CardUI({ title, description, timeStr, decimalHour, commentCount, active, onOpen }: CardUIProps) {
	const period = getPeriodName(Math.floor(decimalHour));
	const theme = interpolatedUITheme(decimalHour);
	
	return (
		 <div style={{
			 background: theme.backgroundColor,
			 border: `0.5px solid ${theme.borderColor}`,
			 borderRadius: 14,
			 padding: "1.25rem 1.4rem",
		 }}>
			 <div
					onClick={onOpen}
					style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", cursor: "pointer", userSelect: "none" }}
			 >
				 <div style={{ flex: 1 }}>
					 <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{
	                        fontSize: 14, letterSpacing: "0.03em", textTransform: "uppercase",
	                        background: `${theme.sunColor}20`, color: theme.sunColor,
	                        padding: "2px 9px", borderRadius: 20,
	                        border: `0.5px solid ${theme.sunColor}44`,
                        }}>
                            {period}
                        </span>
						 <span style={{ fontSize: 12, color: theme.textColor, opacity: 0.6 }}>
                            {formatTime(timeStr)}
                        </span>
					 </div>
					 <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, marginBottom: 4, color: theme.textColor }}>
						 {title}
					 </div>
					 <div style={{ fontSize: 13, color: theme.textColor, opacity: 0.65, lineHeight: 1.6 }}>
						 {description}
					 </div>
				 </div>
				 
				 <motion.div
						animate={{ rotate: active ? 90 : 0 }}
						transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
						style={{
							flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
							border: `0.5px solid ${theme.borderColor}`,
							background: active ? `${theme.sunColor}30` : `${theme.sunColor}20`,
							display: "flex", alignItems: "center", justifyContent: "center",
							color: theme.sunColor, fontSize: 18, marginTop: 2,
						}}
				 >
					 ›
				 </motion.div>
			 </div>
			 
			 {(commentCount ?? 0) > 0 && (
					<div style={{
						marginTop: 10, fontSize: 11,
						color: theme.textColor, opacity: 0.5,
						letterSpacing: "0.06em", textTransform: "uppercase",
					}}>
						{commentCount} {commentCount === 1 ? "answer" : "answers"}
					</div>
			 )}
		 </div>
	);
}

export default function QuestionCardCard({ createdAt, ...rest }: QuestionCardProps & { createdAt: Date | string }) {
	const date = new Date(createdAt);
	const decimalHour = date.getHours() + date.getMinutes() / 60;
	const timeStr = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
	return <CardUI {...rest} timeStr={timeStr} decimalHour={decimalHour} />;
}