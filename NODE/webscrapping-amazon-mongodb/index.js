// --------- Imports
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import fs from "fs";

// --------- Creation of mongoose model
const Data = mongoose.model("Data", new mongoose.Schema({
    title: String,
    price: String,
}));

// --------- Connection to the db
const connect = async () => {
    try {
        const URI = "mongodb+srv://emetepetys:Marcel.Proust8@cluster0.rzzdcom.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to DB 🚀')
    } catch (error) {
        console.error('Not connected to DB ❌')
    }
}

// --------- Scrapping code Amazon
const scrapeProducts = async () => {
    await connect()

    const url = 'https://www.amazon.es/'

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    })

    const page = await browser.newPage()

    await page.goto(url)

    await page.type('#twotabsearchtextbox', 'star wars')

    await page.click('#nav-search-submit-button')

    await page.waitForSelector('.s-pagination-next')

    const title = await page.$$eval('h2 span.a-color-base', (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const price = await page.$$eval('span.a-price[data-a-color="base"] span.a-offscreen', (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const amazonProduct = title.map((value, index) => {
        return {
            title: title[index],
            price: price[index]
        }
    })

    amazonProduct.map(async (data) => {
        const dataSchema = new Data(data)
        try {
            await dataSchema.save()
            console.log(`Succesfully saved ${dataSchema.title} to the database 🤘🏽`)
        } catch (error) {
            console.error(`Failed to save ${dataSchema.title} to the database ❌`)
        }
    })

// --------- Close browser

    await browser.close()
    console.log('Yeah! We got it 🤘🏽🧙🏽‍♂️')
}

scrapeProducts();