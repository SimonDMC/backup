import chalk from "chalk";

// get current time in DD/MM/YY HH:MM AM/PM format
export function getDateString() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

// get current time in DD/MM/YY HH:MM:SS AM/PM format
export function getZipDateString() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year} ${hours}.${minutes}.${seconds} ${ampm}`;
}

// [H:MM:SS]
export function getTimestamp() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return chalk.dim(`[${hours}:${minutes}:${seconds}]`);
}
