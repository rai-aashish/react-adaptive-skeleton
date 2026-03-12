import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
	url: "http://localhost",
	pretendToBeVisual: true,
});

const { window } = dom;

Object.defineProperty(globalThis, "window", { value: window, writable: true });
Object.defineProperty(globalThis, "document", {
	value: window.document,
	writable: true,
});
Object.defineProperty(globalThis, "navigator", {
	value: window.navigator,
	writable: true,
});
Object.defineProperty(globalThis, "HTMLElement", {
	value: window.HTMLElement,
	writable: true,
});
Object.defineProperty(globalThis, "SVGElement", {
	value: window.SVGElement,
	writable: true,
});
Object.defineProperty(globalThis, "Element", {
	value: window.Element,
	writable: true,
});
Object.defineProperty(globalThis, "Node", {
	value: window.Node,
	writable: true,
});
Object.defineProperty(globalThis, "getComputedStyle", {
	value: window.getComputedStyle.bind(window),
	writable: true,
});
Object.defineProperty(globalThis, "requestAnimationFrame", {
	value: (cb: FrameRequestCallback) => setTimeout(cb, 0),
	writable: true,
});
Object.defineProperty(globalThis, "cancelAnimationFrame", {
	value: clearTimeout,
	writable: true,
});
Object.defineProperty(globalThis, "MutationObserver", {
	value: window.MutationObserver,
	writable: true,
});
Object.defineProperty(globalThis, "ResizeObserver", {
	value:
		window.ResizeObserver ??
		class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		},
	writable: true,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
	value:
		window.IntersectionObserver ??
		class IntersectionObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		},
	writable: true,
});

afterEach(() => {
	cleanup();
});
