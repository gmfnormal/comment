import { nanoid, customAlphabet } from 'nanoid';


export const baseNanoid = nanoid

export const noSpecialCharater = (number = 10) => customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', number)