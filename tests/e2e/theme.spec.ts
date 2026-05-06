import { expect, test } from "@playwright/test";

test("force light theme via query param", async ({ page }) => {
  await page.goto("/?theme=light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".theme-text-image-light")).toBeVisible();
});

test("force dark theme via query param", async ({ page }) => {
  await page.goto("/?theme=dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".theme-text-image-dark")).toBeVisible();
});
