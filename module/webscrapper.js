const puppeteer = require('puppeteer');
const fs = require('fs');

async function scraphomes(state, zipcode) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = "https://www.rockethomes.com/";
    const homeListing = [];
    let hasNext = true;
    let counter = 1;
    try {
        await page.goto(`${url}${state}/${zipcode}`, { timeout: 60000 });
        await page.waitForSelector('.relative.w-full', { timeout: 60000 });

        while (hasNext && counter < 5) {
            const data = await page.evaluate(() => {
                const homes = document.querySelectorAll('.relative.w-full');
                return Array.from(homes).map(home => ({
                    address: home.querySelector('.truncate.pb-4.sprk-b-TypeBodyFour')?.textContent.trim() || '',
                    price: home.querySelector('.sprk-b-TypeBodyOne')?.textContent.trim() || '',
                    days: home.querySelector('p.sprk-b-TypeBodyFour')?.textContent.trim() || ''
                }));
            });
            homeListing.push(...data);
            hasNext = await page.evaluate(() => {
                const nextPage = document.querySelector('.next');
                if (nextPage) {
                    nextPage.click();
                    return true;
                }
                return false;
            });
            counter++;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        return homeListing;
    } catch (e) {
        console.error(e);
        return [];
    } finally {
        await browser.close();
        // writing to file
        fs.writeFile("data.json", JSON.stringify(homeListing), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The data has been scraped and saved successfully! to data.json");
        });
    }
}

module.exports.scraphomes = scraphomes;