# QR Code Component Extension - QR Code Generator
This is a React extension of the [QR Code Component](https://www.frontendmentor.io/solutions/qr-code-component-xixkp7hzyW) challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). This project transforms the original static design into a fully interactive QR code generator with customization and management features.

## Features
- **Dynamic QR Generation:** The QR code automatically updates as you type, providing instant feedback.
- **Visual Customization:** Easily adjust the foreground and background colors, as well as the QR code's size.
- **File Management:** Save, load, and organize multiple QR codes directly within your browser.
- **Export Options:** Download your customized QR code as a PNG file with a custom filename.
- **Local Persistence:** All saved QR codes are stored in your browser's local storage for future use.
- **Responsive Design:** The layout is optimized for both desktop and mobile devices.

## Application Layout
The application's user interface is divided into a responsive grid for easy use:
- **Top-Left (QR Code Display):** This section displays the QR code as it's being generated and customized.
- **Top-Right (Customization):** This area contains all the controls for customizing the QR code, including the input text field, color pickers, size slider, and filename.
- **Bottom-Left (Actions):** This section houses the primary action buttons for downloading and saving the QR code, along with options to reset the customization and delete saved QR codes.
- **Bottom-Right (Saved Codes):** This list displays all the QR codes you have saved in your browser's local storage, allowing you to load them as needed.

## Default Settings
- **Value:** `https://www.frontendmentor.io/`
- **Colors:** White (`#ffffff`) foreground on blue (`#2c7dfa`) background.
- **Size:** 55% of the container's width.
- **Filename:** `qrcode-YYYYMMDDHHMMSS` (ISO timestamp)

![Screenshot of desktop version](public/screenshot.png)

## Author
- GitHub Profile: [PresidentTree94](https://github.com/PresidentTree94)
- Frontend Mentor Profile: [PresidentTree94](https://www.frontendmentor.io/profile/PresidentTree94)
- Author Website: [PresidentTree94 Portfolio](https://presidenttree94.github.io/project-portfolio/)