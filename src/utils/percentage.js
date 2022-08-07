export default function percentage(num, total) {
  return num / total < 1 ? (num / total).toFixed(2) : 1;
}
