import { describe, it, expect, vi } from "vitest";
import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { Popover, PopoverTrigger, PopoverContent } from "./index";

describe("Popover", () => {
	it("renders the trigger and exposes `open` (closed initially)", () => {
		const wrapper = mount({
			components: { Popover, PopoverTrigger },
			template: `
                <Popover>
                    <PopoverTrigger v-slot="{ open }">
                        <span>{{ open ? 'OPEN' : 'CLOSED' }}</span>
                    </PopoverTrigger>
                </Popover>
            `,
		});
		expect(wrapper.text()).toContain("CLOSED");
	});

	it("renders content when opened", async () => {
		const wrapper = mount({
			components: { Popover, PopoverTrigger, PopoverContent },
			template: `
                <Popover>
                    <PopoverTrigger><span>Open</span></PopoverTrigger>
                    <PopoverContent>
                        <p>Panel body</p>
                    </PopoverContent>
                </Popover>
            `,
		});
		await wrapper.find("button").trigger("click");
		expect(wrapper.text()).toContain("Panel body");
	});

	it("applies the size class to the panel", async () => {
		const wrapper = mount({
			components: { Popover, PopoverTrigger, PopoverContent },
			template: `
                <Popover>
                    <PopoverTrigger><span>Open</span></PopoverTrigger>
                    <PopoverContent size="md">
                        <p>Body</p>
                    </PopoverContent>
                </Popover>
            `,
		});
		await wrapper.find("button").trigger("click");
		const panel = wrapper.find("[id^='headlessui-popover-panel']");
		expect(panel.exists()).toBe(true);
		expect(panel.classes()).toContain("w-md");
	});

	it("exposes a callable `close` on the content slot", async () => {
		const onClose = vi.fn();
		const Harness = defineComponent({
			components: { Popover, PopoverTrigger, PopoverContent },
			setup() {
				return { onClose };
			},
			template: `
                <Popover>
                    <PopoverTrigger><span>Open</span></PopoverTrigger>
                    <PopoverContent v-slot="{ close }">
                        <button class="dismiss" @click="() => { onClose(); close(); }">
                            Dismiss
                        </button>
                    </PopoverContent>
                </Popover>
            `,
		});
		const wrapper = mount(Harness);
		await wrapper.find("button").trigger("click"); // open (the trigger is first button)

		const dismiss = wrapper.find("button.dismiss");
		expect(dismiss.exists()).toBe(true);
		await dismiss.trigger("click");
		// We assert the slot's close was wired and our handler ran.
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});