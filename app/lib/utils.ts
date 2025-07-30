import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const formatForDashboard = (date: DateTime) => {
  const now = DateTime.now().setZone("Asia/Seoul")
  const diff = now.diff(date).shiftTo("days")
  const { days = 0 } = diff.toObject();

  if (days < 1) {
    return "오늘부터 최고의 습관을 만들기 시작하셨습니다.";
  } else {
    return `최고의 습관을 만들기 시작한지 ${Math.ceil(days)}일째 입니다.`;
  }
}

export const formatForHabitDetail = (date: DateTime) => {
  const now = DateTime.now().setZone("Asia/Seoul")
  const diff = now.diff(date).shiftTo("days")
  console.log(diff);
  const { days = 0 } = diff.toObject();

  if (days < 1) {
    return "오늘부터 이 습관 만들기에 도전합니다.";
  } else {
    return `이 습관을 만들기 시작한지 ${Math.ceil(days)}일째 입니다.`;
  }
}