import axios from "axios";

export const $axios = axios.create({
  baseURL: "https://polite-positive-pika.ngrok-free.app/v1",
});
