export function toPairs(arr, size = 2) {
  return arr
    .map((x, i) => i % size === 0 && arr.slice(i, i + size))
    .filter((x) => x);
}

export function scrollToTop() {
  window &&
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
}

export function formatPrice(amount, currency) {
  try {
    return new Intl.NumberFormat(`en-${currency.substr(0, 2)}`, {
      currency: currency,
    }).format(amount);
  } catch (e) {
    return new Intl.NumberFormat().format(amount);
  }
}
