export function throttle(fun, timeout) {
  let canUse = true;

  return function() {
    if (!canUse) {
      return;
    }

    fun();
    canUse = false;
    setTimeout(() => {
      canUse = true;
    }, timeout);
  }
}