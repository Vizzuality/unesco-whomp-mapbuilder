# Changelog

## [1.1.0] - 2023-12-20

### Added

- Units and text for some layers according the feedback from the client
- Min zoom for the map (3)
- Translations not available by default in the UI, edited in `config/translations` folder
- Tooltip for map controls
- Added support for URL in the description of the tab layers

### Changed

- Category order according feedback from the client
- Descriptions for Data and Analysis
- Basemap (default) category is hidden for the user
- Name and icons for sidebar tabs
- Analysis instructions texts and order
- Text for the language selector
- More changes on the UI for modal controls
- Translations of MapBuilder layers names
- Layers from MapBuilder edited in `config/resources.js`
- URL for share modal depending on the language selected
- Updated text for the Visualize tab

### Removed

- Social media from share modal
- Message about layer deprecation on the top (yellow banner)

### Fixed

- Legend collapse styles
- Imagery layer and ui modules was not working properly
- Same map center for English and French version

## [1.0.0] - 2023-12-09

### Added

- Tailwind and PostCSS as main style library
- Using Yarn instead of NPM as package manager
- Support for Carto layers from RW API
- Support for GEE layers from RW API
- Support to show legends Carto and GEE layers from RW API
- Prettier and Editorconfig for development consistency
- Missing labels and text in the translations files inside the folder `config/translations`
- Capability to move layers from Custom Layers to their category
- New categories or layers groups
- Enabling reload control in the map
- Not showing layers from Custom Basemap category in the legends

### Changed

- Upgraded Webpack from version 4 to 5
- Upgraded Node JS from 16 to 18
- Layout styles according the design
- Footer styles according the design
- Header styles according the design just in case is enable
- Left panel layout and styles according the design
- Icons and colors for layer categories
- Updated styles for the analysis tab
- Legend styles according the design
- Layer list styles according the design
- Styles for timeseries layer
- Styles and icons for the map controls according the design
- UI and text for share modal control
- UI and text for print modal control
- UI styles for the search modal control
- UI styles for the measurement modal control
- Layers available from MapBuilder edited in `config/resources.js`
- Moved translations selector from the header to the footer
- Translations for UI labels and text, English and French version
- Icon for the translation selector
- Basemaps available from Arcgis Online, now the user can choice more
- Custom Layers (from webmap) are only available if new layers are added

### Removed

- Removed NPM as package manager
- Header is not needed because is integrated with ArcGIS Experience
- Login is not needed and it's part of the header
- Library version compilation, not needed anymore
- Info icons for the layers because they don't have relevant information

### Fixed

- Compilation velocity (bug from WRI MapBuilder)
- Hot reload for development (bug from WRI MapBuilder)
- An issue where language wasn't change when the user selects (bug from WRI MapBuilder)
- Some translations of the UI were missing in the translations files (tech debt from WRI MapBuilder)
- Measurement widget was not working properly (bug from WRI MapBuilder)
- Issues on the layer dragging (bug from WRI MapBuilder)
- Rendering some layers on the map (bug from WRI MapBuilder)
