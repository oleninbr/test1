// Простий генератор унікальних id на основі timestamp+рандому
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
