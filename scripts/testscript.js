
// Import necessary modules
const { By, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test() {
    // Set Chrome options
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu');
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    // Create a Driver
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        // Send driver to website
        await driver.get("http://54.242.202.176/");

        // Set window size
        await driver.manage().window().setRect({ width: 652, height: 672 });

        // Click the "Play" button to start the game
        await driver.findElement(By.id("okBtn")).click();

        // Click on cell 1
        await driver.findElement(By.id("cell1")).click();

        // Check if "X" is shown in cell 1
        let cell1Content = await driver.findElement(By.id("cell1")).getText();
        if (cell1Content.trim() === 'X') {
            console.log('Test Success: X is shown in cell 1');
        } else {
            console.log('Test Failed: X is not shown in cell 1');
        }
    } catch (error) {
        console.log('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

test();
