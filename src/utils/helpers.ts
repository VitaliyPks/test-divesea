import { NFT_IMAGES } from "utils/constants";

export const generateEndTime = (): number => {
  const now = Date.now();
  const minHours = 2 * 60 * 60 * 1000;
  const maxHours = 9 * 60 * 60 * 1000;
  const randomOffset = Math.floor(
    Math.random() * (maxHours - minHours) + minHours,
  );

  return now + randomOffset;
};

export const formatTimeRemaining = (endTime: number): string => {
  const now = Date.now();
  const diff = endTime - now;

  if (diff <= 0) {
    return "00h 00m 00s";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
};

export const generateRandomBid = (): string => {
  const min = 0.5;
  const max = 10.0;
  const random = (Math.random() * (max - min) + min).toFixed(2);
  return random;
};

export const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * NFT_IMAGES.length);
  return NFT_IMAGES[randomIndex];
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
