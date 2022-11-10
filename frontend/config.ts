export function apiAddress() {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_ADDRESS;
}
