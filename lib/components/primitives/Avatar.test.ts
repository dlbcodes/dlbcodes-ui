import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Avatar from "./Avatar.vue";

const avatar = (props: Record<string, unknown> = {}) =>
	mount(Avatar, { props });

describe("Avatar", () => {
	describe("with an image", () => {
		it("renders the src", () => {
			const img = avatar({ src: "/me.jpg", name: "Ana Silva" }).find("img");
			expect(img.attributes("src")).toBe("/me.jpg");
		});

		// Named → the name is the alt. Unnamed (or blank) → empty alt, so a
		// screen reader skips the image instead of announcing nonsense.
		it.each([
			["Ana Silva", "Ana Silva"],
			[undefined, ""],
			["   ", ""],
		])("name %j gives alt %j", (name, alt) => {
			const img = avatar({ src: "/me.jpg", name }).find("img");
			expect(img.attributes("alt")).toBe(alt);
		});
	});

	describe("initial fallback", () => {
		it.each([
			["bruno costa", "B"], // first letter, uppercased
			["  ana", "A"], // leading whitespace ignored
			["😀 Smile", "😀"], // whole code point, not half a surrogate pair
			["   ", "?"], // blank name
			[undefined, "?"], // no name at all
		])("name %j shows %j", (name, initial) => {
			const wrapper = avatar({ name });
			expect(wrapper.find("img").exists()).toBe(false);
			expect(wrapper.text()).toBe(initial);
		});

		it("is labelled with the name for assistive technology", () => {
			const fallback = avatar({ name: "Ana Silva" }).find('[role="img"]');
			expect(fallback.attributes("aria-label")).toBe("Ana Silva");
		});

		it("is hidden from assistive technology when there is no name", () => {
			const wrapper = avatar();
			expect(wrapper.find('[role="img"]').exists()).toBe(false);
			expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true);
		});
	});

	describe("image load failure", () => {
		it("falls back to the initial when the image fails to load", async () => {
			const wrapper = avatar({ src: "/broken.jpg", name: "Ana" });
			await wrapper.find("img").trigger("error");

			expect(wrapper.find("img").exists()).toBe(false);
			expect(wrapper.text()).toBe("A");
		});

		it("tries again when src changes after a failure", async () => {
			const wrapper = avatar({ src: "/broken.jpg", name: "Ana" });
			await wrapper.find("img").trigger("error");

			await wrapper.setProps({ src: "/fixed.jpg" });
			expect(wrapper.find("img").attributes("src")).toBe("/fixed.jpg");
		});
	});

	it("merges a custom class onto the root", () => {
		expect(avatar({ class: "ring-2" }).classes()).toContain("ring-2");
	});
});