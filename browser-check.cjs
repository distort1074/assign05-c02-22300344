// 검사 전: npm install --no-save --package-lock=false playwright
// 로컬 검사: node browser-check.cjs
// 배포 검사: node browser-check.cjs https://example.vercel.app/
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function main() {
    const baseUrl = process.argv[2];
    const browser = await chromium.launch({ channel: 'chrome' });
    try {
        fs.mkdirSync('test-results', { recursive: true });
        for (const width of [1366, 390]) {
            const page = await browser.newPage({ viewport: { width, height: 900 } });
            page.setDefaultTimeout(10000);
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            const url = baseUrl ? new URL('index.html', baseUrl).href : pathToFileURL(path.resolve('index.html')).href;
            const response = await page.goto(url);
            if (baseUrl) assert.ok(response.ok());
            await page.locator('a[href="js_dynamic.html"]').click();
            await page.waitForLoadState('load');
            const input = page.locator('#item-input');
            const items = page.locator('#item-list li');
            await input.fill('   ');
            await page.locator('button[type="submit"]').click();
            assert.equal(await items.count(), 0);
            await input.fill(' apple ');
            await input.press('Enter');
            assert.equal(await items.first().locator('span').textContent(), 'apple');
            assert.equal(await input.inputValue(), '');
            await items.first().locator('button').click();
            assert.equal(await items.count(), 0);
            await page.locator('a[href="index.html"]').click();
            await page.locator('a[href="crud.html"]').click();
            await page.waitForLoadState('load');

            const rows = page.locator('#task-list tr');
            const save = page.locator('#save-button');
            assert.equal(await rows.count(), 3);
            assert.equal(await page.evaluate(() => tasks.length), 3);

            async function fill(values = {}) {
                const data = { title: '배열 복습', subject: 'JavaScript', date: '2026-10-04', priority: '보통', status: '시작 전', ...values };
                await page.locator('#task-title').fill(data.title);
                await page.locator('#task-subject').fill(data.subject);
                await page.locator('#task-date').fill(data.date);
                await page.locator('#task-priority').selectOption(data.priority);
                await page.locator('#task-status').selectOption(data.status);
            }
            const invalidCases = [{ title: '   ' }, { subject: '  ' }, { date: '' }, { priority: '' }, { status: '' }];
            for (const invalid of invalidCases) {
                await fill(invalid);
                await save.click();
                assert.equal(await page.evaluate(() => tasks.length), 3);
                assert.equal(await page.locator('[aria-invalid="true"]').count(), 1);
            }
            for (const [selector, value] of [['#task-title', 'a'.repeat(61)], ['#task-subject', 'b'.repeat(31)], ['#task-date', '10000-01-01'], ['#task-date', '2026-02-30']]) {
                await fill();
                await page.locator(selector).evaluate((element, text) => { element.value = text; }, value);
                await save.click();
                assert.equal(await page.evaluate(() => tasks.length), 3);
                assert.ok(await page.locator('#form-error').textContent());
            }
            await fill({ title: '<img src=x onerror=alert(1)>' });
            await save.click();
            assert.equal(await rows.count(), 4);
            assert.equal(await page.locator('#task-list img').count(), 0);
            assert.equal(await page.locator('#task-title').inputValue(), '');
            assert.equal(await page.locator('#task-status').inputValue(), '');
            await rows.last().locator('.edit-button').click();
            assert.equal(await page.locator('#task-title').inputValue(), '<img src=x onerror=alert(1)>');
            for (const invalid of invalidCases) {
                await fill(invalid);
                await save.click();
                assert.equal(await page.evaluate(() => tasks.find(task => task.id === 4).title), '<img src=x onerror=alert(1)>');
            }
            await fill({ title: '수정한 할 일', status: '완료' });
            await save.click();
            assert.equal(await rows.count(), 4);
            assert.equal(await page.evaluate(() => tasks.find(task => task.id === 4).status), '완료');
            assert.equal(await page.evaluate(() => nextId), 5);
            await rows.last().locator('.edit-button').click();
            await page.locator('#task-title').fill('취소할 변경');
            await page.locator('#cancel-button').click();
            assert.equal(await page.evaluate(() => tasks.find(task => task.id === 4).title), '수정한 할 일');

            page.once('dialog', dialog => dialog.dismiss());
            await rows.last().locator('.delete-button').click();
            assert.equal(await rows.count(), 4);
            await rows.last().locator('.edit-button').click();
            page.once('dialog', dialog => dialog.accept());
            await rows.last().locator('.delete-button').click();
            assert.equal(await rows.count(), 3);
            assert.equal(await page.evaluate(() => editingId), null);
            assert.equal(await page.locator('#cancel-button').isVisible(), false);
            for (let i = 0; i < 3; i++) {
                page.once('dialog', dialog => dialog.accept());
                await rows.first().locator('.delete-button').click();
            }
            assert.equal(await page.evaluate(() => tasks.length), 0);
            assert.equal(await page.locator('#task-list .empty').count(), 1);
            await fill();
            await save.click();
            assert.equal(await page.evaluate(() => tasks[0].id), 5);
            await page.reload();
            assert.equal(await rows.count(), 3);
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
            if (width === 390) {
                await page.locator('.table-wrap').focus();
                await page.keyboard.press('ArrowRight');
                await page.waitForFunction(() => document.querySelector('.table-wrap').scrollLeft > 0);
            }
            await page.screenshot({ path: `test-results/study-${baseUrl ? 'deployed' : 'local'}-${width}.png`, fullPage: true });
            assert.deepEqual(errors, []);
            await page.close();
            console.log(`PASS ${baseUrl ? 'deployed' : 'local'} ${width}px: DOM, CRUD, validation, dialogs, IDs, navigation, refresh, layout.`);
        }
    } finally {
        await browser.close();
    }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
