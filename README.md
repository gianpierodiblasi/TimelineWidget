# TimelineWidget
An extension to visualize a timeline.

## Description
This extension provides a widget to visualize a timeline based on the squarechip timeline (see dependencies). The timeline is described by the ds_Timeline DataShape (see below); the DataShape structure is mandatory, but it can be extended with additional fields.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- timeline - INFOTABLE (no default value): the infotable representing the timeline (use or duplicate & extend the Data Shape ds_Timeline, see below)
- selectedIndex - INTEGER (default = -1): the index of the (eventually) selected item
- selectedItem - INFOTABLE (no default value): the (eventually) selected item
- verticalAlignment - STRING (default = 'top-bottom'): define the vertical alignment of the items (options:top-bottom, bottom-top, top, bottom)
- moveItems - INTEGER (default = 1): define how many items to move when clicking a navigation button
- startIndex - INTEGER (default = 0): define which item the timeline should start at
- visibleItems - INTEGER (default = 3): define how many items are visible in the viewport
- compact - BOOLEAN (default = false): true to activate the compact mode

## Events
- Inited: event to notify that the timeline is ready
- ItemSelected: event to notify that an item has been selected

## DataShapes
- ds_Timeline
  - id: an unique id to identify the item - STRING
  - content: the content to show in the timeline - HTML
  - selectable: true if the item is selectable - BOOLEAN
  - backgroundColor: the knob background color of the item - STRING
  - borderColor: the knob border color of the item - STRING
  - timelineColorFromHere: the color of the timeline from this item to the following one - STRING

## Dependencies
squarechip timeline - [link](https://squarechip.github.io/timeline/)

## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
