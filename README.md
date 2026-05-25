# Indy Punjabi Dhaba - Restaurant Website

Modern and responsive website for **Indy Punjabi Dhaba** Indian restaurant located in Indianapolis, Indiana.

## 📍 Restaurant Information

- **Name**: INDY PUNJABI DHABA INC
- **Address**: 1551 W Thompson Rd, Indianapolis, IN 46217, USA
- **Online Ordering Hours**: 10:00 AM - 9:40 PM (Every Day)

## 🌟 Website Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Menu**: Category filters (Appetizers, Curry, Tandoori, Bread, Rice, Desserts)
- **Smooth Navigation**: Fluid scrolling between sections
- **Animations**: Modern and engaging visual effects
- **Integrated Map**: Google Maps to easily find the restaurant
- **Call-to-Action**: Buttons to order and contact the restaurant

## 📂 File Structure

```
indy-punjabi-dhaba/
├── index.html      # Main page
├── styles.css      # Styles and design
├── script.js       # Interactive functionality
└── README.md       # This file
```

## 🚀 How to Use

1. **Open the site**: Simply open the `index.html` file in a modern web browser
2. **No installation required**: The site is completely static and works without a server

## 📱 Website Sections

1. **Home/Hero**: Welcome with background image and hours
2. **About**: Restaurant story and values
3. **Menu**: Complete catalog of dishes with prices and descriptions
4. **Gallery**: Dish images (emoji placeholders)
5. **Order Online**: Information for ordering
6. **Contact**: Address, phone, email, and map

## 🎨 Customization

### Colors
Main colors can be modified in the `styles.css` file:
```css
:root {
    --primary-color: #d4521e;    /* Spicy orange */
    --secondary-color: #f39c12;  /* Gold */
    --dark-color: #2c3e50;       /* Dark blue */
}
```

### Menu
To add or modify dishes, edit the menu section in `index.html`:
```html
<div class="menu-item" data-category="curry">
    <div class="menu-item-header">
        <h3>Dish Name</h3>
        <span class="price">$XX.XX</span>
    </div>
    <p>Dish description</p>
    <span class="badge vegetarian">Vegetarian</span>
</div>
```

### Images
Currently the site uses emoji as placeholders. To add real images:
1. Create an `images/` folder
2. Replace the `.image-placeholder` and `.gallery-placeholder` divs with `<img>` tags

## 📞 Contact Information

To update contact information, edit the `#contact` section in `index.html`.

## 🌐 Deployment

The site can be easily published on:
- **GitHub Pages**: Free and simple
- **Netlify**: Automatic deployment with drag & drop
- **Vercel**: Fast and free hosting
- Any static web hosting

## 📝 Notes

- The phone number is an example: update with the real number
- The email is an example: update with the real email
- The Google Maps uses generic coordinates: update with the correct embed code
- Images are placeholders: replace with real photos of dishes

## 🔧 Supported Browsers

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📄 License

This site was created for Indy Punjabi Dhaba Inc. All rights reserved © 2026.
