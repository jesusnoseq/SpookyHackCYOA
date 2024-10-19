# SpookyHackCYOA

A little game for cloudinary halloween hackaton. I hope you enjoy :hugs:

## You can try it for a limited time here

[spooky.jesusnoseq.com](https://spooky.jesusnoseq.com/)


## What's included

* React App with typescript and tailwind
  * It make use of cloudinary AI to change expresions and backgrounds and create a Halloween CYOA game
* Golang script to create the neccesary transformations in cloudinary

## Config

### CLI

Create a `.env.local` file in cli folder and fill it with these variables.  

* `CLOUD_NAME`
* `API_KEY`
* `API_SECRET`

### Web App

Open `src/api.tsx` and change `CLOUD_NAME` constant with cloudinary cloud name

#### Story

You can also modify the story by changing `src/story.tsx`

## AI tools

I have used AI tools intensively. Here a list

* [cloudinary.com](https://cloudinary.com) for images
* [suno.com](https://suno.com/song/59f92fbd-4cfa-4e77-b6d4-93229d7d9bb3) for background music
* [gpt4-o and o1-preview](https://platform.openai.com/playground) story and code
* [bolt.com](https://bolt.new/) initial project template
* [v0.dev] additional code

## More information

[https://cloudinary.com/blog/cloudinary-cloudcreate-spooky-ai-hackathon](cloudinary hackaton page)
