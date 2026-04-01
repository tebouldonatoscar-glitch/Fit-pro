let timerId = null;

self.onmessage = e => {
  if (e.data.type === 'start') {
    if (timerId) clearInterval(timerId);
    const endTime = e.data.endTime;
    timerId = setInterval(() => {
      const rem = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      self.postMessage({ type: 'tick', rem });
      if (rem <= 0) {
        clearInterval(timerId);
        timerId = null;
        self.postMessage({ type: 'done' });
      }
    }, 500);
  } else if (e.data.type === 'stop') {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
};
