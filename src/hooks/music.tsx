import { useEffect, useRef } from 'react';
import mainbgmusic from '../assets/mainbgmusic.mp3';
import greeterbgmusic from '../assets/greeterbgmusic.mp3';
import buttonclick from '../assets/buttonclick.mp3';

function useBackgroundMusic(asset: string, active: boolean) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	
	useEffect(() => {
		if (!active) {
			audioRef.current?.pause();
			audioRef.current = null;
			return;
		}
		
		const audio = new Audio(asset);
		audio.volume = 0.5;
		audio.loop = true;
		audioRef.current = audio;
		
		audio.play().catch(() => {
			const play = () => audio.play();
			document.addEventListener('click', play, { once: true });
		});
		
		return () => {
			audio.pause();
			audio.currentTime = 0;
			audioRef.current = null;
		};
	}, [active]);
}

export function useMainBackgroundMusic(active: boolean) {
	useBackgroundMusic(mainbgmusic, active);
}

export function useGreeterBackgroundMusic(active: boolean) {
	useBackgroundMusic(greeterbgmusic, active);
}

const buttonClickAudio = new Audio(buttonclick)
function useButtonSound() {
	const play = () => {
		buttonClickAudio.currentTime = 0;
		buttonClickAudio.play();
	}
	return play;
}

export function useGlobalInputSound() {
	const playClick = useButtonSound();
	
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if ((e.target as HTMLElement).closest('button')) {
				playClick();
			}
		};
		
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	}, []);
}