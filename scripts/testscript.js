const { By, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test1() {
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

        // Wait for the "Play" button to be interactable and click it
        let playButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id("okBtn"))), 10000);
        await playButton.click();

        // Wait for cell 1 (cell 0 in array index) to be interactable and click it
        let cell1 = await driver.wait(until.elementIsVisible(driver.findElement(By.id("cell0"))), 10000);
        await cell1.click();

        // Check if "X" is shown in cell 1
        let cell1Content = await driver.findElement(By.id("cell0")).getText();
        console.log(cell1Content);
        
        // Normalize comparison to lowercase for case insensitivity
        if (cell1Content.trim === '<span class=\"x\">&times;</class>') {
            console.log('Test Success: X is shown in cell 0');
        } else {
            console.log('Test Failed: X is not shown in cell 0');
        }
    } catch (error) {
        console.log('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

test1();
