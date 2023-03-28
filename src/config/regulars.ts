/**
 * Содержит все регулярные выражения
 */

export const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
export const usernameReg = /^.+$/;
export const nicknameReg = /^.+$/;
