import { test, expect } from "@playwright/test";

test("send prompt, see agent chip, open reasoning", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Message composer").fill("Find literature on metformin A1C");
  await page.getByRole("button", { name: /^send$/i }).click();

  // wait for assistant chip (Sight or Endocrinology depending on scoring)
  await expect(page.getByLabel(/Selected agents/i)).toBeVisible();

  await page.getByRole("button", { name: /why this route/i }).click();
  await expect(page.getByText(/Selected agents/i)).toBeVisible();
});


