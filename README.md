# Ivaneta Ivanova: personal portfolio

A single-page personal portfolio website with a sticky navigation bar, light and dark mode, and coverflow image carousels for the hobbies section.

## Technologies

- Plain **HTML**, **CSS** and **JavaScript**
- No frameworks, no libraries, no build step and no internet connection needed

## How to open the site locally

Download or clone the repository and double-click `index.html`. It opens in your browser; no server is needed.

## Folder structure

```
index.html        the page skeleton (section order, section headings, nav links)
content/          ALL the text of the site, one file per section
css/style.css     the design (colours, fonts, spacing)
js/main.js        builds the page from the content files
js/carousel.js    the image carousel
img/              all pictures
  profile.svg       picture next to the summary
  projects/         project pictures
  hiking/           pictures for the hiking carousel
  crochet/          pictures for the crocheting carousel
```

## How to edit content

All text lives in the `content/` folder. Open the file for the section you want to change in any text editor, change the text between the quotes, save, and refresh the page in the browser.

| Section | File |
| --- | --- |
| Name in the nav bar, tab title, footer | `content/site.js` |
| Summary / bio | `content/bio.js` |
| Technologies | `content/technologies.js` |
| Work experience | `content/experience.js` |
| Projects | `content/projects.js` |
| Education and training | `content/education.js` |
| Awards | `content/awards.js` |
| Hobbies (text and carousel pictures) | `content/hobbies.js` |
| Future plans | `content/future.js` |
| Contact | `content/contact.js` |

Text that still needs to be written starts with the word `PLACEHOLDER`. Search for it to find everything that is left to fill in.

Rules to keep in mind when editing:

- Text goes between double quotes: `"like this"`.
- If the text itself contains a double quote, write `\"` instead of `"`.
- Items in a list are separated by commas.
- If the page suddenly appears empty after an edit, there is most likely a missing quote, comma or bracket in the file you just changed. Press `F12` in the browser and look at the Console tab: it shows the file and line of the mistake.

Section headings (for example "Work experience") and the nav bar links are in `index.html`.

## How to add or remove items

Projects, jobs, education entries, awards, hobbies and contact links are lists of blocks that look like this:

```js
{
  title: "My new project",
  dates: "11/2026",
  image: "img/projects/my-new-project.jpg",
  description: "What the project does.",
  points: [],
  links: [
    { label: "GitHub", url: "https://github.com/..." }
  ]
},
```

- **To add an item:** copy an existing block, from `{` to `},`, paste it where you want it to appear, and change the text. Items are shown in the same order as in the file.
- **To remove an item:** delete its whole block, from `{` to `},`.
- **Optional fields:** use `""` for text you want to leave out (for example a description) and `[]` for an empty list (for example a project with no links).

Each content file has a short comment at the top explaining its fields.

## How to change images

**Profile picture:** put your photo in `img/` and write its path in `content/bio.js` (`image: "img/my-photo.jpg"`). A square photo works best.

**Project pictures:** put the picture in `img/projects/` and write its path in the project's `image` field in `content/projects.js`. Use `image: ""` for a project without a picture. Pictures are shown in a 16:9 frame.

**Carousel pictures (hiking and crocheting):**

1. Put your pictures in the hobby's folder: `img/hiking/` or `img/crochet/`.
2. Open `content/hobbies.js` and list the file names in the hobby's `images` list, in the order you want them shown:

   ```js
   images: [
     { file: "rila-lakes.jpg", alt: "The Seven Rila Lakes" },
     { file: "musala.jpg", alt: "View from Musala peak" }
   ]
   ```

3. Delete the placeholder files you no longer need.

To remove a picture, delete its line from the list (and the file from the folder). A carousel looks best with at least 5 pictures. The file names must be listed because a web page opened locally cannot read the contents of a folder by itself.

The autoplay speed is set at the top of `js/carousel.js` (`CAROUSEL_AUTOPLAY_MS`, in milliseconds).

## How to change the design

Colours, fonts and sizes are defined as variables at the top of `css/style.css`: the first block is light mode and the second is dark mode.

The site is designed for desktop screens for now. A note at the bottom of `css/style.css` shows where mobile styles can be added later.
