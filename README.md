# Web Shop Clone

This is a coding challenge solution for an E-Shop Product Owner, which aims to present article details in an overlay to customers, encouraging them to make informed purchasing decisions. The solution includes a simple Vue.js and TypeScript-based web application with a responsive design, making use of a REST API to fetch article data and display it attractively.


## Features

#### Thumbnails & Overlay
 On the webpage, you will find a thumbnails of the articles. Clicking on the thumbnail opens an overlay displaying the article details.

 #### Navbar
 A simple navbar was added where the user can swich between man and woman articles

#### Responsive Layout
The website is designed to be responsive for all screen sizes

#### Displayed Information:
- Pictures of the articles
- Name of the articles
- Colors of the articles
- Sizes of the articles
- Retail prices of the articles
## Installation

1. Clone the repository:
```bash
git clone https://github.com/SimonHoefling/web_shop_clone
```

2. Navigate to the project directory:
```bash
cd web_shop_clone
```

3. Install the required dependencies:
```bash
npm install
```

In the root directory of this application is a file called db.json. This file contains the data for the application. To start the application, you need to start the json-server first. If you don't have json-server installed, you can install it with the following command:

```bash
npm install -g json-server
```

4. Start the json server
```bash
json-server --watch db.json --port 3001
```

4. Open a new terminal tab and start the development server:
```bash
npm run dev
```

5. Press o and the site should open in your default browser.
