import { useSyncExternalStore } from "react";

let modPressed = false;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

function setModPressed(value) {
  if (modPressed === value) return;
  modPressed = value;
  notify();
}

function isEditableTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || Boolean(target.closest("input, textarea, select")))
  );
}

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (isEditableTarget(event.target)) return;
    if (event.key === "z") setModPressed(true);
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === "z") setModPressed(false);
  });
  window.addEventListener("blur", () => setModPressed(false));
}

export function isModPressed() {
  return modPressed;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return modPressed;
}

export function useModPressed() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
